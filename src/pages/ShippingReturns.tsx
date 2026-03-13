import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Truck,
  RotateCcw,
  Clock,
  MapPin,
  Package,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';

const shippingTiers = [
  {
    region: 'Islamabad, Rawalpindi & Surrounding Areas',
    standard: '1-2 Business Days',
    cost: 'Free',
    description: 'Same day delivery available for orders placed before 2 PM'
  },
  {
    region: 'Karachi, Lahore & Major Cities',
    standard: '2-3 Business Days',
    cost: 'Free on orders above PKR 3,000',
    description: 'Next-day delivery available (premium service)'
  },
  {
    region: 'Northern Areas & Remote Regions',
    standard: '3-5 Business Days',
    cost: 'PKR 500 - 1,000',
    description: 'Courier partner service via TCS / Leo Express'
  },
  {
    region: 'International Shipping',
    standard: '7-14 Business Days',
    cost: 'Calculated at checkout',
    description: 'Available to select countries (customs fees apply)'
  }
] as const;

const returnProcess = [
  {
    step: '01',
    title: 'Initiate Return',
    description: 'Contact us within 7 days of delivery with your order number and reason for return.'
  },
  {
    step: '02',
    title: 'Get Return Label',
    description: 'We provide a prepaid return shipping label via email. No additional cost to you.'
  },
  {
    step: '03',
    title: 'Package & Ship',
    description: 'Pack the item securely in original packaging. Drop it at any TCS or courier location.'
  },
  {
    step: '04',
    title: 'Inspection & Refund',
    description: 'We inspect the item and process refund within 5-7 business days of receipt.'
  }
] as const;

const faqItems = [
  {
    question: 'What if my order is lost or damaged in transit?',
    answer: 'We provide complete protection for all orders. If your package is lost or arrives damaged, contact us immediately with photos. We will arrange a replacement or full refund without hassle. Our partnership with trusted couriers ensures safe delivery, and we stand behind every order.'
  },
  {
    question: 'Can I change my delivery address after placing an order?',
    answer: 'If your order hasn\'t been dispatched, we can change the address within 6 hours of placement. Call us immediately at +92 336 2818701 to request this. Once dispatched, you can provide alternative delivery instructions to our customer service team.'
  },
  {
    question: 'What items are non-returnable?',
    answer: 'Most items in original condition can be returned within 7 days. However, final sale items, customized/made-to-measure pieces, and items with signs of wear or alteration cannot be returned. These are clearly marked during checkout.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to selected countries including UK, USA, Canada, UAE, and Saudi Arabia. International shipping takes 7-14 business days. Customs duties and taxes are the responsibility of the buyer and will be collected by local customs upon delivery.'
  },
  {
    question: 'How can I track my order?',
    answer: 'A tracking number is sent via SMS and email immediately after dispatch. You can track your package in real-time through our partner courier\'s website. You\'ll also receive updates at each milestone of your delivery journey.'
  },
  {
    question: 'What is your return shipping cost?',
    answer: 'For items returned within the 7-day window due to damage, defects, or wrong items, return shipping is completely free. We provide a prepaid return label. For returns due to customer preferences, return shipping is the customer\'s responsibility unless the item was defective.'
  }
] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function ShippingReturns() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">Shipping & Returns</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578062214544-decf0fa32e81?auto=format&fit=crop&w=2200&q=85"
            alt="Fast and secure shipping"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-white"
          >
            <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold border border-brand-gold/40 rounded-full px-4 py-1.5 bg-brand-gold/10 backdrop-blur-sm">
              Delivery & Support
            </span>
            <h1 className="text-5xl md:text-6xl font-display leading-tight mb-5">
              Fast, Safe & Reliable<br />Shipping Across Pakistan
            </h1>
            <p className="text-base text-white/85 max-w-xl">
              We partner with trusted couriers to ensure your order arrives in perfect condition, on time, every time. 
              If something isn't right, our hassle-free return process makes it easy to get satisfaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: 'Same-Day Delivery', value: 'Available' },
            { icon: Clock, label: 'Processing Time', value: '1-2 Days' },
            { icon: RotateCcw, label: 'Easy Returns', value: '7 Days' },
            { icon: CheckCircle2, label: 'Satisfaction', value: '100% Guaranteed' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                className="bg-white border border-brand-muted/40 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.32)] p-6 rounded-2xl text-center"
              >
                <Icon size={24} className="text-brand-gold mx-auto mb-3" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gray font-bold mb-2">{item.label}</p>
                <p className="text-lg font-display text-brand-dark">{item.value}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Where We Deliver</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">Shipping Coverage</h2>
          <p className="text-base text-brand-gray max-w-2xl mx-auto">
            We ship to every corner of Pakistan and select international destinations with transparent pricing and reliable delivery partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shippingTiers.map((tier, i) => (
            <motion.div
              key={tier.region}
              {...fadeUp(i * 0.1)}
              className="bg-white border border-brand-muted/40 p-8 rounded-2xl shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)] hover:shadow-[0_26px_56px_-30px_rgba(0,0,0,0.44)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-display text-brand-dark">{tier.region}</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">Delivery Time</p>
                  <p className="text-sm font-semibold text-brand-dark">{tier.standard}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gray font-bold mb-1">Shipping Cost</p>
                  <p className="text-sm font-semibold text-brand-gold">{tier.cost}</p>
                </div>
                <div className="pt-2 border-t border-brand-muted">
                  <p className="text-sm text-brand-gray">{tier.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Return Process */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Easy Returns</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">4-Step Return Process</h2>
          <p className="text-base text-brand-gray max-w-2xl mx-auto">
            Changed your mind? No problem. We make returns simple and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {returnProcess.map((item, i) => (
            <motion.div
              key={item.step}
              {...fadeUp(i * 0.1)}
              className="relative"
            >
              <div className="bg-white border border-brand-muted/40 p-8 rounded-2xl shadow-[0_22px_44px_-34px_rgba(0,0,0,0.38)] h-full">
                <p className="text-5xl font-display text-brand-gold/20 mb-6">{item.step}</p>
                <h3 className="text-lg font-display text-brand-dark mb-3">{item.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{item.description}</p>
              </div>
              {i < returnProcess.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/3 text-brand-gold/30">
                  <ArrowRight size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-8 md:p-10"
        >
          <div className="flex gap-4 md:gap-6">
            <CheckCircle2 size={24} className="text-brand-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-display text-brand-dark mb-2">Return Window</h4>
              <p className="text-sm text-brand-gray mb-3">
                You have 7 days from the date of delivery to initiate a return. Items must be in original condition with all tags attached and packaging intact.
              </p>
              <p className="text-sm text-brand-gray">
                <span className="font-semibold text-brand-dark">Note:</span> Final sale items, customized pieces, and made-to-measure garments are non-returnable. These are clearly marked during checkout.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Return Reasons & Refund Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-brand-gold font-bold block mb-4">Valid Return Reasons</span>
            <h3 className="text-3xl md:text-4xl font-display mb-6 leading-snug">Why Can You Return?</h3>
            <ul className="space-y-4">
              {[
                'Item is damaged or defective upon arrival',
                'Wrong item was shipped (our mistake)',
                'Item does not match the product description',
                'Size does not fit (within 7 days)',
                'Changed your mind (non-final sale items)',
                'Quality does not meet expectations'
              ].map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-sm text-brand-gray">
                  <CheckCircle2 size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="bg-white border border-brand-muted/40 p-8 md:p-10 rounded-2xl shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-brand-gold font-bold block mb-4">Timeline</span>
            <h3 className="text-3xl md:text-4xl font-display mb-8 leading-snug">Refund Timeline</h3>
            <div className="space-y-6">
              {[
                { days: 'Day 1-7', title: 'Return Window', desc: 'Initiate return request after delivery' },
                { days: 'Day 8-10', title: 'Return Shipping', desc: 'Package and ship using provided label' },
                { days: 'Day 11-17', title: 'In Transit', desc: 'Your package travels to our facility' },
                { days: 'Day 18-20', title: 'Inspection', desc: 'We verify condition and process refund' }
              ].map((item) => (
                <div key={item.days} className="flex gap-4">
                  <div className="w-16 flex-shrink-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">{item.days}</p>
                  </div>
                  <div className="border-l-2 border-brand-gold/20 pl-4 pb-4">
                    <h4 className="font-display text-brand-dark mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-gray">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Questions?</span>
          <h2 className="text-4xl font-display">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="bg-white/90 border border-brand-muted/40 shadow-[0_16px_36px_-30px_rgba(0,0,0,0.35)] rounded-2xl"
            >
              <details className="group">
                <summary className="list-none cursor-pointer px-6 py-5 flex items-center justify-between gap-6">
                  <span className="text-sm md:text-base font-semibold text-brand-dark pr-4">{faq.question}</span>
                  <span className="w-8 h-8 flex-shrink-0 rounded-full bg-brand-gold/15 text-brand-dark flex items-center justify-center text-lg font-semibold transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-4 border-t border-brand-muted/40 text-sm text-brand-gray leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=85"
            alt="Customer Service"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-white"
          >
            <span className="text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold block mb-4">Still Have Questions?</span>
            <h2 className="text-4xl md:text-5xl font-display mb-6 leading-tight">
              Our Customer Service<br />Team Is Here To Help
            </h2>
            <p className="text-base text-white/80 mb-10 max-w-2xl">
              Whether you have questions about shipping, returns, or anything else, we're available 7 days a week to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+923362818701" className="btn-primary bg-brand-gold hover:bg-white hover:text-brand-dark text-center inline-flex items-center justify-center gap-2">
                <Phone size={16} /> Call Us
              </a>
              <Link to="/contact" className="btn-outline border-white/70 text-white hover:bg-white hover:text-brand-dark text-center inline-flex items-center justify-center gap-2">
                <Mail size={16} /> Email Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
