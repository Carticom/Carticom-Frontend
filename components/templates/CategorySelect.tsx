'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TEMPLATES, getTemplateIcon } from '@/features/templates/registry';
import { BUSINESS_CATEGORIES } from '@/features/templates/types';
import { motion } from 'framer-motion';
import type { BusinessCategory } from '@/features/templates/types';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {BUSINESS_CATEGORIES.map((cat: { value: string; label: string; description: string }) => {
        const template = TEMPLATES.find((t) => t.category === cat.value);
        const selected = value === cat.value || value === cat.label;
        return (
          <motion.button
            key={cat.value}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(cat.label)}
            className={cn(
              'relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-left transition-all duration-200',
              selected
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            )}
          >
            {selected && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
            <span className="text-2xl">{template ? React.createElement(getTemplateIcon(template.id), { className: 'h-6 w-6 text-gray-600' }) : null}</span>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">{cat.label.split('&')[0].trim()}</p>
              {cat.label.includes('&') && (
                <p className="text-sm font-medium text-gray-900">&{cat.label.split('&')[1]}</p>
              )}
            </div>
            <p className="text-[10px] text-gray-500 text-center leading-tight">{cat.description}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
