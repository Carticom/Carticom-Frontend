'use client';

import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import { CountUp } from '@/components/ui/count-up';

const TESTIMONIALS = [
  { name: 'Chioma Okafor', business: 'Luxe Fashion NG', role: 'Founder', industry: 'Fashion', quote: 'Carticom transformed how we sell. From Instagram DMs to a proper online store — our revenue tripled in 3 months.', rating: 5 },
  { name: 'Emeka Nwosu', business: 'TechVille Africa', role: 'CEO', industry: 'Electronics', quote: 'Finally, a platform built for African businesses. The escrow system eliminated our trust issues with online payments.', rating: 5 },
  { name: 'Amina Suleiman', business: 'Glow Beauty', role: 'Owner', industry: 'Beauty', quote: 'The analytics alone are worth it. We now know exactly what\'s selling, when, and to whom. Game changing.', rating: 5 },
  { name: 'Tunde Bakare', business: 'FreshHarvest', role: 'Director', industry: 'Food & Bev', quote: 'Inventory tracking saved us from costly overstock. The AI suggestions are scarily accurate.', rating: 5 },
];

const METRICS = [
  { value: 5000, suffix: '+', label: 'Businesses', prefix: '' },
  { value: 50000, suffix: '+', label: 'Orders', prefix: '' },
  { value: 100000, suffix: '+', label: 'Products', prefix: '' },
  { value: 15, suffix: '', label: 'Countries', prefix: '' },
  { value: 5000000, suffix: '+', label: 'Transactions', prefix: '₦' },
  { value: 10000, suffix: '+', label: 'Subscribers', prefix: '' },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Trusted by Businesses</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">What Our Users Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-blue-500 text-blue-500" />
                ))}
              </div>
              <Quote className="h-6 w-6 text-blue-200 mb-3" />
              <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.business} — {t.industry}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 shadow-xl shadow-blue-200/30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {m.prefix}
                    <CountUp from={0} to={m.value} duration={2} />
                    {m.suffix}
                  </p>
                  <p className="text-sm text-blue-200 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
