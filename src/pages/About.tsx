import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Gem,
  Heart,
  Layers,
  MapPin,
  Scissors,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

const stats = [
  { value: '2021', label: 'Established' },
  { value: '500+', label: 'Products Crafted' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '12+', label: 'Seasonal Collections' },
] as const;

const values = [
  {
    icon: Gem,
    title: 'Uncompromising Quality',
    description:
      'Every piece is constructed from hand-selected fabrics — lawn, linen, chiffon, and organza — with reinforced stitching, precise cuts, and a finish that lasts wear after wear.',
  },
  {
    icon: Scissors,
    title: 'Heritage Craftsmanship',
    description:
      'Rooted in the rich textile traditions of Pakistan, our artisans bring generations of embroidery, block-print, and hand-detailing expertise to every garment.',
  },
  {
    icon: Heart,
    title: 'Designed For Women',
    description:
      'Cut and styled for real confidence. Our silhouettes are perfected across sizes S–XL to flatter and move with the women who wear them every day.',
  },
] as const;

const differentiators = [
  'Premium Pakistani lawn, linen & chiffon fabrics',
  'Ethically produced in small, supervised batches',
  'Consistent sizing across all collections',
  'Detailed hand-embroidery on featured lines',
  'Ready-to-wear and made-to-measure options',
  'Nationwide and international shipping available',
] as const;

const processSteps = [
  {
    step: '01',
    title: 'Design',
    detail:
      'Each season starts with trend research, color palette curation, and original silhouette sketches built around the Pakistani woman\'s lifestyle and sensibility.',
  },
  {
    step: '02',
    title: 'Source',
    detail:
      'We partner with certified fabric mills in Faisalabad and Karachi to procure premium-grade lawn, linen, and specialty weaves at the right weight and finish.',
  },
  {
    step: '03',
    title: 'Craft',
    detail:
      'Pattern-making, cutting, stitching, and embellishment are carried out in our quality-verified production units under close supervision at every stage.',
  },
  {
    step: '04',
    title: 'Deliver',
    detail:
      'Each order is quality-checked, pressed, and packed in branded protective packaging before being dispatched to customer homes across Pakistan and beyond.',
  },
] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 as const },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white via-[#F7F4ED] to-white">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative h-[76vh] min-h-[540px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2200&q=85"
            alt="MK Collection – Premium Women Clothing"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/58 to-black/38" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65" />
          <div className="absolute top-20 left-14 h-56 w-56 rounded-full bg-brand-gold/22 blur-3xl" />
          <div className="absolute bottom-28 right-20 h-44 w-44 rounded-full bg-white/8 blur-2xl" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="max-w-3xl text-white"
          >
            <span className="inline-block mb-5 text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold border border-brand-gold/40 rounded-full px-4 py-1.5 bg-brand-gold/10 backdrop-blur-sm">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-display leading-tight mb-6 text-white">
              Crafted With Passion.<br />Worn With Pride.
            </h1>
            <p className="text-sm md:text-base text-white/88 max-w-xl leading-relaxed">
              MK Collection was born from a single belief — that every woman deserves clothing as refined as she is.
              From our first stitch to our latest collection, premium quality has never been a compromise.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn-primary bg-brand-gold hover:bg-white hover:text-brand-dark text-center">
                Explore Collection
              </Link>
              <Link to="/contact" className="btn-outline border-white/70 text-white hover:bg-white hover:text-brand-dark text-center">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              {...fadeUp(i * 0.08)}
              className="bg-white border border-brand-muted/40 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.32)] p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-display text-brand-dark mb-2">{item.value}</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-gray">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Brand Story ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative h-[500px] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85"
              alt="The story behind MK Collection"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-2">Islamabad, Pakistan</p>
              <p className="text-lg font-display">Where Every Thread Tells A Story</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="bg-white border border-brand-muted/40 p-8 md:p-10 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.34em] text-brand-gold font-bold block mb-4">
              Our Beginning
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-brand-dark mb-5 leading-snug">
              Born In Islamabad.<br />Inspired By Pakistani Women.
            </h2>
            <div className="space-y-4 text-sm text-brand-gray leading-relaxed">
              <p>
                MK Collection opened its doors in 2021 from a small studio in F-7 Markaz, Islamabad, with one
                mission: to give Pakistani women access to clothing that matched their elegance, ambition, and
                individuality — without choosing between style and substance.
              </p>
              <p>
                What started as a curated ready-to-wear line quickly grew into seasonal collections spanning
                formal couture, everyday lawn, and luxury occasion wear. Each piece reflects the textile
                heritage of Pakistan, updated with contemporary silhouettes for the modern woman.
              </p>
              <p>
                Today, we proudly serve thousands of customers across Pakistan and ship internationally —
                maintaining the same obsessive attention to detail that defined our very first garment.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-brand-dark">
              <MapPin size={16} className="text-brand-gold" />
              F-7 Markaz, Islamabad — Est. 2021
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">What We Stand For</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">Our Core Values</h2>
          <p className="text-sm text-brand-gray max-w-xl mx-auto">
            These principles guide every decision we make — from sourcing fabrics to packaging your order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="group bg-white border border-brand-muted/40 p-8 shadow-[0_24px_50px_-38px_rgba(0,0,0,0.4)] hover:shadow-[0_28px_56px_-34px_rgba(0,0,0,0.46)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F5DF9B_0%,#D4AF37_45%,#B6902D_100%)] flex items-center justify-center shadow-[0_12px_24px_-10px_rgba(128,96,24,0.65)] ring-1 ring-white/60 mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Icon size={22} className="text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-display text-brand-dark mb-3">{v.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── The MK Difference ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="order-2 lg:order-1 bg-white border border-brand-muted/40 p-8 md:p-10 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.34em] text-brand-gold font-bold block mb-4">
              Why MK Collection
            </span>
            <h3 className="text-3xl md:text-4xl font-display text-brand-dark mb-6 leading-snug">
              The Difference Is In<br />Every Detail
            </h3>
            <ul className="space-y-4">
              {differentiators.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-gray leading-relaxed">
                  <BadgeCheck size={17} className="text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/shop"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-dark border-b-2 border-brand-gold pb-0.5 hover:text-brand-gold transition-colors"
            >
              Browse Our Collection <ArrowRight size={13} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="order-1 lg:order-2 relative h-[480px] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=85"
              alt="Premium craftsmanship at MK Collection"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-2">Craftsmanship</p>
              <p className="text-lg font-display">Precision From First Stitch To Last</p>
            </div>

            {/* Floating review badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl max-w-[180px]">
              <div className="flex text-brand-gold mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" />
                ))}
              </div>
              <p className="text-[11px] font-semibold text-brand-dark leading-snug">"Absolutely stunning quality. Loved every piece."</p>
              <p className="text-[9px] uppercase tracking-widest text-brand-gray mt-1.5">— Verified Customer</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Process ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.36em] text-brand-gold font-bold block mb-3">From Concept To Closet</span>
          <h2 className="text-4xl md:text-5xl font-display mb-3">How We Work</h2>
          <p className="text-sm text-brand-gray max-w-xl mx-auto">
            Every garment passes through a four-stage process designed to ensure nothing but the best reaches your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              {...fadeUp(i * 0.1)}
              className="group relative bg-white border border-brand-muted/40 p-7 shadow-[0_22px_44px_-34px_rgba(0,0,0,0.38)] hover:shadow-[0_26px_52px_-30px_rgba(0,0,0,0.44)] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute -top-4 -right-3 text-[88px] font-display text-brand-muted/50 leading-none select-none">
                {step.step}
              </span>
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-3">Step {step.step}</p>
                <h3 className="text-xl font-display text-brand-dark mb-3">{step.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Team / Founder Spotlight ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div
            {...fadeUp()}
            className="lg:col-span-2 relative h-[420px] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=85"
              alt="MK Collection Boutique"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-1">Our Studio</p>
              <p className="text-lg font-display">F-7 Markaz, Islamabad</p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.12)}
            className="lg:col-span-3 bg-white border border-brand-muted/40 p-8 md:p-10 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[10px] uppercase tracking-[0.34em] text-brand-gold font-bold block mb-4">
              Behind The Brand
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-brand-dark mb-5 leading-snug">
              Driven By A Passion<br />For Women's Fashion
            </h2>
            <div className="space-y-4 text-sm text-brand-gray leading-relaxed">
              <p>
                MK Collection was founded on a straightforward idea: Pakistani women deserve a fashion destination
                that treats quality, style, and service as non-negotiables — not premiums reserved for a few.
              </p>
              <p>
                Our founding team brings together years of expertise in textile sourcing, garment construction,
                and fashion retail to create collections that feel elevated yet accessible. We work with skilled
                artisans, trusted fabric partners, and a sharp design sensibility rooted in our culture.
              </p>
              <p>
                Every decision — from the thread count on a kurta to the box your order arrives in — is made with
                purpose. We are not just selling clothing; we are building a brand Pakistani women are proud to wear.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-gray font-semibold">
                <Layers size={14} className="text-brand-gold" /> In-house Design Team
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-gray font-semibold">
                <Users size={14} className="text-brand-gold" /> Verified Artisan Partners
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-brand-gray font-semibold">
                <Sparkles size={14} className="text-brand-gold" /> Quality-First Culture
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2200&q=85"
            alt="Shop MK Collection"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/62 to-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.38em] text-brand-gold font-bold block mb-4">
              Ready To Discover Your Style?
            </span>
            <h2 className="text-4xl md:text-6xl font-display text-white mb-6 leading-tight">
              Shop The Latest<br />Collection
            </h2>
            <p className="text-sm text-white/80 max-w-lg mx-auto mb-10">
              Explore hundreds of premium pieces across ready-to-wear, formal, and occasion wear. New arrivals every season.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="btn-primary bg-brand-gold hover:bg-white hover:text-brand-dark text-center inline-flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-outline border-white/70 text-white hover:bg-white hover:text-brand-dark text-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
