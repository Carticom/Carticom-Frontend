'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Newspaper, Mail } from 'lucide-react';

export default function PressPage() {
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
            <Newspaper className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Press Kit</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resources for journalists, analysts, and media professionals covering Carticom and the African commerce ecosystem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8 text-center"
        >
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Media Inquiries</h2>
          <p className="text-gray-600 mb-4 max-w-lg mx-auto">
            For press and media inquiries, please reach out to our communications team.
          </p>
          <a
            href="mailto:press@carticom.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            press@carticom.com
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
