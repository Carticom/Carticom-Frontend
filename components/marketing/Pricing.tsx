'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap, Loader2, AlertCircle } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';

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
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  save?: string;
}

const PLAN_ORDER: Record<string, number> = {
  'Free Trial': 0,
  'Starter': 1,
  'Growth': 2,
  'Business': 3,
  'Enterprise': 4};

function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `₦${amount.toLocaleString()}`;
}

function generateFeatures(dto: SubscriptionPlanDTO, _yearly: boolean): string[] {
  const features: string[] = [];

  const productLimit = dto.productLimit >= 99999 ? 'Unlimited products' : `Up to ${dto.productLimit.toLocaleString()} products`;
  features.push(productLimit);

  features.push(dto.customDomainEnabled ? 'Custom domain + SSL' : 'Basic storefront');

  features.push(dto.paymentsEnabled ? 'Paystack + Flutterwave' : 'Manual payments');

  if (dto.staffLimit >= 99999) {
    features.push('Unlimited staff accounts');
  } else {
    features.push(`${dto.staffLimit} staff account${dto.staffLimit !== 1 ? 's' : ''}`);
  }

  switch (dto.name) {
    case 'Free Trial':
      features.push('Community support', 'Basic analytics');
      break;
    case 'Starter':
      features.push('Email support', 'Advanced analytics', 'WhatsApp orders');
      break;
    case 'Growth':
      features.push('Priority support', 'AI automation (basic)', 'Bulk import/export', 'API access');
      break;
    case 'Business':
      features.push('24/7 phone support', 'Full AI automation', 'Bulk import/export', 'API access', 'Dedicated manager');
      break;
    case 'Enterprise':
      features.push('White-label options', 'Custom integrations', 'SLA guarantee', 'Custom AI training', 'Dedicated support team', 'Custom contracts');
      break;
  }

  return features;
}

function ToggleSwitch({
  isYearly,
  onToggle}: {
  isYearly: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span
        className={`text-sm font-medium transition-colors ${
          !isYearly ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-7 w-12 items-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        role="switch"
        aria-checked={isYearly}
        aria-label="Toggle billing period"
      >
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-transform ${
            isYearly ? 'translate-x-6' : 'translate-x-1'
          }`}
        >
          {isYearly && (
            <Zap className="h-3 w-3 text-blue-600" aria-hidden="true" />
          )}
        </span>
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          isYearly ? 'text-gray-900' : 'text-gray-400'
        }`}
      >
        Yearly
        <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          2 months free
        </span>
      </span>
    </div>
  );
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const { data: plans, isLoading, error } = useQuery<SubscriptionPlanDTO[]>({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/v1/subscriptions/plans');
      return res.data?.data ?? [];
    },
    staleTime: 5 * 60_000});

  const sortedPlans = useMemo(() => {
    if (!plans) return [];
    return [...plans].sort(
      (a, b) => (PLAN_ORDER[a.name] ?? 99) - (PLAN_ORDER[b.name] ?? 99)
    );
  }, [plans]);

  const displayPlans: Plan[] = useMemo(() => {
    return sortedPlans.map((dto) => {
      const isEnterprise = dto.name === 'Enterprise';
      const price = isYearly ? dto.yearlyPrice : dto.monthlyPrice;
      const period = isYearly ? '/year' : dto.name === 'Free Trial' ? '/mo (30 days)' : '/month';

      const save = isYearly && dto.monthlyPrice > 0
        ? `Save ${Math.round((1 - dto.yearlyPrice / (dto.monthlyPrice * 12)) * 100)}%`
        : undefined;

      return {
        name: dto.name,
        price: formatPrice(price),
        period,
        description: dto.description,
        features: generateFeatures(dto, isYearly),
        cta: isEnterprise ? 'Contact Sales' : dto.monthlyPrice === 0 ? 'Get Started Free' : 'Start Free Trial',
        popular: dto.name === 'Growth',
        save};
    });
  }, [sortedPlans, isYearly]);

  return (
    <section id="pricing" className="py-24 bg-gray-50/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Simple, Transparent Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose the plan that fits your business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Start free. No credit card required. Scale as you grow.
          </motion.p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
            <p className="text-gray-600 text-sm mb-4">
              Unable to load pricing plans right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && displayPlans.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-gray-500 text-sm">No plans available at this time.</p>
          </div>
        )}

        {!isLoading && !error && displayPlans.length > 0 && (
          <>
            <ToggleSwitch isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />

            <AnimatePresence mode="wait">
              <motion.div
                key={isYearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
              >
                {displayPlans.map((plan, index) => (
                  <motion.div
                    key={`${plan.name}-${isYearly ? 'yearly' : 'monthly'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`relative rounded-2xl p-5 flex flex-col ${
                      plan.popular
                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-2xl scale-105 z-10 ring-2 ring-blue-400'
                          : plan.name === 'Free Trial'
                        ? 'bg-white border-2 border-dashed border-gray-200 hover:border-gray-300'
                        : 'bg-white border border-gray-200'
                    } transition-all duration-300 hover:shadow-xl`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[11px] font-bold shadow-lg">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    {plan.save && (
                      <div className="absolute -top-3.5 right-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-semibold">
                          {plan.save}
                        </span>
                      </div>
                    )}

                    <div className="mb-5">
                      <h3 className={`text-lg font-bold mb-1 ${
                        plan.popular ? 'text-white' : 'text-gray-900'
                      }`}>
                        {plan.name}
                      </h3>
                      <p className={`text-xs ${
                        plan.popular ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${
                          plan.popular ? 'text-white' : 'text-gray-900'
                        }`}>
                          {plan.price}
                        </span>
                        <span className={`text-xs ${
                          plan.popular ? 'text-blue-100' : 'text-gray-400'
                        }`}>
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className={`w-full mb-5 text-sm ${
                        plan.popular
                          ? 'bg-white text-blue-600 hover:bg-blue-50'
                        : plan.name === 'Free Trial'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      asChild
                    >
                      <a href={plan.name === 'Enterprise' ? 'mailto:sales@carticom.com' : '#get-started'}>
                        {plan.cta}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
                      </a>
                    </Button>

                    <ul className="space-y-2.5 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${
                            plan.popular ? 'text-blue-200' : 'text-blue-500'
                          }`} aria-hidden="true" />
                          <span className={`text-xs ${
                            plan.popular ? 'text-blue-50' : 'text-gray-600'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            All paid plans include a 30-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Need a custom plan?{' '}
            <a href="mailto:sales@carticom.com" className="text-blue-600 hover:underline font-medium">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
