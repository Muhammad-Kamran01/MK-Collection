import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  Lock,
  Users,
  DollarSign,
  Scale,
  ChevronRight,
  Plus,
  Minus,
  Mail,
  Phone,
} from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileText,
    content: `By accessing and using the MK COLLECTION website (mkcollection.pk), you automatically agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing this site. MK COLLECTION reserves the right to modify these terms at any time without prior notice. Your continued use of the website after such modifications constitutes your acceptance of the updated terms.`
  },
  {
    id: 'order',
    title: 'Order & Payment Terms',
    icon: DollarSign,
    content: `All orders placed on MK COLLECTION must be submitted through our online ordering system. We reserve the right to refuse or cancel any order for any reason without explanation. Prices displayed on the website are subject to change without notice. We reserve the right to limit quantities and availability of products. Payment must be completed before order confirmation. We accept multiple payment methods including cash on delivery, bank transfer, and digital payments. All payment transactions are processed securely through our trusted payment partners.`
  },
  {
    id: 'product-info',
    title: 'Product Information & Accuracy',
    icon: AlertTriangle,
    content: `We attempt to provide accurate descriptions, images, and pricing for all products on our website. However, we do not warrant that product descriptions, pricing, or other content on the site is accurate, complete, or error-free. MK COLLECTION does not guarantee that images represent the actual product colors or details with perfect accuracy due to variations in digital displays and photography conditions. Occasionally, products may be mispriced due to typographical errors or pricing mistakes. We reserve the right to correct any errors and cancel orders placed at incorrect prices.`
  },
  {
    id: 'shipping',
    title: 'Shipping & Delivery',
    icon: 'truck',
    content: `MK COLLECTION ships orders within 1-2 business days of confirmed payment (excluding weekends and holidays). Delivery timeframes depend on your location within Pakistan or internationally. We are not responsible for delays caused by courier services, weather conditions, customs clearance, or other factors beyond our control. Once an order is dispatched, it is the responsibility of the courier company. Customers are responsible for providing accurate delivery addresses. If a package is returned due to an incorrect address provided by the customer, additional shipping charges will apply.`
  },
  {
    id: 'returns',
    title: 'Returns & Refund Policy',
    icon: 'refresh',
    content: `Items may be returned within 7 days of delivery in original condition with all tags attached and original packaging intact. Return shipping is free for items returned due to defects, damage, or errors on our part. Return shipping for items returned due to customer preference is the responsibility of the customer. Refunds are processed within 5-7 business days of inspection and approval. Final sale items, customized pieces, and made-to-measure garments are non-returnable. Items showing signs of wear, use, washing, or alteration will not be accepted for return.`
  },
  {
    id: 'intellectual',
    title: 'Intellectual Property Rights',
    icon: Lock,
    content: `All content on the MK COLLECTION website, including but not limited to text, images, graphics, logos, video clips, digital downloads, and product designs, is the exclusive property of MK COLLECTION or its content suppliers. No content may be reproduced, republished, sold, or distributed without explicit written permission from MK COLLECTION. Unauthorized use of any content is strictly prohibited and may result in legal action. You are granted a limited license to view and print content for personal use only.`
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: Scale,
    content: `TO THE FULLEST EXTENT PERMITTED BY LAW, MK COLLECTION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE WEBSITE OR SERVICES, EVEN IF MK COLLECTION HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR LIABILITY IS LIMITED TO THE TOTAL AMOUNT PAID BY YOU FOR THE PRODUCTS PURCHASED. We make no warranty regarding the accuracy, timeliness, or completeness of website content.`
  },
  {
    id: 'user-conduct',
    title: 'User Conduct & Prohibited Activities',
    icon: Users,
    content: `You agree not to use the website for any unlawful or prohibited purpose. Specifically, you agree not to: (1) transmit any harmful, threatening, abusive, or obscene content; (2) attempt to gain unauthorized access to our systems; (3) interfere with the proper functioning of the website; (4) engage in any form of fraud or misrepresentation; (5) reverse engineer or attempt to extract source code; (6) scrape or automatically collect data without permission; (7) engage in any commercial activity without authorization. Violation of these terms may result in immediate termination of your access.`
  },
  {
    id: 'termination',
    title: 'Termination of Access',
    icon: AlertTriangle,
    content: `MK COLLECTION reserves the right to terminate your access to the website at any time without notice for violations of these terms or for any other reason at our sole discretion. Upon termination, your right to use the website immediately ceases. Outstanding orders will still be fulfilled according to our standard policies. Termination does not relieve you of your obligation to pay for orders already placed.`
  }
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function TermsOfService() {
  const [openSection, setOpenSection] = useState<string | null>('acceptance');

  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      {/* Breadcrumbs */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white/80 px-4 py-2 text-[10px] uppercase tracking-widest text-brand-gray shadow-sm backdrop-blur-sm">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-dark">Terms of Service</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8917c7b87dc?auto=format&fit=crop&w=2200&q=85"
            alt="Legal terms and conditions"
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
              Legal
            </span>
            <h1 className="text-5xl md:text-6xl font-display leading-tight mb-5">
              Terms of Service
            </h1>
            <p className="text-base text-white/85 max-w-xl">
              Please read these terms carefully. By using MK COLLECTION, you agree to be bound by all provisions outlined below.
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
                    {typeof Icon === 'string' ? (
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-brand-gold" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-brand-gold" />
                      </div>
                    )}
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

      {/* Important Notice */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="bg-state-warning/8 border border-state-warning/30 rounded-2xl p-8 flex gap-6"
        >
          <AlertTriangle size={24} className="text-state-warning flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-display text-brand-dark mb-2">Governing Law</h4>
            <p className="text-sm text-brand-gray leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts located in Islamabad, Pakistan. Any legal action or proceeding relating to your use of this website shall be brought exclusively in such courts.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center border-t border-brand-muted">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-4 text-brand-dark">
            Questions About These Terms?
          </h2>
          <p className="text-base text-brand-gray mb-8 max-w-2xl mx-auto">
            If you have any questions or concerns about our Terms of Service, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:info@mkcollection.pk" className="btn-primary inline-flex items-center justify-center gap-2">
              <Mail size={16} /> Email Us
            </a>
            <a href="tel:+923362818701" className="btn-outline inline-flex items-center justify-center gap-2">
              <Phone size={16} /> Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
