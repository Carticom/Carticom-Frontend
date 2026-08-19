'use client';


import { motion } from 'framer-motion';

import type { ChartDataPoint, ChartConfig } from '@/types/dashboard';


interface ChartSectionProps {
  config: ChartConfig;
  data: ChartDataPoint[];
  isLoading?: boolean;
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="h-5 w-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2" />
      <div className="h-48 bg-gray-50 dark:bg-gray-800/50 rounded-lg" />
    </div>
  );
}

export function ChartCard({ config, data, isLoading }: ChartSectionProps) {
  if (isLoading) return <Skeleton />;
  const maxVal = Math.max(...data.map((d) => d.value));
  const hasSecondary = data.some((d) => d.secondary !== undefined);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">{config.title}</h3>
        {config.description && <p className="text-xs text-gray-500 mt-1">{config.description}</p>}
      </div>
      <div className="h-40 flex items-end gap-1.5">
        {data.map((point, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-0.5 items-end flex-1 max-h-36">
              <div className="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t" style={{ height: Math.max(4, (point.value / maxVal) * 100) + '%' }} />
              {hasSecondary && point.secondary !== undefined && (
                <div className="flex-1 bg-blue-200 dark:bg-blue-700 rounded-t" style={{ height: Math.max(4, (point.secondary / maxVal) * 100) + '%' }} />
              )}
            </div>
            <span className="text-[10px] text-gray-400 truncate w-full text-center">{point.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        {hasSecondary && <><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> This period</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-200 dark:bg-blue-700" /> Previous</span></>}
      </div>
    </motion.div>
  );
}

interface ChartGridProps {
  charts: ChartConfig[];
  dataMap: Record<string, ChartDataPoint[]>;
  isLoading?: boolean;
}

export function ChartGrid({ charts, dataMap, isLoading }: ChartGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map((chart) => (
        <ChartCard key={chart.id} config={chart} data={dataMap[chart.id] || []} isLoading={isLoading} />
      ))}
    </div>
  );
}
