'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, LayoutTemplate, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEMPLATES, getTemplateIcon } from '@/features/templates/registry';
import { BUSINESS_CATEGORIES } from '@/features/templates/types';
import type { TemplateConfig } from '@/features/templates/types';
import { TemplatePreviewModal } from '@/components/marketing/TemplatePreviewModal';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { cn } from '@/lib/utils';

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  BUSINESS_CATEGORIES.map((c) => [c.value, c.label])
);

const EFFECT_LABELS: Record<string, string> = {
  'gradient-mesh': 'Gradient Mesh',
  'liquid-glass': 'Liquid Glass',
  geometric: 'Geometric',
  minimal: 'Minimal',
  cinematic: 'Cinematic',
  playful: 'Playful',
  natural: 'Natural',
  vibrant: 'Vibrant',
  craft: 'Artisanal'};

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const templates = useMemo(
    () =>
      activeCategory === 'ALL'
        ? TEMPLATES
        : TEMPLATES.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  const applyHref = isAuthenticated ? '/dashboard/templates' : '/register';

  return (
    <main className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-brand/10 via-brand/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-brand/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-soft border border-brand/15 mb-6">
            <Sparkles className="h-4 w-4 text-brand" />
            <span className="text-xs font-semibold text-brand-dark">16 ready-made storefronts</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight max-w-3xl mx-auto">
            Beautiful storefronts, <span className="text-brand">ready in minutes</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 mt-5 max-w-2xl mx-auto">
            Pick a template, add your products, and start selling across Africa. Every template is
            optimized for mobile and designed to convert.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 mb-10">
          <CategoryTab active={activeCategory === 'ALL'} onClick={() => setActiveCategory('ALL')}>
            All
          </CategoryTab>
          {BUSINESS_CATEGORIES.map((cat) => (
            <CategoryTab key={cat.value} active={activeCategory === cat.value} onClick={() => setActiveCategory(cat.value)}>
              {cat.label}
            </CategoryTab>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((t, i) => (
            <motion.article
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: i * 0.03 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
            >
              <button
                onClick={() => setPreviewTemplate(t)}
                className="relative block w-full aspect-[4/3] overflow-hidden text-left"
                aria-label={`Preview ${t.name}`}
              >
                <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105', t.previewGradient)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl drop-shadow-lg">{t.previewIcon}</span>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-gray-900 shadow">
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-base font-bold text-white drop-shadow truncate">{t.name}</p>
                  <p className="text-[11px] font-medium text-white/80 uppercase tracking-wide">
                    {CATEGORY_LABELS[t.category] || t.category}
                  </p>
                </div>
              </button>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{t.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 capitalize">
                    {EFFECT_LABELS[t.effects.heroEffect] || t.effects.heroEffect}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 capitalize">
                    {t.effects.cardStyle} cards
                  </span>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setPreviewTemplate(t)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
                  </Button>
                  <Button asChild size="sm" className="flex-1 rounded-xl bg-brand hover:bg-brand-dark text-white">
                    <Link href={applyHref}>
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Use
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 rounded-3xl bg-brand-soft border border-brand/15 p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-5%] w-[400px] h-[400px] bg-gradient-to-bl from-brand/15 to-transparent rounded-full blur-3xl" />
          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand mb-5">
              <LayoutTemplate className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your storefront should look as good as your products</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              {isAuthenticated
                ? 'You already have an account — apply any template to your store from your dashboard.'
                : 'Create a free Carticom account and apply any template to your store in one click.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Button asChild className="rounded-xl bg-brand hover:bg-brand-dark text-white px-8 h-12 text-base shadow-lg shadow-brand/20">
                <Link href={applyHref}>
                  {isAuthenticated ? 'Open Dashboard' : 'Get Started Free'} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-gray-300 text-gray-700 hover:bg-white px-8 h-12 text-base">
                <Link href="/demo">
                  <Eye className="mr-2 h-4 w-4" /> Try Live Demo
                </Link>
              </Button>
            </div>
            {!isAuthenticated && (
              <p className="mt-4 text-xs text-gray-500">
                Already have an account?{' '}
                <Link href="/dashboard/templates" className="text-brand font-medium hover:underline">
                  Apply from your dashboard
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </section>

      <TemplatePreviewModal template={previewTemplate} open={!!previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </main>
  );
}

function CategoryTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors',
        active ? 'bg-brand text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
      )}
    >
      {children}
    </button>
  );
}
