'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getTemplateIcon } from '@/features/templates/registry';
import type { TemplateConfig } from '@/features/templates/types';
import { Button } from '@/components/ui/button';

interface TemplatePreviewModalProps {
  template: TemplateConfig | null;
  open: boolean;
  onClose: () => void;
}

const SECTION_LABELS: Record<string, { label: string; desc: string }> = {
  hero: { label: 'Hero', desc: 'Full-screen brand introduction' },
  showcase: { label: 'Showcase', desc: 'Product grid with filters' },
  storytelling: { label: 'Story', desc: 'Brand narrative section' },
  values: { label: 'Values', desc: 'Brand values & mission' },
  membership: { label: 'Membership', desc: 'Loyalty & subscription CTA' },
  testimonials: { label: 'Testimonials', desc: 'Customer reviews & social proof' },
  features: { label: 'Features', desc: 'Key product features' },
  categories: { label: 'Categories', desc: 'Browse by category' },
  instagram: { label: 'Social Feed', desc: 'Instagram integration' },
  faq: { label: 'FAQ', desc: 'Frequently asked questions' },
  newsletter: { label: 'Newsletter', desc: 'Email signup form' }};

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

const ANIMATION_LABELS: Record<string, string> = {
  luxury: 'Luxury (Slow, elegant)',
  energetic: 'Energetic (Fast, dynamic)',
  calm: 'Calm (Gentle, relaxed)',
  bold: 'Bold (Dramatic, strong)'};

export function TemplatePreviewModal({ template, open, onClose }: TemplatePreviewModalProps) {
  if (!template) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 md:p-10 space-y-10">
              <div className="flex items-start gap-6">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${template.colors.primary}22, ${template.colors.secondary}11)` }}
                >
                  {React.createElement(getTemplateIcon(template.id), { className: 'h-8 w-8 text-gray-700' })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{template.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 capitalize">
                      {template.category.toLowerCase().replace('_', ' & ')}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">{template.description}</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200">
                <div
                  className="h-48 md:h-64 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: template.colors.secondary }}
                >
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 20%, ${template.colors.primary}66 0%, transparent 60%)` }} />
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 80%, ${template.colors.accent}44 0%, transparent 50%)` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="relative z-10 text-center">
                    <span className="block mb-3">{React.createElement(getTemplateIcon(template.id), { className: 'h-14 w-14 md:h-16 md:w-16 text-white/90' })}</span>
                    <p className="text-white/80 text-sm font-medium tracking-wider uppercase">{template.name}</p>
                  </div>
                </div>
                <div className="p-6 bg-white space-y-6">
                  <div className="flex items-center gap-4">
                    {(['primary', 'secondary', 'accent', 'background'] as const).map((key) => (
                      <div key={key} className="flex items-center gap-2">
                        <div
                          className="h-8 w-8 rounded-lg border border-gray-200 shadow-sm"
                          style={{ backgroundColor: template.colors[key] }}
                        />
                        <span className="text-xs text-gray-500 capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['text', 'muted', 'surface', 'border'] as const).map((key) => (
                      <div key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                        <div
                          className="h-3 w-3 rounded"
                          style={{ backgroundColor: template.colors[key] }}
                        />
                        <span className="text-xs text-gray-500 capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Typography</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Headings</p>
                      <p className="text-xl font-bold text-gray-900 truncate" style={{ fontFamily: template.typography.headingFont }}>
                        {template.typography.headingFont.split(',')[0]}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400 mb-1">Body</p>
                      <p className="text-base text-gray-700 truncate" style={{ fontFamily: template.typography.bodyFont }}>
                        {template.typography.bodyFont.split(',')[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Effects & Style</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-600">Hero Effect</span>
                      <span className="text-sm font-medium text-gray-900">{EFFECT_LABELS[template.effects.heroEffect] || template.effects.heroEffect}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-600">Card Style</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{template.effects.cardStyle}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-600">Button Style</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{template.effects.buttonStyle}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-sm text-gray-600">Animation</span>
                      <span className="text-sm font-medium text-gray-900">{ANIMATION_LABELS[template.effects.animationPreset] || template.effects.animationPreset}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Sections</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {template.sections.map((section) => (
                    <div key={section} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">{SECTION_LABELS[section]?.label || section}</p>
                        <p className="text-xs text-gray-400 truncate">{SECTION_LABELS[section]?.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base shadow-lg shadow-blue-200/50">
                  <Link href="/register">
                    Use This Template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-12 text-base">
                  <Link href={`/store/preview/${template.slug}`}>
                    Live Preview
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
