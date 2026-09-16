'use client';

import { motion } from 'framer-motion';
import { Store, CreditCard, PackageCheck, Users, MessageCircle, UserCog, Sparkles, Bot, BarChart3 } from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Sales Agent',
    desc: 'AI handles customer conversations, recommends products, and creates orders — 24/7 via WhatsApp.',
    highlight: true,
  },
  {
    icon: Store,
    title: 'Online Store',
    desc: 'Launch a professional storefront without coding. Beautiful templates for every industry.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    desc: 'Accept card, bank transfer, and mobile money. Paystack and Flutterwave integrated.',
  },
  {
    icon: PackageCheck,
    title: 'Orders & Inventory',
    desc: 'Manage products, stock and orders from one place. Low-stock alerts included.',
  },
  {
    icon: Users,
    title: 'Customer Management',
    desc: 'Keep customer information, purchase history, and segments organized.',
  },
  {
    icon: BarChart3,
    title: 'AI Business Insights',
    desc: 'AI analyzes your sales trends, predicts demand, and recommends actions.',
    highlight: true,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-brand-soft/50 py-20 md:py-28" id="features">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Commerce Meets Intelligence</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Everything Your Business Needs</h2>
          <p className="mt-4 text-lg text-gray-600">
            Powerful tools that work together — with AI handling the heavy lifting so you can focus on growth.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className={`group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                f.highlight
                  ? 'border-violet-200 bg-gradient-to-br from-violet-50 to-white hover:shadow-violet-100'
                  : 'border-gray-100 bg-white hover:shadow-brand/5'
              }`}
            >
              <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                f.highlight
                  ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                  : 'bg-brand-soft group-hover:bg-brand-soft'
              }`}>
                <f.icon className={`h-6 w-6 ${f.highlight ? 'text-white' : 'text-brand transition-colors group-hover:text-brand-dark'}`} />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                {f.highlight && (
                  <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                    <Sparkles className="h-2.5 w-2.5 inline mr-0.5" />
                    AI
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
