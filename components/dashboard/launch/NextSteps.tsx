'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Package, CreditCard, MessageCircle, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
}

interface NextStepsProps {
  actions: ActionCard[];
}

const colorClasses = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400',
  pink: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400',
};

export function NextSteps({ actions }: NextStepsProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Your Next Steps
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.id}
              href={action.link}
              className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={cn('p-3 rounded-lg border', colorClasses[action.color])}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}