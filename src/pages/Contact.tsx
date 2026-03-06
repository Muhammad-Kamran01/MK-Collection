import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('contact_messages').insert([formData]);
    
    if (error) {
      setResult('Error sending message. Please try again.');
    } else {
      setResult('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="pb-20">
      <div className="bg-brand-muted py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-display mb-4">Contact Us</h1>
          <p className="text-brand-gray uppercase tracking-widest text-xs">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Form */}
        <div className="space-y-12">
          <h2 className="text-3xl font-display">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              className="input-field"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
            />
            <textarea 
              placeholder="Your Message" 
              required
              rows={4}
              className="input-field resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-3">
              {loading ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>
            {result && (
              <p className={`text-xs uppercase tracking-widest font-bold ${result.includes('successfully') ? 'text-state-success' : 'text-state-error'}`}>
                {result}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-12">
          <h2 className="text-3xl font-display">Contact Information</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-muted flex items-center justify-center rounded-full flex-shrink-0">
                <MapPin size={20} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Our Location</h4>
                <p className="text-sm text-brand-gray">123 Fashion Street, Lahore, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-muted flex items-center justify-center rounded-full flex-shrink-0">
                <Phone size={20} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Phone Number</h4>
                <p className="text-sm text-brand-gray">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-brand-muted flex items-center justify-center rounded-full flex-shrink-0">
                <Mail size={20} className="text-brand-gold" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-2">Email Address</h4>
                <p className="text-sm text-brand-gray">info@mkcollection.pk</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video bg-brand-muted relative overflow-hidden rounded-2xl">
            <img 
              src="https://picsum.photos/seed/map/800/450" 
              alt="Map" 
              className="w-full h-full object-cover grayscale opacity-50 rounded-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 shadow-xl border border-brand-muted text-center rounded-lg">
                <p className="text-[10px] uppercase tracking-widest font-bold">MK COLLECTION HQ</p>
                <p className="text-[8px] text-brand-gray">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
