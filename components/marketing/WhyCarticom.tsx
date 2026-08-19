'use client';

import { motion } from 'framer-motion';
import { Rocket, MapPin, BadgePercent, MessageCircle, PiggyBank, Boxes } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const REASONS = [
  {
    icon: Rocket,
    title: 'Simple setup',
    desc: 'Create a store and start selling the same day — no developer needed.',
  },
  {
    icon: MapPin,
    title: 'Local business needs',
    desc: 'Built around Nigerian payments, currency and how businesses here actually sell.',
  },
  {
    icon: BadgePercent,
    title: 'Affordable SaaS pricing',
    desc: 'Plans from ₦5,000 a month — with a free trial to get started.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-first experience',
    desc: 'Meet customers where they already are, with a WhatsApp AI assistant.',
  },
  {
    icon: PiggyBank,
    title: 'No commission on sales',
    desc: 'You keep 100% of your revenue. Carticom earns from your subscription, not your sales.',
  },
  {
    icon: Boxes,
    title: 'All-in-one management',
    desc: 'Store, orders, inventory, customers and staff in one simple dashboard.',
  },
];

export function WhyCarticom() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">Why Carticom</p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Built for African businesses</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Not a Western tool that happens to work in Nigeria — a platform designed around how African merchants
              sell, get paid and serve customers.
            </p>
            <Link
              href="/register"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Start selling with Carticom
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-gray-50/40 p-5 transition-colors hover:border-brand/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
                  <r.icon className="h-5 w-5 text-brand-dark" />
                </div>
                <h3 className="font-semibold text-gray-900">{r.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
