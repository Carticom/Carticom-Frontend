'use client';


import { motion } from 'framer-motion';
import { Code, ShoppingCart, Smartphone, Network, Workflow, Building2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const services = [
  { icon: ShoppingCart, label: 'Custom Storefront' },
  { icon: Smartphone, label: 'Mobile App' },
  { icon: Network, label: 'Marketplace' },
  { icon: Workflow, label: 'ERP Integration' },
  { icon: Building2, label: 'POS System' },
  { icon: Code, label: 'API Integration' },
];

export function CustomSolutions() {
  return (
    <section id="custom-solutions" className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6"
            >
              <Code className="h-4 w-4" aria-hidden="true" />
              Custom Solutions
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Need something built just for you?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Off-the-shelf software doesn&apos;t always fit. Tell us what you need — a customer app, vendor portal,
              custom POS, or full ERP — and we&apos;ll build it on the Carticom platform.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              {[
                'Dedicated project manager assigned to your request',
                'Transparent quotation with no hidden fees',
                'Built on Carticom\'s existing infrastructure (payments, auth, delivery)',
                'Full source code ownership upon completion',
                'Ongoing support and maintenance available',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/dashboard/custom-solutions/new">
                  Submit Your Request
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.label}
                    className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all"
                  >
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                      <service.icon className="h-5 w-5 text-purple-600" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{service.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                + anything else you can imagine
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
