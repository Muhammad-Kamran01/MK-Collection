import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Review } from '@/types';
import { Star, CheckCircle, XCircle, Trash2, AlertCircle } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(name)
      `)
      .order('created_at', { ascending: false });

    if (data) {
      setReviews(data as any);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string, approved: boolean) => {
    const { error } = await supabase
      .from('reviews')
      .update({ approved })
      .eq('id', id);

    if (!error) {
      setReviews(reviews.map(r => r.id === id ? { ...r, approved } : r));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (!error) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'approved') return r.approved;
    if (filter === 'pending') return !r.approved;
    return true;
  });

  const reviewStats = {
    all: reviews.length,
    approved: reviews.filter(r => r.approved).length,
    pending: reviews.filter(r => !r.approved).length,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Reviews</h1>
        <p className="text-sm text-gray-600 mt-1">Manage customer reviews and ratings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'All Reviews', value: reviewStats.all, key: 'all', color: 'from-gray-500 to-gray-600' },
          { label: 'Approved', value: reviewStats.approved, key: 'approved', color: 'from-green-500 to-green-600' },
          { label: 'Pending', value: reviewStats.pending, key: 'pending', color: 'from-yellow-500 to-yellow-600' },
        ].map((stat) => (
          <button
            key={stat.key}
            onClick={() => setFilter(stat.key as any)}
            className={`p-4 rounded-xl border-2 transition-all ${
              filter === stat.key
                ? 'border-brand-gold bg-brand-gold/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className={`text-2xl font-display font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mt-1">
              {stat.label}
            </div>
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 uppercase tracking-widest">Loading...</p>
            </div>
          </div>
        ) : filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Review Content */}
                <div className="flex-grow space-y-3">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {review.user?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm font-semibold text-gray-900">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Product Info */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-xs text-gray-600">Product ID:</span>
                    <span className="text-xs font-mono font-semibold text-gray-900">
                      {review.product_id.slice(0, 12)}...
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {review.approved ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle size={14} />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <AlertCircle size={14} />
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {!review.approved ? (
                    <button
                      onClick={() => handleApprove(review.id, true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprove(review.id, false)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
                    >
                      <XCircle size={18} />
                      Unapprove
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
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
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                No reviews found
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
