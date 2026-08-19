'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutTemplate, Check, Eye, ExternalLink, X, Sparkles, Loader2} from 'lucide-react';
import { useMyStores, useUpdateStore } from '@/features/onboarding/hooks/useOnboarding';
import { LoadingState, ErrorState } from '@/components/dashboard/shared/StateComponents';
import { showToast } from '@/lib/notifications/toast';
import { TEMPLATES, getTemplateIcon } from '@/features/templates/registry';
import { BUSINESS_CATEGORIES } from '@/features/templates/types';
import type { TemplateConfig } from '@/features/templates/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

function TemplateCard({
  template,
  isActive,
  applying,
  onPreview,
  onApply,
}: {
  template: TemplateConfig;
  isActive: boolean;
  applying: boolean;
  onPreview: () => void;
  onApply: () => void;
}) {
  const Icon = getTemplateIcon(template.id);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300',
        isActive
          ? 'border-blue-500 ring-1 ring-blue-200 shadow-lg shadow-blue-100/50'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
      )}
    >
      <button
        onClick={onPreview}
        className="relative block w-full h-36 overflow-hidden text-left"
        aria-label={`Preview ${template.name}`}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105', template.previewGradient)}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg">{template.previewIcon}</span>
        </div>
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-semibold text-gray-700">
          <Eye className="h-3 w-3" /> Preview
        </span>
        {isActive && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600 text-[10px] font-semibold text-white shadow">
            <Check className="h-3 w-3" /> Active
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-bold text-white drop-shadow truncate">{template.name}</p>
          <p className="text-[10px] font-medium text-white/80 uppercase tracking-wide">
            {CATEGORY_LABELS[template.category] || template.category}
          </p>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{template.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 capitalize">
            {EFFECT_LABELS[template.effects.heroEffect] || template.effects.heroEffect}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 capitalize">
            {template.effects.cardStyle} cards
          </span>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onPreview}
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
          </Button>
          {isActive ? (
            <Button size="sm" className="flex-1 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-default" disabled>
              <Check className="h-3.5 w-3.5 mr-1.5" /> Active
            </Button>
          ) : (
            <Button
              size="sm"
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onApply}
              disabled={applying}
            >
              {applying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1.5" />}
              {applying ? 'Applying...' : 'Apply'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PreviewModal({
  template,
  isActive,
  applying,
  onClose,
  onApply,
}: {
  template: TemplateConfig | null;
  isActive: boolean;
  applying: boolean;
  onClose: () => void;
  onApply: () => void;
}) {
  if (!template) return null;
  const Icon = getTemplateIcon(template.id);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white transition-colors"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>

          <div className={cn('relative h-48 overflow-hidden bg-gradient-to-br', template.previewGradient)}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
              <span className="text-5xl mb-3 drop-shadow-lg">{template.previewIcon}</span>
              <p className="text-white/90 text-sm font-semibold tracking-wider uppercase">{template.name}</p>
            </div>
            {isActive && (
              <span className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-xs font-semibold text-white shadow">
                <Check className="h-3.5 w-3.5" /> Current Template
              </span>
            )}
          </div>

          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600 capitalize">
                  {CATEGORY_LABELS[template.category] || template.category}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{template.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Hero Effect</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {EFFECT_LABELS[template.effects.heroEffect] || template.effects.heroEffect}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Cards</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{template.effects.cardStyle}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Buttons</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{template.effects.buttonStyle}</p>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Fonts</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{template.typography.headingFont.split(',')[0]}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Sections</p>
              <div className="flex flex-wrap gap-1.5">
                {template.sections.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-medium text-blue-700 capitalize">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <Button
                className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                onClick={onApply}
                disabled={applying || isActive}
              >
                {applying ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : isActive ? <Check className="h-4 w-4 mr-1.5" /> : <Sparkles className="h-4 w-4 mr-1.5" />}
                {applying ? 'Applying...' : isActive ? 'Already Active' : 'Apply to my store'}
              </Button>
              <Button variant="outline" className="rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TemplatesPage() {
  const { data: stores, isLoading, error, refetch } = useMyStores();
  const updateStore = useUpdateStore();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);

  const store = stores?.[0] ?? null;
  const activeTemplateId = store?.template ?? null;

  const templates = useMemo(
    () =>
      activeCategory === 'ALL'
        ? TEMPLATES
        : TEMPLATES.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  const handleApply = async (template: TemplateConfig) => {
    if (!store) return;
    setApplyingId(template.id);
    try {
      await updateStore.mutateAsync({ id: store.id, data: { template: template.id } });
      showToast('success', `Template updated to ${template.name}`);
      refetch();
      setPreviewTemplate(null);
    } catch {
      showToast('error', 'Failed to update template');
    } finally {
      setApplyingId(null);
    }
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTemplateId) ?? null;

  if (isLoading) {
    return <LoadingState message="Loading templates..." />;
  }

  if (error) {
    return <ErrorState title="Couldn't load templates" description="We encountered an error while loading your store. Please try again." onRetry={refetch} />;
  }

  if (!store) {
    return (
      <div className="space-y-6">
        <Header activeTemplate={activeTemplate} storeLink={null} />
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 mb-4">
            <LayoutTemplate className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">No store yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Create your store first, then pick a storefront template to bring it to life.
          </p>
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/dashboard/store">Set Up My Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header activeTemplate={activeTemplate} storeLink={store.slug ? `/store/${store.slug}` : null} />

      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <CategoryTab active={activeCategory === 'ALL'} onClick={() => setActiveCategory('ALL')}>
          All
        </CategoryTab>
        {BUSINESS_CATEGORIES.map((cat) => (
          <CategoryTab key={cat.value} active={activeCategory === cat.value} onClick={() => setActiveCategory(cat.value)}>
            {cat.label}
          </CategoryTab>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isActive={template.id === activeTemplateId}
              applying={applyingId === template.id}
              onPreview={() => setPreviewTemplate(template)}
              onApply={() => handleApply(template)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <PreviewModal
        template={previewTemplate}
        isActive={previewTemplate ? previewTemplate.id === activeTemplateId : false}
        applying={previewTemplate ? applyingId === previewTemplate.id : false}
        onClose={() => setPreviewTemplate(null)}
        onApply={() => previewTemplate && handleApply(previewTemplate)}
      />
    </div>
  );
}

function CategoryTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-none px-4 py-2 rounded-full text-sm font-medium transition-colors',
        active ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
      )}
    >
      {children}
    </button>
  );
}

function Header({ activeTemplate, storeLink }: { activeTemplate: TemplateConfig | null; storeLink: string | null }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Storefront Templates</h1>
        <p className="text-sm text-gray-500 mt-1">Pick a design and apply it to your store in one click. Every template is fully customizable.</p>
      </div>
      {activeTemplate && (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2.5 pr-4">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl', activeTemplate.previewGradient)}>
            {activeTemplate.previewIcon}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Active Template</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{activeTemplate.name}</p>
          </div>
          {storeLink && (
            <Link
              href={storeLink}
              target="_blank"
              className="ml-2 flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View store
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
