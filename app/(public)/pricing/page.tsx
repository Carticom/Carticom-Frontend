'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/features/auth/store/auth.store';

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
  href: string;
  popular: boolean;
}

const PLAN_ORDER: Record<string, number> = {
  'Free Trial': 0, 'Starter': 1, 'Growth': 2, 'Business': 3, 'Enterprise': 4};

function formatPrice(amount: number): string {
  if (amount === 0) return 'Free';
  return `₦${amount.toLocaleString()}`;
}

function generateFeatures(dto: SubscriptionPlanDTO): string[] {
  const features: string[] = [];
  features.push(`${dto.productLimit >= 99999 ? 'Unlimited' : dto.productLimit.toLocaleString()} products`);
  features.push(`${dto.staffLimit >= 99999 ? 'Unlimited' : dto.staffLimit} staff accounts`);
  if (dto.paymentsEnabled) features.push('Payment processing');
  if (dto.customDomainEnabled) features.push('Custom domain');
  features.push('Order management', 'Inventory tracking');
  if (dto.name === 'Growth' || dto.name === 'Business' || dto.name === 'Enterprise') {
    features.push('Advanced analytics', 'AI insights', 'Secure payments', 'Priority support');
  }
  if (dto.name === 'Business' || dto.name === 'Enterprise') {
    features.push('Dedicated account manager', 'Custom integrations', 'SLA guarantee');
  }
  if (dto.name === 'Enterprise') {
    features.push('White-label option', 'Custom development', '24/7 dedicated support');
  }
  if (dto.yearlyPrice > 0 && dto.monthlyPrice > 0) {
    const savePct = Math.round((1 - dto.yearlyPrice / (dto.monthlyPrice * 12)) * 100);
    if (savePct > 0) features.push(`Save ${savePct}% with yearly billing`);
  }
  return features;
}

const fallbackPlans: Plan[] = [
  {
    name: 'Free Trial',
    price: 'Free',
    period: ' trial',
    desc: 'Try Carticom free for 30 days. No payment required. Upgrade anytime to keep selling.',
    features: ['25 products', '1 staff account', 'Payment processing', 'Order management', 'Inventory tracking'],
    cta: 'Get Started Free',
    href: '/register',
    popular: false},
  {
    name: 'Starter',
    price: '₦5,000',
    period: '/month',
    desc: 'For individual sellers. AI features included, full analytics.',
    features: ['100 products', '2 staff accounts', 'Payment processing', 'Order management', 'Inventory tracking'],
    cta: 'Start Free Trial',
    href: '/register',
    popular: false},
  {
    name: 'Growth',
    price: '₦15,000',
    period: '/month',
    desc: 'For growing businesses. More products, staff, and priority support.',
    features: ['500 products', '10 staff accounts', 'Payment processing', 'Custom domain', 'Order management', 'Inventory tracking', 'Advanced analytics', 'AI insights', 'Secure payments', 'Priority support'],
    cta: 'Start Free Trial',
    href: '/register',
    popular: true},
  {
    name: 'Business',
    price: '₦25,000',
    period: '/month',
    desc: 'For established businesses. Custom domain, API access, dedicated support.',
    features: ['3,000 products', '25 staff accounts', 'Payment processing', 'Custom domain', 'Order management', 'Inventory tracking', 'Advanced analytics', 'AI insights', 'Secure payments', 'Priority support', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'],
    cta: 'Start Free Trial',
    href: '/register',
    popular: false},
  {
    name: 'Enterprise',
    price: '₦45,000',
    period: '/month',
    desc: 'For large operations. Unlimited everything, dedicated manager, SLA, 24/7 support.',
    features: ['Unlimited products', 'Unlimited staff', 'Custom domain', 'Order management', 'Inventory tracking', 'Advanced analytics', 'AI insights', 'Secure payments', 'Priority support', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'White-label option', 'Custom development', '24/7 dedicated support'],
    cta: 'Start Free Trial',
    href: '/register',
    popular: false},
];

const faqs = [
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. You can change your plan at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Yes, every paid plan comes with a 30-day free trial. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept card payments, bank transfers, USSD, and mobile money across supported African countries.' },
  { q: 'How does yearly billing work?', a: 'Pay for a full year upfront and save up to 20% compared to monthly billing. Your subscription renews annually.' },
  { q: 'Are there any setup fees?', a: 'No. There are no setup fees or hidden charges. You only pay your subscription fee.' },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [, setLoading] = useState(true);
  const [yearly, setYearly] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const planHref = isAuthenticated ? '/dashboard/subscription' : '/register';

  useEffect(() => {
    axiosInstance.get('/api/v1/subscriptions/plans')
      .then((res) => {
        const data: SubscriptionPlanDTO[] = res.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a, b) => (PLAN_ORDER[a.name] ?? 99) - (PLAN_ORDER[b.name] ?? 99));
          setPlans(sorted.map((p) => ({
            name: p.name,
            price: p.monthlyPrice === 0 ? 'Free' : formatPrice(yearly ? p.yearlyPrice : p.monthlyPrice),
            period: yearly ? '/year' : p.monthlyPrice === 0 ? ' trial' : '/month',
            desc: p.description || '',
            features: generateFeatures(p),
            cta: p.monthlyPrice === 0 ? 'Get Started Free' : isAuthenticated ? 'Choose Plan' : 'Start Free Trial',
            href: planHref,
            popular: p.name === 'Growth'})));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [yearly, isAuthenticated, planHref]);

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">Simple, transparent pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Start free, upgrade as you grow. No hidden fees, no surprise charges.</p>
          <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-xl bg-gray-100">
            <button onClick={() => setYearly(false)} className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${!yearly ? 'bg-white text-gray-900 shadow-sm' : ''}`}>Monthly</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${yearly ? 'bg-white text-gray-900 shadow-sm' : ''}`}>
              Yearly
              <span className="ml-1.5 text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded-full">Save up to 20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-blue-200 bg-blue-50/30 shadow-xl shadow-blue-200/20' : 'border-gray-200 bg-white'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{plan.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full rounded-xl h-12 text-sm ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                <Link href={plan.href}>
                  {plan.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50 transition-colors">
                <summary className="flex items-center justify-between text-sm font-semibold text-gray-900 cursor-pointer list-none">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
