import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Eye,
  Lock,
  Share2,
  Trash2,
  Cookie,
  ChevronRight,
  Plus,
  Minus,
  Mail,
  Phone,
} from 'lucide-react';

const sections = [
  {
    id: 'overview',
    title: 'Privacy Overview',
    icon: Shield,
    content: `At MK COLLECTION, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully to understand our practices regarding your personal data. By accessing and using MK COLLECTION, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.`
  },
  {
    id: 'collect',
    title: 'What Information We Collect',
    icon: Eye,
    content: `We collect the following types of information: (1) Personal Information: When you create an account or place an order, we collect your name, email address, phone number, shipping address, and billing address. (2) Payment Information: Credit card numbers, bank account details, and payment method information (processed securely through encrypted channels). (3) Order Information: Order history, product preferences, purchase amounts, and delivery details. (4) Communication Data: Messages you send us, customer service inquiries, and feedback. (5) Technical Information: IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages. (6) Device Information: Device type, model, unique identifiers, and mobile network information. (7) Cookies & Tracking: We use cookies to enhance your browsing experience and track website usage patterns.`
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    icon: Share2,
    content: `Your information is used for: (1) Order Processing: To process your orders, manage payments, and arrange delivery. (2) Communication: To send order confirmations, shipping updates, and customer service responses. (3) Account Management: To maintain your account, reset passwords, and provide account features. (4) Marketing: To send promotional emails, new product announcements, and special offers (you can opt out anytime). (5) Improvements: To understand customer preferences and improve our website, products, and services. (6) Analytics: To analyze website traffic, user behavior, and engagement patterns. (7) Legal Compliance: To comply with legal obligations, prevent fraud, and enforce our terms. (8) Customer Support: To provide efficient and personalized customer service. (9) Personalization: To customize your shopping experience based on your preferences and history.`
  },
  {
    id: 'sharing',
    title: 'Information Sharing & Disclosure',
    icon: Share2,
    content: `We do NOT sell your personal information to third parties. However, we may share your information with: (1) Courier Partners: Shipping and delivery companies require your address and contact information. (2) Payment Processors: Third-party payment gateways handle payment processing securely. (3) Service Providers: Hosting providers, email services, and analytics platforms that assist in website operations. (4) Legal Requirements: Government agencies, law enforcement, or courts when required by law. (5) Business Transfers: In case of merger, acquisition, or bankruptcy proceedings. (6) Consent: With your explicit consent for specific purposes. All third parties are contractually bound to maintain confidentiality and use your information only for specified purposes.`
  },
  {
    id: 'security',
    title: 'Data Security & Protection',
    icon: Lock,
    content: `We implement industry-standard security measures to protect your information: (1) Encryption: All data transmissions use SSL/TLS encryption (256-bit). (2) Secure Servers: Our servers are protected with firewalls and intrusion detection systems. (3) Access Controls: Only authorized employees can access personal information, and they are bound by confidentiality agreements. (4) PCI Compliance: We comply with Payment Card Industry Data Security Standards. (5) Regular Audits: Security systems are regularly tested and audited by third-party experts. (6) Password Protection: Account passwords are hashed and never stored in plain text. However, no transmission over the Internet or electronic storage is 100% secure. While we take extensive precautions, we cannot guarantee absolute security.`
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking Technologies',
    icon: Cookie,
    content: `We use cookies and similar tracking technologies to enhance your experience: (1) Session Cookies: Temporary cookies that are deleted when you close your browser, maintaining your shopping session. (2) Persistent Cookies: Long-term cookies that remain on your device to remember preferences and login information. (3) Analytics Cookies: Used by Google Analytics and similar tools to measure website performance and user behavior. (4) Marketing Cookies: Used by advertising partners to deliver targeted ads. (5) Functionality Cookies: Remember your preferences, language settings, and customizations. You can control cookies through your browser settings and opt out of specific tracking. However, disabling cookies may affect website functionality.`
  },
  {
    id: 'rights',
    title: 'Your Privacy Rights',
    icon: Shield,
    content: `You have the right to: (1) Access: Request a copy of all personal information we hold about you. (2) Correction: Correct inaccurate or incomplete information in your account. (3) Deletion: Request deletion of your personal information (right to be forgotten), subject to legal requirements. (4) Portability: Receive your data in a structured, machine-readable format. (5) Opt-Out: Unsubscribe from marketing communications at any time. (6) Restrict Processing: Request restrictions on how we use your data. To exercise these rights, contact us at info@mkcollection.pk with your request and proof of identity.`
  },
  {
    id: 'retention',
    title: 'Data Retention Policy',
    icon: Trash2,
    content: `We retain your information for as long as necessary: (1) Account Data: Retained while your account is active and for 2 years after closure for potential disputes or refunds. (2) Order Information: Maintained for 7 years for accounting and tax purposes. (3) Payment Records: Kept as per PCI-DSS requirements and tax regulations. (4) Marketing Data: Retained until you unsubscribe. (5) Cookies: Session cookies expire when you close your browser; persistent cookies expire after 1-2 years. (6) Technical Logs: Server logs are typically retained for 90 days. You can request deletion of your data at any time by contacting our privacy team, except where legal obligations require retention.`
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    icon: Shield,
    content: `MK COLLECTION does not knowingly collect information from children under the age of 13. If we become aware that a child under 13 has provided us with personal information, we will immediately delete such information and terminate the child's account. Parents or guardians who believe their child has provided information to MK COLLECTION should contact us immediately. For users between 13 and 18, parental consent is recommended. We are committed to protecting the privacy of young users and complying with child protection regulations.`
  }
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<string | null>('overview');

  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">Privacy Policy</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2200&q=85"
            alt="Privacy and data protection"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block mb-4 text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold border border-brand-gold/40 rounded-full px-4 py-1.5 bg-brand-gold/10 backdrop-blur-sm">
              Data Protection
            </span>
            <h1 className="text-5xl md:text-6xl font-display leading-tight mb-5">
              Your Privacy<br />Is Our Priority
            </h1>
            <p className="text-base text-white/85 max-w-xl">
              We are committed to protecting your personal information and maintaining your trust. Learn how we collect, use, and safeguard your data.
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/60 mt-6">Last Updated: March 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            
            return (
              <motion.div
                key={section.id}
                {...fadeUp(idx * 0.05)}
                className="bg-white border border-brand-muted/40 rounded-2xl shadow-[0_16px_36px_-30px_rgba(0,0,0,0.35)]"
              >
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-6 text-left group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-display text-brand-dark group-hover:text-brand-gold transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-brand-gold flex-shrink-0 transition-transform duration-300" style={{
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 border-t border-brand-muted/40 text-sm text-brand-gray leading-relaxed">
                    {section.content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-brand-muted/40 rounded-2xl p-8 md:p-10"
        >
          <h3 className="text-2xl font-display text-brand-dark mb-6">Contact Our Privacy Team</h3>
          <p className="text-base text-brand-gray mb-8">
            If you have questions, concerns, or requests regarding your privacy or this privacy policy, please don't hesitate to contact us:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Email</h4>
                <p className="text-sm text-brand-gray">privacy@mkcollection.pk</p>
                <p className="text-xs text-brand-gray mt-1">Response time: Within 48 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-brand-dark mb-1">Phone</h4>
                <p className="text-sm text-brand-gray">+92 336 2818701</p>
                <p className="text-xs text-brand-gray mt-1">Available: Mon-Fri, 9 AM - 5 PM PKT</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Important Notice */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-gold/8 border border-brand-gold/30 rounded-2xl p-8 flex gap-6"
        >
          <Shield size={24} className="text-brand-gold flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-display text-brand-dark mb-2">Policy Updates</h4>
            <p className="text-sm text-brand-gray leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes by email or through a prominent notice on the website. Your continued use of MK COLLECTION following such notification constitutes your acceptance of the updated Privacy Policy.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
