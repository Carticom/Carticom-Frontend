'use client';

import { motion } from 'framer-motion';
import { Calendar, CreditCard, BarChart3, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Calendar, title: 'Booking & Scheduling', description: 'Let clients book appointments online. Automated calendar sync, reminders, and rescheduling — no more back-and-forth.', color: 'blue' },
  { icon: CreditCard, title: 'Service Payments', description: 'Accept deposits, full payments, or retainers. Verified payments ensure trust for both you and your clients.', color: 'indigo' },
  { icon: MessageSquare, title: 'Client Communication', description: 'Automated booking confirmations, reminders, and follow-ups via SMS, WhatsApp, and email.', color: 'purple' },
  { icon: BarChart3, title: 'Business Analytics', description: 'Track bookings, revenue, client retention, and peak service periods. Make informed decisions for your service business.', color: 'orange' },
];

const benefits = [
  '24/7 online booking — no phone tag',
  'Automated appointment reminders reduce no-shows',
  'Secure deposits and verified payments',
  'Client history and preferences at your fingertips',
  'Multi-service and package pricing support',
  'Staff scheduling and commission tracking',
];

export default function ServicesPage() {
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
              Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Businesses</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 mt-6 max-w-2xl">
              From consulting to cleaning, fitness to photography — Carticom helps service businesses accept bookings, manage clients, and get paid on time.
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Built for Service Providers</h2>
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
