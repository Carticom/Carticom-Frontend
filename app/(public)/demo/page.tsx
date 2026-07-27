'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES, getTemplateIcon } from '@/features/templates/registry';
import type { TemplateConfig } from '@/features/templates/types';
import { TemplatePreviewModal } from '@/components/marketing/TemplatePreviewModal';

export default function DemoPage() {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">See it in action</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Try a Live Demo</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Pick a template and see exactly what your storefront will look like — fully interactive, no signup required.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setPreviewTemplate(t)}
            >
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200/50 transition-all duration-300">
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden" style={{ backgroundColor: t.colors.secondary }}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 20%, ${t.colors.primary}44 0%, transparent 60%)` }} />
                  <span className="mb-3 relative z-10">{React.createElement(getTemplateIcon(t.id), { className: 'h-10 w-10 text-white/80' })}</span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{t.category.toLowerCase().replace('_', ' & ')}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Play className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">View Demo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16">
          <p className="text-gray-500 mb-6">Ready to build your store?</p>
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-10 h-14 text-base shadow-lg">
            <Link href="/register">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <TemplatePreviewModal template={previewTemplate} open={!!previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </main>
  );
}
