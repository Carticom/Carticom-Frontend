'use client';

import { motion } from 'framer-motion';
import { Store, ShoppingBag, Users, BarChart3, ArrowRight, CheckCircle, CreditCard, Package, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  { icon: ShoppingBag, title: 'POS Integration', description: 'Connect your physical point-of-sale with your online store. Sync inventory, sales, and customers in real time across all channels.', color: 'blue' },
  { icon: Package, title: 'Inventory Sync', description: 'Manage stock across multiple locations from one dashboard. Get low-stock alerts and automate reordering.', color: 'indigo' },
  { icon: Users, title: 'Customer Management', description: 'Track purchase history, preferences, and loyalty points. Send targeted promotions via SMS, WhatsApp, or email.', color: 'purple' },
  { icon: BarChart3, title: 'Retail Analytics', description: 'Understand foot traffic patterns, conversion rates, and top-selling items. Make data-driven decisions for your retail business.', color: 'orange' },
];

const benefits = [
  'Real-time inventory sync across all store locations',
  'Unified online and offline sales tracking',
  'Customer loyalty and rewards programs',
  'Automated purchase orders and supplier management',
  'Staff performance and shift management',
  'Built-in barcode and QR code scanning',
];

export default function RetailPage() {
  return (
    <main className="flex-1">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50/60 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Retail & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">POS</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 mt-6 max-w-2xl">
              Bridge the gap between your physical stores and online channels. Carticom Retail unifies inventory, sales, and customer data across every touchpoint.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-4 mt-8">
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-base shadow-lg shadow-blue-200/50">
                <Link href="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-14 text-base">
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything Your Retail Business Needs</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-blue-200/50 transition-all">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${f.color}-100 mb-4`}>
                  <f.icon className={`h-6 w-6 text-${f.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Benefits</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 p-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
