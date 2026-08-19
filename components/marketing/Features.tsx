'use client';


import { motion } from 'framer-motion';
import { Store, CreditCard, Bot, BarChart3, Package, Truck, Headphones } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Store,
    title: 'Store Management',
    description: 'Build and customize your online store with drag-and-drop tools. Manage products, inventory, and orders from a single dashboard.',
    color: 'blue'},
  {
    icon: CreditCard,
    title: 'Payments',
    description: 'Accept payments via Paystack, Flutterwave, and bank transfers. Support for cards, mobile money, and USSD across Africa.',
    color: 'green'},
  {
    icon: Bot,
    title: 'AI Automation',
    description: 'Automate customer support, order tracking, and marketing via WhatsApp. Let AI handle routine tasks while you focus on growth.',
    color: 'indigo'},
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights into sales, customer behavior, and revenue. Make data-driven decisions with beautiful visualizations.',
    color: 'orange'},
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock levels, set low-stock alerts, and manage warehouses. Never oversell or run out of popular items again.',
    color: 'pink'},
  {
    icon: Truck,
    title: 'Logistics Integration',
    description: 'Connect with top delivery services across Africa. Automated shipping labels, tracking, and delivery confirmations.',
    color: 'blue'},
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help whenever you need it. Our dedicated support team is available around the clock via chat, email, and phone.',
    color: 'red'},
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200' },
  green: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'group-hover:border-purple-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'group-hover:border-indigo-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'group-hover:border-orange-200' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'group-hover:border-pink-200' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'group-hover:border-red-200' }};

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Powerful Features
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Everything you need to run your business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            From payments to logistics, Carticom provides all the tools you need to build, manage, and scale your business across Africa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`group p-6 rounded-2xl bg-white border border-gray-100 ${colors.border} transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text} mb-4`}>
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="gap-2" asChild>
            <a href="#pricing">
              Explore All Features
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}