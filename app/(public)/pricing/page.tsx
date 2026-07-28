'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';

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

const fallbackPlans: Plan[] = [
  {
    name: 'Starter',
    price: '₦0',
    period: 'forever',
    desc: 'Perfect for trying out Carticom',
    features: ['1 staff account', 'Up to 10 products', 'Basic storefront', 'Manual payments', 'Community support'],
    cta: 'Get Started Free',
    href: '/register',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₦15,000',
    period: '/month',
    desc: 'For growing businesses',
    features: ['5 staff accounts', 'Unlimited products', 'Custom domain', 'Escrow payments', 'AI assistant', 'Priority support', 'Analytics dashboard'],
    cta: 'Start 14-Day Trial',
    href: '/register',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large-scale operations',
    features: ['Unlimited staff', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'API access', 'Bulk operations', 'White-label option', 'On-premise available'],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

const faqs = [
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. You can change your plan at any time. Changes take effect at the start of your next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Yes, every paid plan comes with a 14-day free trial. No credit card required.' },
  { q: 'What payment methods do you accept?', a: 'We accept card payments, bank transfers, USSD, and mobile money across supported African countries.' },
  { q: 'Are there any setup fees?', a: 'No. There are no setup fees or hidden charges. You only pay your subscription fee.' },
];

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/api/v1/super-admin/plans')
      .then((res) => {
        const data = res.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setPlans(data.map((p: { name: string; price: number; description?: string; features?: Record<string, unknown> }) => ({
            name: p.name,
            price: p.price === 0 ? '₦0' : `₦${p.price.toLocaleString()}`,
            period: p.price === 0 ? 'forever' : '/month',
            desc: p.description || '',
            features: p.features ? Object.keys(p.features) : [],
            cta: p.price === 0 ? 'Get Started Free' : 'Start 14-Day Trial',
            href: '/register',
            popular: p.name.toLowerCase().includes('growth') || p.name.toLowerCase().includes('pro'),
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
