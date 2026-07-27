'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { TEMPLATES, getTemplatesForCategory, getTemplateIcon } from '@/features/templates/registry';
import type { TemplateConfig } from '@/features/templates/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateSelectStepProps {
  category: string;
  onSelect: (templateId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function TemplateCard({ template, selected, onSelect }: { template: TemplateConfig; selected: boolean; onSelect: () => void }) {
  const Icon = getTemplateIcon(template.id);
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        'relative flex flex-col items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 w-full',
        selected
          ? 'border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      )}
    >
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
          <Check className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div className="flex items-center gap-3 w-full">
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl shrink-0',
          selected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{template.name}</p>
          <p className="text-xs text-gray-500 capitalize">{template.category.toLowerCase().replace('_', ' & ')}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">{template.description}</p>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className="px-2 py-0.5 rounded-full bg-gray-100 capitalize">{template.effects.cardStyle}</span>
        <span className="px-2 py-0.5 rounded-full bg-gray-100 capitalize">{template.effects.buttonStyle}</span>
      </div>
    </motion.button>
  );
}

export function TemplateSelectStep({ category, onSelect, onNext, onBack }: TemplateSelectStepProps) {
  const categoryTemplates = getTemplatesForCategory(category);
  const [selected, setSelected] = useState(categoryTemplates[0]?.id || TEMPLATES[0].id);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Choose Your Storefront Template</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick a Design</h2>
        <p className="text-gray-500">We recommend these templates for your business category. Each can be customized.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {categoryTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selected === template.id}
            onSelect={() => handleSelect(template.id)}
          />
        ))}
        {categoryTemplates.length === 0 && (
          <p className="col-span-2 text-center text-sm text-gray-500 py-8">No templates found for this category.</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
