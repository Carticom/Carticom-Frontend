'use client';

import { motion } from 'framer-motion';
import { Store, CreditCard, PackageCheck, Users, MessageCircle, UserCog } from 'lucide-react';

const FEATURES = [
  {
    icon: Store,
    title: 'Online Store',
    desc: 'Launch a professional storefront without coding.',
  },
  {
    icon: CreditCard,
    title: 'Payments',
    desc: 'Give customers convenient ways to pay.',
  },
  {
    icon: PackageCheck,
    title: 'Orders & Inventory',
    desc: 'Manage products, stock and orders from one place.',
  },
  {
    icon: Users,
    title: 'Customer Management',
    desc: 'Keep customer information and purchase activity organized.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp AI Assistant',
    desc: 'Let customers ask questions and get shopping assistance through WhatsApp.',
  },
  {
    icon: UserCog,
    title: 'Team Management',
    desc: 'Give staff access with appropriate permissions.',
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Features</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Everything Your Business Needs</h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple, powerful tools that work together — so you can run a real business without the complexity.
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
              className="group rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft transition-colors group-hover:bg-brand-soft">
                <f.icon className="h-6 w-6 text-brand transition-colors group-hover:text-brand-dark" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
