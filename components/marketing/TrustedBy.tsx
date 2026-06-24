'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';

const partners = [
  { name: 'Flutterwave', category: 'Payments Infrastructure' },
  { name: 'Paystack', category: 'Payment Gateway' },
  { name: 'Jumia', category: 'E-commerce Platform' },
  { name: 'Konga', category: 'Online Marketplace' },
  { name: 'Y Combinator', category: 'Startup Accelerator' },
  { name: 'Google for Startups', category: 'Accelerator Program' },
  { name: 'Visa', category: 'Payment Network' },
  { name: 'Mastercard', category: 'Payment Network' },
  { name: 'DHL', category: 'Logistics Partner' },
  { name: 'GIG Logistics', category: 'Last-mile Delivery' },
  { name: 'Kuda Bank', category: 'Digital Banking' },
  { name: 'Moniepoint', category: 'Business Banking' },
];

const categories = [
  'Payment Partners',
  'E-commerce Platforms',
  'Accelerators & Investors',
  'Logistics Networks',
  'Banking Partners',
];

export function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="py-16 md:py-24 bg-gray-50 border-y border-gray-100"
      aria-labelledby="trusted-by-heading"
    >
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2
            id="trusted-by-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partnering with Africa's most innovative companies to power the
            future of commerce across the continent.
          </p>
        </motion.div>

        {/* Partner Logos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center"
          role="list"
          aria-label="Trusted partners and companies"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
              role="listitem"
            >
              <div
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 min-h-[120px] justify-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {partner.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 text-sm">{partner.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{partner.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {categories.map((category, index) => (
            <motion.span
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-sm font-medium text-gray-600 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              {category}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}