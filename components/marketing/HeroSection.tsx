'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Cloud, Key, Store, ShoppingBag, Package, Users, CreditCard, TrendingUp, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES, getTemplateIcon } from '@/features/templates/registry';
import type { TemplateConfig } from '@/features/templates/types';
import { TemplatePreviewModal } from './TemplatePreviewModal';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const } },
});

const FLOATING_ITEMS = [
  { icon: Store, label: 'Store', color: 'from-blue-500 to-blue-600', x: '-10%', y: '15%', delay: 0.3 },
  { icon: ShoppingBag, label: 'Orders', color: 'from-blue-500 to-blue-600', x: '75%', y: '10%', delay: 0.5 },
  { icon: Package, label: 'Products', color: 'from-amber-500 to-amber-600', x: '-8%', y: '55%', delay: 0.4 },
  { icon: CreditCard, label: 'Payments', color: 'from-violet-500 to-violet-600', x: '78%', y: '50%', delay: 0.6 },
  { icon: TrendingUp, label: 'Analytics', color: 'from-rose-500 to-rose-600', x: '35%', y: '5%', delay: 0.35 },
  { icon: Bot, label: 'AI', color: 'from-cyan-500 to-cyan-600', x: '35%', y: '70%', delay: 0.45 },
];

const TRUST_BADGES = [
  { icon: Shield, text: 'Secure Authentication' },
  { icon: Cloud, text: 'Cloud Hosted' },
  { icon: Key, text: 'API First' },
];

export function HeroSection() {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);

  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50/60 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <motion.div {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-700 tracking-wide">Built for African Businesses</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight"
            >
              Launch, Manage and Grow
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                Your Business
              </span>
              <br />
              with One Platform.
            </motion.h1>

            <motion.p {...fadeUp(0.3)}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl"
            >
              The all-in-one commerce operating system for Africa. Create stores, manage products and orders,
              accept payments, handle subscriptions, and automate with AI — from one dashboard.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 text-base shadow-lg shadow-blue-200/50 group">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-14 text-base">
                <Link href="/contact">
                  <Play className="mr-2 h-4 w-4" />
                  Book Demo
                </Link>
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-6 pt-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Trusted by</p>
              <div className="flex flex-wrap items-center gap-4">
                {TRUST_BADGES.map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <badge.icon className="h-3.5 w-3.5 text-blue-500" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200/80 shadow-2xl shadow-gray-200/50 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(37,99,235,0.04)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjB2LTIwaDIwdjIweiIgZmlsbD0icmdiYSg1LDE1MCwxMDUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                      <Store className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-400">Dashboard Preview</span>
                  </div>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">Screenshot of Carticom business dashboard will appear here</p>
                </div>
              </div>

              {FLOATING_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: item.delay }}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg shadow-gray-200/30"
                  style={{ left: item.x, top: item.y }}
                >
                  <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br ${item.color}`}>
                    <item.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 md:mt-28"
        >
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">Choose Your Storefront Template</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">Launch in Minutes</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">Pick a professionally designed template tailored for your industry. Customize colors, logo, and content — no coding needed.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEMPLATES.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setPreviewTemplate(t)}
              >
                <div className="aspect-[4/3] rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200/50 transition-all duration-300 relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-4xl mb-3">{React.createElement(getTemplateIcon(t.id), { className: 'h-8 w-8 text-gray-700' })}</span>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{t.category.toLowerCase().replace('_', ' & ')}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            ))}
          </div>

          <TemplatePreviewModal
            template={previewTemplate}
            open={!!previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        </motion.div>
      </div>
    </section>
  );
}
