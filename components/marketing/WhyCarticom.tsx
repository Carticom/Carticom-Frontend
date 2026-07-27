'use client';

import { motion } from 'framer-motion';
import { X, Camera, AlertTriangle, ArrowRight, Check, TrendingUp, Shield, DollarSign, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const COMPARISON = [
  { label: 'Online store', carticom: true, social: false },
  { label: 'Payment processing', carticom: true, social: 'Limited' },
  { label: 'Order management', carticom: true, social: false },
  { label: 'Inventory tracking', carticom: true, social: false },
  { label: 'Customer management', carticom: true, social: 'Manual' },
  { label: 'Analytics & reports', carticom: true, social: false },
  { label: 'Staff roles', carticom: true, social: false },
  { label: 'Escrow protection', carticom: true, social: false },
  { label: 'API access', carticom: true, social: false },
  { label: '24/7 support', carticom: true, social: false },
];

const REASONS = [
  { icon: Shield, title: 'Professional Branding', desc: 'Custom domain, branded checkout, and a storefront that builds trust with customers.' },
  { icon: TrendingUp, title: 'Scale Your Business', desc: 'From 10 orders to 10,000 — our infrastructure grows with you without breaking.' },
  { icon: DollarSign, title: 'Smart Payment Escrow', desc: 'Funds are held securely until orders are confirmed. No chargebacks, no fraud.' },
  { icon: Zap, title: 'Automate Everything', desc: 'AI-powered inventory suggestions, automated invoices, smart order routing.' },
];

export function WhyCarticom() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Why Carticom</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Stop Selling the Hard Way</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">WhatsApp and Instagram are for marketing, not for running a real business. Get the tools you need to grow.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-6"
          >
            {REASONS.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <r.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 border-b border-gray-100">
                <div className="p-4" />
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </div>
                    <span className="text-xs font-bold text-blue-700">Carticom</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                    <X className="h-3.5 w-3.5 text-gray-500" />
                    <Camera className="h-3.5 w-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">Social</span>
                  </div>
                </div>
              </div>
              {COMPARISON.map((row, i) => (
                <div key={row.label} className={cn('grid grid-cols-3 border-b border-gray-50 last:border-0', i % 2 === 0 && 'bg-gray-50/50')}>
                  <div className="p-3.5 px-4 text-sm text-gray-700 font-medium">{row.label}</div>
                  <div className="p-3.5 flex justify-center items-center">
                    {row.carticom === true ? (
                      <Check className="h-5 w-5 text-blue-500" />
                    ) : row.carticom ? (
                      <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">{row.carticom}</span>
                    ) : (
                      <X className="h-5 w-5 text-red-300" />
                    )}
                  </div>
                  <div className="p-3.5 flex justify-center items-center">
                    {row.social === true ? (
                      <Check className="h-5 w-5 text-blue-500" />
                    ) : row.social ? (
                      <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">{row.social}</span>
                    ) : (
                      <X className="h-5 w-5 text-red-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-6">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-700">WhatsApp & Instagram are not commerce platforms</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">You&apos;re losing money without proper inventory tracking, automated order management, payment escrow, and customer insights. Carticom gives you the infrastructure of a global enterprise — built for African businesses.</p>
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 h-12">
            <Link href="/register">Switch to Carticom <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
