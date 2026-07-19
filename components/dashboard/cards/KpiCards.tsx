'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KpiCardData } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const TREND_ICONS = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;

interface KpiCardProps {
  data: KpiCardData;
  isLoading?: boolean;
  index?: number;
}

function Skeleton() {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
      </div>
      <div className="h-10 w-28 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-3" />
      <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
    </div>
  );
}

export function KpiCard({ data, isLoading, index = 0 }: KpiCardProps) {
  if (isLoading) return <Skeleton />;
  const Icon = data.icon;
  const TrendIcon = TREND_ICONS[data.trend];
  const trendColor = data.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : data.changeType === 'negative' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400';
  const iconBg = data.changeType === 'positive' ? 'bg-green-50 dark:bg-green-900/20' : data.changeType === 'negative' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-800';
  const iconColor = data.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : data.changeType === 'negative' ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-semibold text-gray-600 dark:text-gray-300">{data.label}</span>
        <div className={cn('p-3 rounded-xl', iconBg)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {data.prefix}{data.value}{data.suffix}
      </div>
      <div className={cn('flex items-center gap-1.5 text-sm font-semibold', trendColor)}>
        <TrendIcon className="h-4 w-4" />
        <span>{data.change}</span>
        <span className="text-gray-400 ml-1 font-normal">vs last month</span>
      </div>
    </motion.div>
  );
}

interface KpiGridProps {
  cards: KpiCardData[];
  isLoading?: boolean;
}

export function KpiGrid({ cards, isLoading }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, i) => (
        <KpiCard key={card.id} data={card} isLoading={isLoading} index={i} />
      ))}
    </div>
  );
}
