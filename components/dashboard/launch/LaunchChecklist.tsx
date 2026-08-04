'use client';


import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  link?: string;
}

interface LaunchChecklistProps {
  items: ChecklistItem[];
}

export function LaunchChecklist({ items }: LaunchChecklistProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Business Launch Progress
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 shrink-0" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  item.completed
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                {item.label}
              </span>
            </div>
            {item.link && !item.completed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(item.link, '_self')}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Setup
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}