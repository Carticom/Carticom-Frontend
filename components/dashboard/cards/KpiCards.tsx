'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export interface KpiCardData {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
}

function KpiSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-28" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

export function KpiCard({ data, isLoading, index = 0 }: { data: KpiCardData; isLoading?: boolean; index?: number }) {
  if (isLoading) return <KpiSkeleton />;
  const Icon = data.icon;
  const hasChange = data.change && data.changeType;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border bg-card p-5 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{data.label}</p>
          <p className="text-2xl font-semibold text-foreground tracking-tight">{data.value}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      {hasChange && (
        <div className="flex items-center gap-1.5">
          {data.changeType === 'positive' && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
          {data.changeType === 'negative' && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
          <span className={cn(
            'text-xs font-medium',
            data.changeType === 'positive' && 'text-emerald-600',
            data.changeType === 'negative' && 'text-red-600',
            data.changeType === 'neutral' && 'text-muted-foreground',
          )}>
            {data.change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}

export function KpiGrid({ cards, isLoading }: { cards: KpiCardData[]; isLoading?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <KpiCard key={card.id} data={card} isLoading={isLoading} index={i} />
      ))}
    </div>
  );
}
