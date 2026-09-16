'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { LifeBuoy, Mail } from 'lucide-react';

export default function HelpPage() {
  return (
    <main className="flex-1 py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
            <LifeBuoy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Need help? Reach out to our support team and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-purple-50 text-purple-600">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">Get a response within 24 hours</p>
            <a
              href="mailto:support@carticom.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@carticom.com
            </a>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
