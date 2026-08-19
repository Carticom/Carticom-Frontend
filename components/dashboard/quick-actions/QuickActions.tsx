'use client';


import Link from 'next/link';
import { motion } from 'framer-motion';
import type { QuickAction } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const COLOR_MAP: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
  green: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
  purple: 'from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
  orange: 'from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
  cyan: 'from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
  red: 'from-red-500 to-red-600 dark:from-red-600 dark:to-red-700'};

interface QuickActionsProps {
  actions: QuickAction[];
  isLoading?: boolean;
}

function Skeleton() {
  return <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />;
}

export function QuickActionCard({ action }: { action: QuickAction }) {
  const color = COLOR_MAP[action.color || 'blue'];
  const content = (
    <div className="flex items-center gap-4 h-full">
      <div className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white " + color}>
        <action.icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{action.label}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{action.description}</div>
      </div>
    </div>
  );

  if (action.href) {
    return (
      <Link href={action.href} className={cn('block h-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow', action.disabled && 'opacity-50 pointer-events-none')}>
        {content}
      </Link>
    );
  }
  return <div className={cn('h-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900', action.disabled && 'opacity-50')}>{content}</div>;
}

export function QuickActions({ actions, isLoading }: QuickActionsProps) {
  if (isLoading) {
    return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)}</div>;
  }
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action) => <QuickActionCard key={action.id} action={action} />)}
    </motion.div>
  );
}
