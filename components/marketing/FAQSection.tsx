'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  { q: 'What is Carticom?', a: 'Carticom is an all-in-one commerce operating system for African businesses. It provides tools to create online stores, manage products and orders, accept payments, handle subscriptions, and automate business operations with AI.' },
  { q: 'How is Carticom different from Shopify?', a: 'While Shopify is built for global markets, Carticom is designed specifically for African businesses. We offer local payment integration (bank transfers, USSD, mobile money), escrow protection for trust, AI-powered tools, and pricing suited for African entrepreneurs.' },
  { q: 'Do I need a website to use Carticom?', a: 'No. Carticom provides you with a professional storefront website and templates. You can start selling immediately without any web development skills.' },
  { q: 'What payment methods are supported?', a: 'Carticom supports card payments, bank transfers, USSD codes, mobile money, and our smart escrow system that protects both buyers and sellers.' },
  { q: 'Is there a free trial?', a: 'Yes! You can start with a 14-day free trial that includes full access to all features. No credit card required.' },
  { q: 'Can I sell both physical and digital products?', a: 'Absolutely. Carticom supports physical products with inventory tracking, digital downloads, subscriptions, and service-based offerings.' },
  { q: 'How does the escrow system work?', a: 'When a customer makes a purchase, the payment is held securely by Carticom. The funds are released to you only after the customer confirms delivery. This builds trust and reduces fraud.' },
  { q: 'Can I integrate with my existing tools?', a: 'Yes. Carticom provides REST APIs, webhooks, and is building integrations with popular accounting, shipping, and marketing tools.' },
  { q: 'What kind of support do you offer?', a: 'We offer email support for all plans, priority chat support for Growth plans, and a dedicated account manager for Business and Enterprise plans.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use enterprise-grade encryption, secure cloud infrastructure (AWS), JWT authentication, role-based access control, and automated daily backups.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50/20 to-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="space-y-2">
          {filtered.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-gray-100 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50/50"
              >
                <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                <ChevronDown className={cn('h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
