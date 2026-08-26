'use client';

import { motion } from 'framer-motion';
import { Store, UtensilsCrossed, Shirt, Pill, Smartphone, Sparkles, PackageSearch, Wrench, Briefcase, ArrowRight } from 'lucide-react';


import { cn } from '@/lib/utils';

const SOLUTIONS = [
  { icon: Store, title: 'Retail Stores', desc: 'Brick-and-mortar meets online. Sync inventory, manage customers, and sell everywhere.' },
  { icon: UtensilsCrossed, title: 'Restaurants', desc: 'Online ordering, table management, delivery tracking, and payment at the table.' },
  { icon: Shirt, title: 'Fashion', desc: 'Showcase collections, manage variants, and sell across Instagram and your store.' },
  { icon: Pill, title: 'Pharmacy', desc: 'Prescription management, stock tracking, expiry monitoring, and regulatory compliance.' },
  { icon: Smartphone, title: 'Electronics', desc: 'Manage SKUs, warranties, repairs, and sell gadgets with confidence using verified payments.' },
  { icon: Sparkles, title: 'Beauty', desc: 'Build a beauty empire with subscription boxes, appointment booking, and product sales.' },
  { icon: PackageSearch, title: 'Wholesale', desc: 'B2B ordering, bulk pricing, minimum order quantities, and supplier management.' },
  { icon: Wrench, title: 'Manufacturing', desc: 'Raw material tracking, production orders, and distributor management.' },
  { icon: Briefcase, title: 'Service Businesses', desc: 'Book appointments, manage schedules, send invoices, and accept deposits.' },
];

const COLORS = [
  'from-blue-500 to-blue-600', 'from-blue-500 to-blue-600', 'from-amber-500 to-amber-600',
  'from-violet-500 to-violet-600', 'from-rose-500 to-rose-600', 'from-blue-500 to-blue-600',
  'from-orange-500 to-orange-600', 'from-purple-500 to-purple-600', 'from-blue-500 to-blue-600',
];

export function SolutionsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Solutions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built for Every Industry</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">From retail to manufacturing — Carticom adapts to the way you do business.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-100/20 transition-all duration-300 h-full">
                <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br', COLORS[i], 'shadow-sm mb-4')}>
                  <sol.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{sol.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{sol.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
