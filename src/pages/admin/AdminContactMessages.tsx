import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ContactMessage, ContactMessageStatus } from '@/types';
import { AlertCircle, ArchiveRestore, Mail, Search, Trash2 } from 'lucide-react';

const statusOptions: Array<{ value: ContactMessageStatus; label: string; className: string }> = [
  { value: 'viewed', label: 'Viewed', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  { value: 'in_progress', label: 'In Progress', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'responded', label: 'Responded', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'completed', label: 'Completed', className: 'bg-green-100 text-green-700 border-green-200' }
];



export default function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | ContactMessageStatus>('all');
  const [viewMode, setViewMode] = useState<'active' | 'deleted'>('active');
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);

    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setMessages(data as ContactMessage[]);
    }

    setLoading(false);
  };

  const activeMessages = useMemo(() => messages.filter((message) => !message.deleted_at), [messages]);
  const deletedMessages = useMemo(() => messages.filter((message) => !!message.deleted_at), [messages]);

  const filteredMessages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return activeMessages.filter((message) => {
      // When filterStatus is 'all', show only messages with null status (pending/new)
      // When filterStatus is a specific status, show only that status (hide pending)
      const matchesStatus = filterStatus === 'all' ? message.status === null : message.status === filterStatus;

      if (!matchesStatus) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        (message.phone || '').toLowerCase().includes(query) ||
        (message.subject || '').toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      );
    });
  }, [activeMessages, searchTerm, filterStatus]);

  const filteredDeletedMessages = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return deletedMessages;
    }

    return deletedMessages.filter((message) => {
      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        (message.phone || '').toLowerCase().includes(query) ||
        (message.subject || '').toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      );
    });
  }, [deletedMessages, searchTerm]);

  const handleStatusUpdate = async (id: string, status: ContactMessageStatus | null) => {
    setStatusError(null);
    setStatusUpdatingId(id);

    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id);

    if (!error) {
      setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, status } : message)));
    } else {
      setStatusError(`Could not update status: ${error.message}`);
    }

    setStatusUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Archive this message? It will be hidden from the main list and moved to Deleted Messages.')) {
      return;
    }

    const deletedAt = new Date().toISOString();
    const { error } = await supabase.from('contact_messages').update({ deleted_at: deletedAt }).eq('id', id);

    if (!error) {
      setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, deleted_at: deletedAt } : message)));
    } else {
      setStatusError(`Could not archive message: ${error.message}`);
    }
  };

  const handleRestore = async (id: string) => {
    const { error } = await supabase.from('contact_messages').update({ deleted_at: null }).eq('id', id);

    if (!error) {
      setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, deleted_at: null } : message)));
    } else {
      setStatusError(`Could not restore message: ${error.message}`);
    }
  };

  const statusStats = {
    all: messages.length,
    deleted: deletedMessages.length,
    pending: activeMessages.filter((message) => message.status === null).length,
    viewed: activeMessages.filter((message) => message.status === 'viewed').length,
    in_progress: activeMessages.filter((message) => message.status === 'in_progress').length,
    responded: activeMessages.filter((message) => message.status === 'responded').length,
    completed: activeMessages.filter((message) => message.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Contact Messages</h1>
        <p className="text-sm text-gray-600 mt-1">View inquiries submitted from the contact page</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Total Messages Received</p>
          <p className="text-3xl font-display font-bold text-gray-900 mt-1">{messages.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Total Deleted Messages</p>
          <p className="text-3xl font-display font-bold text-gray-900 mt-1">{statusStats.deleted}</p>
        </div>
        <button
          onClick={() => {
            setViewMode('active');
            setFilterStatus('all');
          }}
          className={`rounded-xl border-2 p-4 text-left transition-all ${
            viewMode === 'active' && filterStatus === 'all'
              ? 'border-brand-gold bg-brand-gold/5'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">New Messages</p>
          <p className="text-3xl font-display font-bold text-gray-900 mt-1">{statusStats.pending}</p>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Pending Messages</p>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email, phone, subject, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold transition-all"
          />
        </div>
      </div>

      {statusError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-red-700">{statusError}</p>
          <p className="text-xs text-red-600 mt-1">
            If it mentions missing column <span className="font-mono">deleted_at</span> or <span className="font-mono">status</span>, run the latest SQL migration in Supabase.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statusOptions.map((statusOption) => (
          <button
            key={statusOption.value}
            onClick={() => {
              setViewMode('active');
              setFilterStatus(statusOption.value);
            }}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              viewMode === 'active' && filterStatus === statusOption.value
                ? 'border-brand-gold bg-brand-gold/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{statusOption.label}</p>
            <p className="text-2xl font-display font-bold text-gray-900 mt-1">{statusStats[statusOption.value]}</p>
          </button>
        ))}
        <button
          onClick={() => setViewMode('deleted')}
          className={`p-4 rounded-xl border-2 transition-all text-left ${
            viewMode === 'deleted' ? 'border-brand-gold bg-brand-gold/5' : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Deleted</p>
          <p className="text-2xl font-display font-bold text-gray-900 mt-1">{statusStats.deleted}</p>
        </button>
      </div>

      {viewMode === 'active' && (
        <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Loading...</p>
            </div>
          </div>
        ) : filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              {(() => {
                const status = message.status;
                const selectedOption = statusOptions.find((statusOption) => statusOption.value === status);
                const statusLabel = status || 'Pending';
                const statusClass = selectedOption?.className || 'bg-gray-100 text-gray-700 border-gray-200';

                return (
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${statusClass}`}
                    >
                      {statusLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Set Status</span>
                      <select
                        value={status || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newStatus = value === '' ? null : (value as ContactMessageStatus);
                          handleStatusUpdate(message.id, newStatus);
                        }}
                        disabled={statusUpdatingId === message.id}
                        className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                      >
                        <option value="">-- No Status (Pending) --</option>
                        {statusOptions.map((statusOption) => (
                          <option key={statusOption.value} value={statusOption.value}>
                            {statusOption.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })()}

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{message.name}</p>
                      <a href={`mailto:${message.email}`} className="text-sm text-brand-gold hover:underline inline-flex items-center gap-1">
                        <Mail size={14} />
                        {message.email}
                      </a>
                    </div>
                    <span className="text-xs text-gray-500 sm:ml-auto">
                      {new Date(message.created_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Subject</p>
                    <p className="text-sm text-gray-900 font-medium">{message.subject || 'No subject'}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Contact Number</p>
                    <p className="text-sm text-gray-900 font-medium">{message.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mb-2">Message</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
                  </div>
                </div>

                <div className="lg:pl-4">
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">No active messages found</p>
            </div>
          </div>
        )}
        </div>
      )}

      {viewMode === 'deleted' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">Deleted Messages Archive</h2>
          <span className="text-xs uppercase tracking-widest font-bold text-gray-500">{filteredDeletedMessages.length} records</span>
        </div>

        {filteredDeletedMessages.length > 0 ? (
          <div className="space-y-3">
            {filteredDeletedMessages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{message.name} - {message.email}</p>
                    <p className="text-xs text-gray-600 mt-1">{message.subject || 'No subject'}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Deleted: {message.deleted_at ? new Date(message.deleted_at).toLocaleString('en-US') : '-'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRestore(message.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <ArchiveRestore size={16} />
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 uppercase tracking-widest">No deleted messages</p>
        )}
        </div>
      )}
    </div>
  );
}
