'use client';

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area} from 'recharts';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className = '' }: ChartCardProps) {
  return (
    <div className={`rounded-2xl border bg-card p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

const defaultTooltip = {
  contentStyle: {
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    fontSize: '13px'},
  labelStyle: { fontWeight: 600, color: '#111827' }};

function SalesBarChartInner({ data }: { data: { name: string; sales: number; revenue: number }[] }) {
  return (
    <ChartCard title="Monthly Sales" description="Sales and revenue overview">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip {...defaultTooltip} />
            <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Sales" />
            <Bar dataKey="revenue" fill="#60A5FA" radius={[4, 4, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function RevenueLineChartInner({ data }: { data: { name: string; revenue: number; orders: number }[] }) {
  const [period, setPeriod] = useState<'Monthly' | 'Quarterly' | 'Annually'>('Monthly');

  return (
    <ChartCard title="Revenue Overview" description="Revenue and order trends">
      <div className="flex items-center gap-2 mb-4">
        {(['Monthly', 'Quarterly', 'Annually'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              period === p
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip {...defaultTooltip} />
            <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#revenueGradient)" name="Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

function TargetProgressCardInner({ percentage = 65, target = '$20K', revenue = '$20K', today = '$20K' }: {
  percentage?: number;
  target?: string;
  revenue?: string;
  today?: string;
}) {
  return (
    <ChartCard title="Monthly Target">
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{percentage}%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Target you&apos;ve set for each month
        </p>
        <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
          <span>+10%</span>
          <span className="text-muted-foreground font-normal">You earn higher than last month</span>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
          {[
            { label: 'Target', value: target },
            { label: 'Revenue', value: revenue },
            { label: "Today's", value: today },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

function DemographicCardInner({ data }: { data: { country: string; flag: string; customers: number; percentage: number }[] }) {
  return (
    <ChartCard title="Customers Demographic" description="Number of customers based on country">
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.country} className="flex items-center gap-3">
            <span className="text-lg">{item.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{item.country}</span>
                <span className="text-muted-foreground">{item.customers.toLocaleString()} Customers</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
            <span className="text-sm font-semibold text-foreground min-w-[3rem] text-right">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

function RecentOrdersCardInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Recent Orders</h3>
        <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          See All
        </button>
      </div>
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export const SalesBarChart = React.memo(SalesBarChartInner);
export const RevenueLineChart = React.memo(RevenueLineChartInner);
export const TargetProgressCard = React.memo(TargetProgressCardInner);
export const DemographicCard = React.memo(DemographicCardInner);
export const RecentOrdersCard = React.memo(RecentOrdersCardInner);
