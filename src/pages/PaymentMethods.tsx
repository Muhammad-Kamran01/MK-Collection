import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Shield,
  Phone,
  Mail,
} from 'lucide-react';

const paymentMethods = [
  {
    icon: Banknote,
    title: 'Cash on Delivery (COD)',
    description: 'Pay when your order arrives at your doorstep',
    details: [
      'Available in Islamabad, Rawalpindi, and select major cities',
      'No upfront payment required',
      'Verified payment at delivery',
      'Perfect for cash-preferring customers',
      'Order confirmed immediately'
    ],
    benefits: ['Convenience', 'Trust', 'Flexibility'],
    processing: 'Immediate'
  },
  {
    icon: CreditCard,
    title: 'Bank Transfer / Direct Deposit',
    description: 'Transfer funds directly to our account',
    details: [
      'Bank: Habib Bank Limited (HBL)',
      'Account Title: MK Collection (Pvt) Ltd',
      'IBAN: PK29 HBLC 0001 1234 5678 9012',
      'Reference: Your Order Number',
      'Keep proof of transfer for verification'
    ],
    benefits: ['Secure', 'Direct', 'Traceable'],
    processing: '1-2 hours'
  },
  {
    icon: Smartphone,
    title: 'Mobile Wallets & Digital Payments',
    description: 'Fast, secure digital payment options',
    details: [
      'JazzCash and Easypaisa supported',
      'Fixed transaction limits per payment method',
      'Instant payment confirmation',
      'OTP-secured transactions',
      'No additional fees for digital payments'
    ],
    benefits: ['Instant', 'Secure', 'Easy'],
    processing: 'Real-time'
  }
];

const securityFeatures = [
  {
    title: 'SSL Encryption',
    description: 'All payment data is encrypted with industry-leading SSL technology'
  },
  {
    title: '256-Bit Security',
    description: 'Bank-level security protocols protect your financial information'
  },
  {
    title: 'PCI Compliance',
    description: 'We meet Payment Card Industry Data Security Standard requirements'
  },
  {
    title: 'Fraud Protection',
    description: 'Advanced fraud detection systems monitor all transactions'
  }
];

const faqItems = [
  {
    question: 'Is it safe to share my payment information?',
    answer: 'Yes, absolutely. We use industry-standard encryption (SSL 256-bit) to protect all payment information. Your credit card, bank details, and personal information are never stored on our servers in readable format. We comply with PCI-DSS (Payment Card Industry Data Security Standard) and use trusted payment gateways that are regularly audited by third-party security experts.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept three main payment methods: (1) Cash on Delivery (COD) for select areas, (2) Bank transfers/direct deposits to our HBL account, and (3) Mobile wallets including JazzCash and Easypaisa. Different payment methods work best in different situations, so choose the one most convenient for you.'
  },
  {
    question: 'How do I know my payment was successful?',
    answer: 'You will receive an order confirmation email and SMS immediately after successful payment. For bank transfers, keep your transaction receipt as proof. For mobile payments, you\'ll get an instant confirmation from your wallet provider. You can also track your order status anytime by logging into your account or contacting our support team.'
  },
  {
    question: 'Can I pay with a credit card?',
    answer: 'We don\'t directly accept credit cards on the website. However, most credit cards come with mobile wallet functionality (Apple Pay, Google Pay) that can be linked to JazzCash or Easypaisa. Alternatively, you can transfer funds from your credit card to your bank account and then use bank transfer as your payment method.'
  },
  {
    question: 'What if my payment fails?',
    answer: 'If your payment fails, your order will not be confirmed. You\'ll receive a notification with the reason for failure. Please check your account balance and payment details, then try again. If the issue persists, contact us immediately at +92 336 2818701 and we\'ll help resolve it within 4 business hours.'
  },
  {
    question: 'Do you charge extra for payment methods?',
    answer: 'No, we do not charge any additional fees or surcharges for using any payment method. The price you see at checkout is the final price you pay. Bank transfer fees, if any, are your bank\'s responsibility, not ours.'
  },
  {
    question: 'Can I change my payment method after placing an order?',
    answer: 'If your order hasn\'t been confirmed yet, you can cancel and resubmit with a different payment method. Once payment is confirmed, you cannot change the payment method for that specific order. Contact our support team immediately if you need to change payment methods.'
  },
  {
    question: 'How long does it take for payment to reflect?',
    answer: 'COD is instant - no payment processing needed. Mobile wallet payments are real-time. Bank transfers typically reflect within 1-2 hours during business hours, sometimes up to 4 hours depending on your bank. We\'ll send you a confirmation once payment is received and verified.'
  }
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function PaymentMethods() {
  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">Payment Methods</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2200&q=85"
            alt="Secure payment methods"
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
            className="max-w-2xl text-white"
          >
            <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold border border-brand-gold/40 rounded-full px-4 py-1.5 bg-brand-gold/10 backdrop-blur-sm">
              Secure & Flexible
            </span>
            <h1 className="text-5xl md:text-6xl font-display leading-tight mb-5">
              Multiple Payment<br />Methods For You
            </h1>
            <p className="text-base text-white/85 max-w-xl">
              Choose the payment method that works best for you. All our payment options are secure, fast, and convenient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Checkout Options</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">How Would You Like To Pay?</h2>
          <p className="text-base text-brand-gray max-w-2xl mx-auto">
            We offer multiple payment methods to make your shopping experience smooth and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paymentMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                {...fadeUp(i * 0.1)}
                className="bg-white border border-brand-muted/40 rounded-2xl overflow-hidden shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)] hover:shadow-[0_26px_56px_-30px_rgba(0,0,0,0.44)] transition-all duration-300 flex flex-col"
              >
                <div className="bg-linear-to-br from-brand-gold/10 to-brand-muted p-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Icon size={28} className="text-brand-gold" />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display text-brand-dark mb-2">{method.title}</h3>
                  <p className="text-sm text-brand-gray mb-6">{method.description}</p>

                  <div className="space-y-3 mb-6">
                    {method.details.map((detail) => (
                      <div key={detail} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-brand-gold mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-brand-gray">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-brand-muted">
                    <div className="flex gap-2 mb-3">
                      {method.benefits.map((benefit) => (
                        <span key={benefit} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-gold/10 text-brand-dark">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-brand-gray font-bold">Processing</span>
                      <span className="text-sm font-semibold text-brand-dark">{method.processing}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Security */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Your Safety</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">Bank-Level Security</h2>
          <p className="text-base text-brand-gray max-w-2xl mx-auto">
            We protect your payment information with the same encryption technology used by major banks worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeUp(i * 0.1)}
              className="bg-white border border-brand-muted/40 p-8 rounded-2xl shadow-[0_22px_44px_-34px_rgba(0,0,0,0.38)] flex gap-4"
            >
              <Shield size={24} className="text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-display text-brand-dark mb-2">{feature.title}</h4>
                <p className="text-sm text-brand-gray">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-8 md:p-10"
        >
          <div className="flex gap-4 md:gap-6">
            <Lock size={24} className="text-brand-gold flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-display text-brand-dark mb-2">Complete Encryption</h4>
              <p className="text-sm text-brand-gray leading-relaxed">
                All payment transactions are processed through secure encrypted channels. Your card details, bank information, and personal data are never stored on our servers. We use trusted third-party payment processors that handle security compliance and data protection.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">Help & Support</span>
          <h2 className="text-4xl font-display">Payment FAQs</h2>
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
      <section className="max-w-5xl mx-auto px-4 py-20 text-center border-t border-brand-muted">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4 text-brand-dark">
            Need Payment Assistance?
          </h2>
          <p className="text-base text-brand-gray mb-8 max-w-2xl mx-auto">
            Our payment support team is ready to help with any questions about payment methods, transactions, or security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+923362818701" className="btn-primary inline-flex items-center justify-center gap-2">
              <Phone size={16} /> Call Support
            </a>
            <a href="mailto:info@mkcollection.pk" className="btn-outline inline-flex items-center justify-center gap-2">
              <Mail size={16} /> Email Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
