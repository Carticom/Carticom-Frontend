'use client';

import { useMemo, useState } from 'react';
import { useProductVariants } from '@/features/dashboard/hooks/useVariants';
import type { ProductVariantDto } from '@/features/dashboard/types/variants.types';
import { cn } from '@/lib/utils';

interface SelectedVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
  sku: string;
}

interface VariantSelectorProps {
  productId: string;
  onChange: (selected: SelectedVariant[]) => void;
  className?: string;
}

const COLOR_VALUE_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const KNOWN_COLORS: Record<string, string> = {
  red: '#EF4444',
  blue: '#3B82F6',
  green: '#22C55E',
  yellow: '#EAB308',
  purple: '#A855F7',
  pink: '#EC4899',
  orange: '#F97316',
  brown: '#92400E',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#6B7280',
  grey: '#6B7280',
  navy: '#1E3A5F',
  teal: '#14B8A6',
  cyan: '#06B6D4',
  indigo: '#6366F1',
  violet: '#8B5CF6',
  fuchsia: '#D946EF',
  rose: '#F43F5E',
  lime: '#65A30D',
  emerald: '#10B981',
  sky: '#0EA5E9',
  amber: '#D97706',
  slate: '#64748B',
  charcoal: '#36454F',
  ivory: '#FFFFF0',
  beige: '#F5F5DC',
  tan: '#D2B48C',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  cream: '#FFFDD0',
  maroon: '#800000',
  coral: '#FF7F50',
  salmon: '#FA8072',
  khaki: '#C3B091',
  olive: '#808000',
  plum: '#DDA0DD',
  orchid: '#DA70D6',
  lavender: '#E6E6FA',
  turquoise: '#40E0D0',
  mint: '#98FB98',
  peach: '#FFDAB9',
  apricot: '#FBCEB1',
  mauve: '#E0B0FF',
  taupe: '#483C32'};

function isColorValue(value: string): string | null {
  if (COLOR_VALUE_REGEX.test(value)) return value;
  const lower = value.toLowerCase().trim();
  return KNOWN_COLORS[lower] ?? null;
}

function VariantSelector({ productId, onChange, className }: VariantSelectorProps) {
  const { data: variants, isLoading } = useProductVariants(productId);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const groups = useMemo(() => {
    if (!variants) return [];
    const map = new Map<string, ProductVariantDto[]>();
    for (const v of variants) {
      if (!v.isActive) continue;
      const arr = map.get(v.name) ?? [];
      arr.push(v);
      map.set(v.name, arr);
    }
    return Array.from(map.entries());
  }, [variants]);

  const handleSelect = (groupName: string, value: string) => {
    const next = { ...selections, [groupName]: value };
    setSelections(next);
    const chosen = groups
      .map(([name]) => {
        const v = next[name];
        return groups.find(([gName]) => gName === name)?.[1].find((x) => x.value === v);
      })
      .filter(Boolean) as ProductVariantDto[];
    onChange(chosen.map((v) => ({ id: v.id, name: v.name, value: v.value, price: v.price, stock: v.stock, sku: v.sku })));
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="flex gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!groups.length) return null;

  return (
    <div className={cn('space-y-5', className)}>
      {groups.map(([groupName, options]) => {
        const colorPreview = isColorValue(options[0]?.value ?? '');
        const isColorGroup = colorPreview !== null;

        return (
          <div key={groupName}>
            <p className="text-sm font-medium text-gray-900 mb-2.5">{groupName}</p>
            {isColorGroup ? (
              <div className="flex flex-wrap gap-2.5">
                {options.map((opt) => {
                  const swatchColor = isColorValue(opt.value) ?? '#ccc';
                  const isSelected = selections[groupName] === opt.value;
                  const outOfStock = opt.stock <= 0;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={outOfStock}
                      onClick={() => handleSelect(groupName, opt.value)}
                      title={`${opt.value}${opt.price ? ` - $${opt.price}` : ''}${outOfStock ? ' (Out of Stock)' : ''}`}
                      className={cn(
                        'relative h-10 w-10 rounded-full ring-2 ring-offset-2 transition-all',
                        isSelected ? 'ring-gray-900 scale-110' : 'ring-transparent hover:ring-gray-300',
                        outOfStock && 'opacity-40 cursor-not-allowed ring-gray-200'
                      )}
                    >
                      <span
                        className="block h-full w-full rounded-full"
                        style={{ backgroundColor: swatchColor }}
                      />
                      {outOfStock && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="h-0.5 w-6 rotate-45 rounded-full bg-gray-400" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                  const isSelected = selections[groupName] === opt.value;
                  const outOfStock = opt.stock <= 0;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={outOfStock}
                      onClick={() => handleSelect(groupName, opt.value)}
                      className={cn(
                        'rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all',
                        isSelected
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
                        outOfStock && 'opacity-40 cursor-not-allowed line-through'
                      )}
                    >
                      {opt.value}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { VariantSelector };
export type { SelectedVariant };
