'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

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

const monthlyPlans: Plan[] = [
  {
    name: 'Free',
    price: '₦0',
    period: '/month',
    description: 'Start selling in minutes. No risk.',
    features: [
      'Up to 10 products',
      'Basic storefront',
      'Paystack integration',
      'Community support',
      '1 user account',
      'Basic analytics',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '₦5,000',
    period: '/month',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 100 products',
      'Custom domain',
      'Paystack + Flutterwave',
      'Email support',
      '3 user accounts',
      'Advanced analytics',
      'Escrow protection',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₦15,000',
    period: '/month',
    description: 'For growing businesses that need more power',
    features: [
      'Up to 1,000 products',
      'Custom domain + SSL',
      'All payment gateways',
      'Priority support',
      '10 user accounts',
      'AI automation (basic)',
      'Advanced escrow',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    price: '₦25,000',
    period: '/month',
    description: 'For established businesses ready to scale',
    features: [
      'Unlimited products',
      'Custom analytics',
      'All payment gateways',
      '24/7 phone support',
      'Unlimited users',
      'Full AI automation',
      'Advanced escrow',
      'API access',
      'Dedicated manager',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: '₦50,000',
    period: '/month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited everything',
      'White-label options',
      'Custom integrations',
      'SLA guarantee',
      'Unlimited users',
      'Custom AI training',
      'On-premise deployment',
      'Dedicated support team',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const yearlyPlans: Plan[] = [
  {
    name: 'Free',
    price: '₦0',
    period: '/year',
    description: 'Start selling in minutes. No risk.',
    features: [
      'Up to 10 products',
      'Basic storefront',
      'Paystack integration',
      'Community support',
      '1 user account',
      'Basic analytics',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '₦50,000',
    period: '/year',
    description: 'Perfect for small businesses just getting started',
    features: [
      'Up to 100 products',
      'Custom domain',
      'Paystack + Flutterwave',
      'Email support',
      '3 user accounts',
      'Advanced analytics',
      'Escrow protection',
    ],
    cta: 'Start Free Trial',
    popular: false,
    save: 'Save 17%',
  },
  {
    name: 'Growth',
    price: '₦150,000',
    period: '/year',
    description: 'For growing businesses that need more power',
    features: [
      'Up to 1,000 products',
      'Custom domain + SSL',
      'All payment gateways',
      'Priority support',
      '10 user accounts',
      'AI automation (basic)',
      'Advanced escrow',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
    save: 'Save 17%',
  },
  {
    name: 'Business',
    price: '₦250,000',
    period: '/year',
    description: 'For established businesses ready to scale',
    features: [
      'Unlimited products',
      'Custom analytics',
      'All payment gateways',
      '24/7 phone support',
      'Unlimited users',
      'Full AI automation',
      'Advanced escrow',
      'API access',
      'Dedicated manager',
    ],
    cta: 'Start Free Trial',
    popular: false,
    save: 'Save 17%',
  },
  {
    name: 'Enterprise',
    price: '₦500,000',
    period: '/year',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited everything',
      'White-label options',
      'Custom integrations',
      'SLA guarantee',
      'Unlimited users',
      'Custom AI training',
      'On-premise deployment',
      'Dedicated support team',
      'Custom contracts',
    ],
    cta: 'Contact Sales',
    popular: false,
    save: 'Save 17%',
  },
];

function ToggleSwitch({
  isYearly,
  onToggle,
}: {
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
        <span className="ml-1.5 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
          Save 17%
        </span>
      </span>
    </div>
  );
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? yearlyPlans : monthlyPlans;

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
            {plans.map((plan, index) => (
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
                    : plan.name === 'Free'
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
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold">
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
                      : plan.name === 'Free'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                  asChild
                >
                  <a href={plan.name === 'Enterprise' ? 'mailto:sales@carticom.ng' : '#get-started'}>
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
                  </a>
                </Button>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${
                        plan.popular ? 'text-blue-200' : 'text-green-500'
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            All paid plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Need a custom plan?{' '}
            <a href="mailto:sales@carticom.ng" className="text-blue-600 hover:underline font-medium">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}