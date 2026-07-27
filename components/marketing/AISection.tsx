'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, BarChart3, TrendingUp, Package, Sparkles, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const AI_FEATURES = [
  { icon: MessageSquare, title: 'WhatsApp AI', desc: 'Automated customer support, order updates, and product recommendations via WhatsApp.' },
  { icon: Bot, title: 'AI Assistant', desc: 'Natural language queries for sales data, inventory status, and business insights.' },
  { icon: BarChart3, title: 'Business Insights', desc: 'AI-powered analysis of your sales trends, customer behavior, and growth opportunities.' },
  { icon: TrendingUp, title: 'Sales Forecasting', desc: 'Predict future revenue, identify seasonal patterns, and plan inventory accordingly.' },
  { icon: Package, title: 'Inventory Suggestions', desc: 'AI recommends reorder quantities based on historical data and upcoming demand.' },
];

export function AISection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span className="text-xs font-semibold text-violet-700 tracking-wide">Coming Soon</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">AI-Powered Commerce</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Let artificial intelligence handle the heavy lifting while you focus on growing your business.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            {AI_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-violet-100 hover:bg-violet-50/30 transition-all group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <span className="text-[10px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">Soon</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-violet-50 to-white border border-violet-100 flex items-center justify-center shadow-sm"
          >
            <div className="text-center p-8">
              <Bot className="h-16 w-16 text-violet-300 mx-auto mb-4" />
              <p className="text-sm text-gray-400">AI Dashboard preview</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-violet-500">
                <Clock className="h-3.5 w-3.5" />
                Available Q4 2026
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
