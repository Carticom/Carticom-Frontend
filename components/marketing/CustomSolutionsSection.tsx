'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Users, Smartphone, Server, ClipboardList, Package, Code, LayoutDashboard, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SOLUTIONS_CUSTOM = [
  { icon: ShoppingBag, title: 'Marketplace', desc: 'Multi-vendor marketplace with vendor dashboards, commission management, and dispute resolution.' },
  { icon: Users, title: 'Vendor Apps', desc: 'White-label vendor applications with order management, analytics, and payout systems.' },
  { icon: Smartphone, title: 'Customer Apps', desc: 'Native mobile apps for iOS and Android with push notifications and in-app payments.' },
  { icon: Server, title: 'ERP Integration', desc: 'Connect Carticom with your existing ERP system for seamless data synchronization.' },
  { icon: ClipboardList, title: 'POS Systems', desc: 'Point-of-sale integration connecting physical stores with your online operations.' },
  { icon: Package, title: 'Inventory', desc: 'Custom inventory management with barcode scanning, batch tracking, and warehouse management.' },
  { icon: Code, title: 'API Integrations', desc: 'REST APIs and webhooks to connect Carticom with any third-party service.' },
  { icon: LayoutDashboard, title: 'Mobile Apps', desc: 'Custom branded mobile applications for your business on iOS and Android.' },
  { icon: Building2, title: 'Enterprise', desc: 'End-to-end commerce infrastructure for large organizations with custom requirements.' },
];

const COLORS = [
  'from-blue-500/20', 'from-blue-500/20', 'from-amber-500/20',
  'from-violet-500/20', 'from-rose-500/20', 'from-blue-500/20',
  'from-orange-500/20', 'from-purple-500/20', 'from-blue-500/20',
];

export function CustomSolutionsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Custom Solutions</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Beyond the Standard</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Need something unique? We build custom commerce systems tailored to your specific requirements.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS_CUSTOM.map((sol, i) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-200/50 hover:shadow-lg hover:shadow-blue-100/10 transition-all group"
            >
              <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br', COLORS[i], 'border border-gray-100 mb-4')}>
                <sol.icon className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{sol.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{sol.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button asChild className="rounded-xl bg-gray-900 hover:bg-gray-800 text-white px-8 h-12">
            <Link href="/contact">
              Request Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
