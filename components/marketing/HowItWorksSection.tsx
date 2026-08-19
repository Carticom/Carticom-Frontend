'use client';

import { motion } from 'framer-motion';
import { Store, Share2, ShoppingBag } from 'lucide-react';

const STEPS = [
  {
    icon: Store,
    step: '01',
    title: 'Create your store',
    desc: 'Add your business information and products.',
  },
  {
    icon: Share2,
    step: '02',
    title: 'Share your store',
    desc: 'Share your store link with customers through WhatsApp, Instagram and other channels.',
  },
  {
    icon: ShoppingBag,
    step: '03',
    title: 'Start selling',
    desc: 'Receive orders, manage your business and serve customers from Carticom.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-white py-20 md:py-28" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">How it works</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Selling online in 3 simple steps</h2>
          <p className="mt-4 text-lg text-gray-600">
            From sign-up to your first order — in less time than it takes to organise your WhatsApp chats.
          </p>
        </motion.div>

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-lg shadow-brand/5">
                <s.icon className="h-8 w-8 text-brand" />
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
