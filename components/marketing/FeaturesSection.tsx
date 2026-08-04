'use client';

import { motion } from 'framer-motion';
import { Store, ShoppingBag, Package, BarChart3, Users, Crown, CreditCard, LayoutDashboard, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon: Store, title: 'Store Management', desc: 'Create and customize your online store with a powerful drag-and-drop editor. No coding required.',
    highlights: ['Custom domain', 'Mobile-optimized', 'SEO tools', 'Multi-language'],
    color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200/50'},
  {
    icon: Package, title: 'Product Management', desc: 'Manage thousands of products with variants, categories, digital downloads, and bulk import.',
    highlights: ['Unlimited products', 'Variants & options', 'Bulk import/export', 'Digital goods'],
    color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200/50'},
  {
    icon: ShoppingBag, title: 'Order Management', desc: 'Track orders from checkout to delivery. Handle returns, disputes, and fulfillment seamlessly.',
    highlights: ['Real-time tracking', 'Automated notifications', 'Bulk processing', 'Returns portal'],
    color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200/50'},
  {
    icon: Target, title: 'Inventory', desc: 'Keep perfect stock across all channels. Get low-stock alerts and automated reorder suggestions.',
    highlights: ['Multi-warehouse', 'Low-stock alerts', 'Batch tracking', 'Supplier management'],
    color: 'from-violet-500 to-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200/50'},
  {
    icon: BarChart3, title: 'Analytics', desc: 'Understand your business with real-time dashboards, sales reports, and customer insights.',
    highlights: ['Real-time dashboard', 'Sales reports', 'Customer analytics', 'Export data'],
    color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-200/50'},
  {
    icon: Users, title: 'Staff Management', desc: 'Add team members with role-based permissions. Control who can access what in your dashboard.',
    highlights: ['Role-based access', 'Activity logs', 'Team permissions', 'Audit trail'],
    color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200/50'},
  {
    icon: Crown, title: 'Subscriptions', desc: 'Create and manage subscription plans. Recurring billing with automated invoice generation.',
    highlights: ['Recurring billing', 'Plan management', 'Invoice automation', 'Trial periods'],
    color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200/50'},
  {
    icon: CreditCard, title: 'Payment Processing', desc: 'Accept payments via card, bank transfer, USSD, mobile money. Smart escrow for trust.',
    highlights: ['Multi-provider', 'Escrow protection', 'Instant settlement', 'Dispute resolution'],
    color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200/50'},
  {
    icon: LayoutDashboard, title: 'Business Dashboard', desc: 'Your command center. See revenue, orders, customers, and growth metrics at a glance.',
    highlights: ['KPI overview', 'Quick actions', 'Recent orders', 'Growth trends'],
    color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200/50'},
];

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const isReversed = index % 2 === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-16"
    >
      <div className={cn(isReversed && 'lg:order-2')}>
        <div className="space-y-6">
          <div className={cn('inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br', feature.color, 'shadow-lg')}>
            <feature.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{feature.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed">{feature.desc}</p>
          <div className="grid grid-cols-2 gap-3">
            {feature.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {h}
              </div>
            ))}
          </div>
          <Link href="/features" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className={cn(isReversed && 'lg:order-1')}>
        <div className={cn('aspect-[4/3] rounded-3xl border-2', feature.borderColor, feature.bgColor, 'flex items-center justify-center shadow-sm')}>
          <div className="text-center p-8">
            <feature.icon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400">{feature.title} screenshot placeholder</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Powerful Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">From store setup to AI-powered growth — one platform, infinite possibilities.</p>
        </motion.div>
        <div className="divide-y divide-gray-100">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
