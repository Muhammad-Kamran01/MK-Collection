import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, Instagram, Facebook, Linkedin, Music2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Visit Our Store',
    lines: ['F-7 Markaz, Islamabad', 'Pakistan']
  },
  {
    icon: Phone,
    title: 'Call Our Team',
    lines: ['+92 336 2818701', '+92 51 12345678']
  },
  {
    icon: Mail,
    title: 'Send An Email',
    lines: ['info@mkcollection.pk', 'support@mkcollection.pk']
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon - Thur: 10:00 AM - 10:00 PM', 'Fri - Sun: 11:00 AM - 11:00 PM']
  }
] as const;

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Music2, href: 'https://www.tiktok.com', label: 'TikTok' },
  { icon: Linkedin, href: 'https://www.linkedin.com', label: 'LinkedIn' }
] as const;

const faqItems = [
  {
    question: 'How quickly can I expect a response to my inquiry?',
    answer:
      'Our team typically replies within 24 hours on business days. For urgent requests, you can also call us directly during store hours.'
  },
  {
    question: 'Do you offer custom tailoring and bridal consultations?',
    answer:
      'Yes. We provide private consultations for bridal couture, formal wear, and bespoke tailoring. Use the consultation button to share your requirements.'
  },
  {
    question: 'Can I visit the store for fittings without an appointment?',
    answer:
      'Walk-ins are welcome, but we recommend booking ahead for personalized styling and dedicated fitting time.'
  },
  {
    question: 'Do you ship nationwide and internationally?',
    answer:
      'We ship across Pakistan and selected international destinations. Shipping timelines depend on customization level and destination.'
  }
] as const;

const fieldBaseClassName =
  'w-full rounded-sm px-6 py-4 bg-brand-muted/25 border border-brand-muted/70 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none text-sm transition-all duration-300 focus:bg-white placeholder:text-brand-gray/70';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const success = result?.includes('successfully');

  const handleConsultationClick = () => {
    setFormData((prev) => ({
      ...prev,
      subject: prev.subject || 'Consultation Request'
    }));

    const formCard = document.getElementById('contact-form-card');
    formCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      phone: formData.phone || null,
      message: formData.message
    };
    
    const { error } = await supabase.from('contact_messages').insert([payload]);
    
    if (error) {
      setResult('Error sending message. Please try again.');
    } else {
      setResult('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F9F6EE] to-white">
      {/* Premium Hero Section */}
      <section className="relative h-[52vh] min-h-[440px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2200&q=85" 
            alt="Fashion boutique interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/52 to-black/76" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/35" />
          <div className="absolute left-1/2 top-14 h-56 w-56 -translate-x-1/2 rounded-full bg-brand-gold/22 blur-3xl" />
          <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-brand-gold/18 blur-3xl" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-6"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-6 block text-brand-gold">Let's Connect</span>
            <h1 className="text-5xl md:text-7xl text-white/80 font-display mb-6 leading-tight">Get in Touch</h1>
            <p className="text-xs md:text-sm text-white/80 max-w-2xl uppercase tracking-[0.28em] leading-relaxed">
              We're here to assist you with custom orders, styling advice, or any inquiries
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F9F6EE] to-transparent" />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-14 -mt-24 relative z-10">
          {/* Contact Form - Takes more space */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="contact-form-card"
            className="lg:col-span-3 bg-white/95 backdrop-blur-sm border border-brand-muted/40 p-6 sm:p-10 xl:p-12 rounded-sm shadow-[0_25px_60px_-35px_rgba(0,0,0,0.35)]"
          >
            <div className="mb-10 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-3 block">Send a Message</span>
              <h2 className="text-3xl md:text-4xl font-display mb-3">We'd Love to Hear From You</h2>
              <p className="text-sm text-brand-gray leading-relaxed max-w-2xl mx-auto">
                Fill out the form below and our team will respond within 24 hours.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray block mb-3">
                    Full Name *
                  </label>
                  <input 
                    id="name"
                    type="text" 
                    placeholder="Enter your full name" 
                    required
                    className={fieldBaseClassName}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray block mb-3">
                    Email Address *
                  </label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    className={fieldBaseClassName}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray block mb-3">
                  Contact Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  className={fieldBaseClassName}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="group">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray block mb-3">
                  Subject
                </label>
                <input 
                  id="subject"
                  type="text" 
                  placeholder="How can we help you?" 
                  className={fieldBaseClassName}
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gray block mb-3">
                  Your Message *
                </label>
                <textarea 
                  id="message"
                  placeholder="Tell us more about your inquiry..." 
                  required
                  rows={6}
                  className={`${fieldBaseClassName} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="btn-primary bg-brand-dark hover:bg-brand-gold text-white flex items-center justify-center gap-3 px-10 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 min-w-52"
                >
                  {loading ? 'Sending...' : 'Send Message'} 
                  <Send size={16} />
                </button>
                
                {result && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[10px] text-center uppercase tracking-widest font-bold border px-4 py-2 rounded-sm ${success ? 'text-green-700 border-green-200 bg-green-50' : 'text-red-700 border-red-200 bg-red-50'}`}
                  >
                    {result}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Information Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Contact Details Card */}
            <div className="relative bg-white border border-brand-muted/30 shadow-xl overflow-hidden lg:sticky lg:top-28">
              {/* Decorative Top Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-gold via-[#D4AF37] to-brand-gold"></div>
              
              <div className="p-6 sm:p-10 space-y-8">
                <div className="text-center pb-6 border-b border-brand-muted/30">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold mb-3 block">Get In Touch</span>
                  <h3 className="text-3xl font-display text-brand-dark">Contact Information</h3>
                </div>
                
                <div className="space-y-6">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <motion.div
                        key={detail.title}
                        whileHover={{ y: -2 }}
                        className="flex items-start gap-5 p-5 bg-brand-muted/20 hover:bg-brand-muted/40 transition-all duration-300 border-l-4 border-brand-gold group"
                      >
                        <div className="w-14 h-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F5DF9B_0%,#D4AF37_45%,#B6902D_100%)] flex items-center justify-center flex-shrink-0 shadow-[0_12px_24px_-10px_rgba(128,96,24,0.7)] ring-1 ring-white/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:shadow-[0_20px_32px_-14px_rgba(128,96,24,0.85)]">
                          <Icon size={20} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-brand-gold">{detail.title}</h4>
                          {detail.lines.map((line) => (
                            <p key={line} className="text-sm text-brand-dark leading-relaxed font-medium">
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <div className="pt-8 border-t border-brand-muted/30 text-center">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-5 text-brand-dark">Connect With Us</h4>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={social.label}
                          className="w-12 h-12 bg-gradient-to-br from-brand-gold to-[#C5A04D] flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                          <Icon size={20} strokeWidth={2.5} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Decorative Bottom Element */}
              <div className="h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQs Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute left-0 top-8 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute right-0 bottom-8 h-44 w-44 rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-bold mb-3 block">Quick Answers</span>
            <h2 className="text-3xl md:text-4xl font-display mb-3 text-brand-dark">Frequently Asked Questions</h2>
            <p className="text-sm text-brand-gray leading-relaxed max-w-2xl mx-auto">
              Everything you may want to know before reaching out or booking a consultation.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-white/90 backdrop-blur-sm border border-brand-muted/40 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)]"
              >
                <details className="group">
                  <summary className="list-none cursor-pointer px-6 py-5 flex items-center justify-between gap-6">
                    <span className="text-sm md:text-base font-semibold text-brand-dark">{faq.question}</span>
                    <span className="w-8 h-8 flex-shrink-0 rounded-full bg-brand-gold/15 text-brand-dark flex items-center justify-center text-lg font-semibold transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-sm text-brand-gray leading-relaxed border-t border-brand-muted/40 pt-4">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional CTA Section */}
      <section className="relative bg-brand-muted py-20 overflow-hidden">
        <div className="absolute -left-12 top-0 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-4 block">Bespoke Services</span>
          <h2 className="text-3xl md:text-4xl font-display mb-6">Looking for Custom Tailoring?</h2>
          <p className="text-sm text-brand-gray mb-8 max-w-2xl mx-auto leading-relaxed">
            Book a private consultation with our design team for custom bridal wear, special occasion outfits, or alterations.
          </p>
          <button
            type="button"
            onClick={handleConsultationClick}
            className="btn-primary bg-brand-dark hover:bg-brand-gold text-white px-8 py-4"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
