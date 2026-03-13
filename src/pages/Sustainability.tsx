import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Droplets, Leaf, Recycle, Sun, Truck, Trees } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Responsible Materials',
    description:
      'We prioritize lower-impact fabrics, certified dyes, and durable construction that extends the life of every garment.'
  },
  {
    icon: Recycle,
    title: 'Circular Design',
    description:
      'From reusable packaging to take-back support for select pieces, we are reducing waste across the product lifecycle.'
  },
  {
    icon: Truck,
    title: 'Mindful Logistics',
    description:
      'We optimize shipments, reduce excess packaging, and partner with delivery networks improving route efficiency.'
  },
  {
    icon: Trees,
    title: 'Community Impact',
    description:
      'A portion of selected collections supports local skill development and climate-positive initiatives.'
  }
] as const;

const standards = [
  'Low-impact and azo-free dye preference',
  'Reusable garment bags for premium lines',
  'Plastic-light packaging with recycled paper inserts',
  'Quality-first stitching to increase product lifespan',
  'Supplier checks for fair and safe working conditions'
] as const;

const roadmap = [
  {
    year: '2026',
    milestone: 'Foundation',
    detail: 'Introduced sustainability scorecards for materials and packaging decisions in new seasonal drops.'
  },
  {
    year: '2027',
    milestone: 'Scale Better Inputs',
    detail: 'Expand verified lower-impact fabric sourcing across ready-to-wear and occasion wear collections.'
  },
  {
    year: '2028',
    milestone: 'Circular Services',
    detail: 'Launch structured garment care, repair guidance, and pilot take-back pathways for selected items.'
  }
] as const;

const faqs = [
  {
    question: 'How can I identify more sustainable products?',
    answer:
      'We highlight lower-impact material choices and care guidance in product descriptions so you can make informed decisions.'
  },
  {
    question: 'Do sustainable choices compromise quality?',
    answer:
      'No. Our sustainability approach is built around craftsmanship and longevity, so quality remains at the center.'
  },
  {
    question: 'What can customers do to reduce fashion waste?',
    answer:
      'Choose timeless pieces, follow care instructions, repair when possible, and pass garments forward when no longer used.'
  }
] as const;

export default function Sustainability() {
  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">
      <section className="relative h-[72vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85"
            alt="Premium women's fashion collection"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/55 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />
          <div className="absolute top-20 left-16 h-52 w-52 rounded-full bg-brand-gold/20 blur-3xl" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-display leading-tight mb-7 text-white">Style With Purpose</h1>
            <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed">
              We are building a more responsible fashion future through better materials, thoughtful production,
              and long-lasting design. Our goal is simple: premium clothing with meaningful impact.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/contact?subject=Sustainability%20Inquiry" className="btn-primary bg-brand-gold hover:bg-white hover:text-brand-dark text-center">
                Talk To Our Team
              </Link>
              <Link to="/shop" className="btn-outline border-white text-white hover:bg-white hover:text-brand-dark text-center">
                Explore Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Packaging Plastic Reduced', value: '35%' },
            { label: 'Recycled Paper Usage', value: '80%' },
            { label: 'Lower-Impact Material Target', value: '60%' },
            { label: 'Supplier Review Frequency', value: 'Quarterly' }
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-brand-muted/40 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.35)] p-6 text-center"
            >
              <p className="text-2xl md:text-3xl font-display text-brand-dark mb-2">{item.value}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-bold block mb-3">Our Commitments</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">Four Pillars Of Progress</h2>
          <p className="text-sm text-brand-gray max-w-2xl mx-auto">
            We take a practical, transparent path to sustainability with measurable goals and continuous improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white border border-brand-muted/40 p-7 md:p-8 shadow-[0_24px_50px_-38px_rgba(0,0,0,0.4)] hover:shadow-[0_26px_54px_-34px_rgba(0,0,0,0.45)] transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F5DF9B_0%,#D4AF37_45%,#B6902D_100%)] flex items-center justify-center shadow-[0_12px_24px_-10px_rgba(128,96,24,0.7)] ring-1 ring-white/60 transition-all duration-300 group-hover:scale-105">
                    <Icon size={22} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-brand-dark mb-2">{pillar.title}</h3>
                    <p className="text-sm text-brand-gray leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative h-[460px] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=85"
              alt="Conscious materials and craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-2">Materials</p>
              <p className="text-lg font-display">Designed For Longevity, Crafted With Care</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-brand-muted/40 p-8 md:p-10 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-brand-gold font-bold block mb-4">Standards We Follow</span>
            <h3 className="text-3xl font-display mb-5">Better Choices Across The Chain</h3>
            <ul className="space-y-4">
              {standards.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-gray leading-relaxed">
                  <BadgeCheck size={18} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-sm border border-brand-muted p-4 bg-brand-muted/20 text-center">
                <Droplets size={18} className="mx-auto text-brand-gold mb-2" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">Water-Aware Dyeing</p>
              </div>
              <div className="rounded-sm border border-brand-muted p-4 bg-brand-muted/20 text-center">
                <Sun size={18} className="mx-auto text-brand-gold mb-2" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gray">Energy-Efficient Process</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-bold block mb-3">Roadmap</span>
          <h2 className="text-4xl font-display">Our 3-Year Plan</h2>
        </div>

        <div className="space-y-4">
          {roadmap.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white border border-brand-muted/40 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:gap-8 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.35)]"
            >
              <div className="md:w-32 mb-3 md:mb-0">
                <p className="text-2xl font-display text-brand-dark">{item.year}</p>
              </div>
              <div>
                <h3 className="text-lg font-display text-brand-dark mb-1">{item.milestone}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-brand-gold font-bold block mb-3">FAQ</span>
          <h2 className="text-4xl font-display">Sustainability Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="bg-white/90 border border-brand-muted/40 shadow-[0_16px_36px_-30px_rgba(0,0,0,0.35)]"
            >
              <details className="group">
                <summary className="list-none cursor-pointer px-6 py-5 flex items-center justify-between gap-6">
                  <span className="text-sm md:text-base font-semibold text-brand-dark">{faq.question}</span>
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

      <section className="relative bg-brand-muted py-20 overflow-hidden">
        <div className="absolute -left-12 top-0 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-4 block">Join The Movement</span>
          <h2 className="text-3xl md:text-4xl font-display mb-6">Wear Better. Keep Better.</h2>
          <p className="text-sm text-brand-gray mb-8 max-w-2xl mx-auto leading-relaxed">
            Have ideas or questions about our sustainability roadmap? We would love to hear your feedback.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact?subject=Sustainability%20Feedback" className="btn-primary bg-brand-dark hover:bg-brand-gold text-white px-8 py-4 inline-flex items-center justify-center gap-2">
              Share Feedback <ArrowRight size={16} />
            </Link>
            <Link to="/shop" className="btn-outline inline-flex items-center justify-center gap-2">
              Shop Timeless Pieces
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
