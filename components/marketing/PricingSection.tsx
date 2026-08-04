'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axiosInstance from '@/lib/axios';

interface SubscriptionPlanDTO {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  productLimit: number;
  staffLimit: number;
  paymentsEnabled: boolean;
  customDomainEnabled: boolean;
  durationDays: number | null;
}

interface Plan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const PLAN_ORDER: Record<string, number> = {
  'Free Trial': 0, 'Starter': 1, 'Growth': 2, 'Business': 3, 'Enterprise': 4};

function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `₦${amount.toLocaleString()}`;
}

function generateFeatures(dto: SubscriptionPlanDTO, yearly: boolean): string[] {
  const features: string[] = [];
  const limits = [`${dto.productLimit === 999999 ? 'Unlimited' : dto.productLimit} products`, `${dto.staffLimit === 999999 ? 'Unlimited' : dto.staffLimit} staff accounts`];
  features.push(...limits);
  if (dto.paymentsEnabled) features.push('Payment processing');
  if (dto.customDomainEnabled) features.push('Custom domain');
  features.push('Order management', 'Inventory tracking');
  if (dto.name === 'Growth' || dto.name === 'Business' || dto.name === 'Enterprise') {
    features.push('Advanced analytics', 'AI insights', 'Escrow protection', 'Priority support');
  }
  if (dto.name === 'Business' || dto.name === 'Enterprise') {
    features.push('Dedicated account manager', 'Custom integrations', 'SLA guarantee');
  }
  if (dto.name === 'Enterprise') {
    features.push('White-label option', 'Custom development', '24/7 dedicated support');
  }
  if (yearly && dto.monthlyPrice > 0) {
    const savePct = Math.round((1 - dto.yearlyPrice / (dto.monthlyPrice * 12)) * 100);
    if (savePct > 0) features.push(`Save ${savePct}% with yearly billing`);
  }
  return features;
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const { data: plans, isLoading, error } = useQuery<SubscriptionPlanDTO[]>({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/subscriptions/plans');
      return res.data?.data ?? [];
    },
    staleTime: 5 * 60_000});

  const displayPlans: Plan[] = useMemo(() => {
    if (!plans) return [];
    const sorted = [...plans].sort((a, b) => (PLAN_ORDER[a.name] ?? 99) - (PLAN_ORDER[b.name] ?? 99));
    return sorted.map((dto) => {
      const price = yearly ? dto.yearlyPrice : dto.monthlyPrice;
      const period = yearly ? '/year' : dto.name === 'Free Trial' ? ' trial' : '/month';
      return {
        name: dto.name,
        price: formatPrice(price),
        period,
        desc: dto.description,
        features: generateFeatures(dto, yearly),
        cta: dto.monthlyPrice === 0 ? 'Get Started Free' : 'Start Free Trial',
        popular: dto.name === 'Growth'};
    });
  }, [plans, yearly]);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-blue-50/20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Start free, upgrade as you grow. No hidden fees, no surprise charges.</p>
          <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-xl bg-gray-100">
            <button onClick={() => setYearly(false)} className={cn('px-5 py-2 text-sm font-medium rounded-lg transition-all', !yearly && 'bg-white text-gray-900 shadow-sm')}>Monthly</button>
            <button onClick={() => setYearly(true)} className={cn('px-5 py-2 text-sm font-medium rounded-lg transition-all', yearly && 'bg-white text-gray-900 shadow-sm')}>
              Yearly
              {!isLoading && plans?.some(p => p.monthlyPrice > 0 && p.yearlyPrice < p.monthlyPrice * 12) && (
                <span className="ml-1.5 text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-full">Save up to 20%</span>
              )}
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
        ) : error ? (
          <div className="text-center py-20 text-gray-500">
            <p>Unable to load pricing.</p>
            <p className="text-sm mt-1">Please refresh or contact support.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {displayPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-6 transition-all duration-300',
                  plan.popular
                    ? 'border-blue-200 bg-white shadow-xl shadow-blue-100/20 scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-200/50 whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.desc}</p>
                </div>
                <div className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className={cn(
                    'rounded-xl h-12 text-sm font-semibold',
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200/30'
                      : plan.name === 'Enterprise'
                      ? 'bg-gray-900 hover:bg-gray-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  )}
                >
                  <Link href={'/register'}>{plan.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        )}

        {displayPlans.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Compare all features <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
