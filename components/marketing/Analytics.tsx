'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const metrics = [
  { icon: DollarSign, label: 'Revenue', value: '₦12.5M', change: '+23%', color: 'green' },
  { icon: Users, label: 'Customers', value: '8,432', change: '+18%', color: 'blue' },
  { icon: TrendingUp, label: 'Conversion', value: '4.28%', change: '+12%', color: 'purple' },
  { icon: BarChart3, label: 'Orders', value: '2,847', change: '+31%', color: 'orange' },
];

export function Analytics() {
  return (
    <section id="analytics" className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-6"
            >
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
              Analytics Dashboard
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Make data-driven decisions with real-time insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              Track every metric that matters. From sales performance to customer behavior, get actionable insights that help you grow faster.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              {[
                'Real-time sales and revenue tracking',
                'Customer behavior and purchase patterns',
                'Product performance and inventory insights',
                'Marketing campaign ROI analysis',
                'Custom reports and automated exports',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" aria-hidden="true" />
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
              <Button size="lg" className="gap-2" asChild>
                <a href="#pricing">
                  View Analytics Plans
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Performance Overview</h3>
                  <span className="text-xs text-gray-500">Last 30 days</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <metric.icon className={`h-5 w-5 text-${metric.color}-600`} aria-hidden="true" />
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{metric.change}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-end justify-between h-32 gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-md transition-all hover:from-orange-600 hover:to-orange-500"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}