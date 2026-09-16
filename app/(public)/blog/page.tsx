'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carticom Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and updates from the team building the commerce operating system for Africa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-12 text-center"
        >
          <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Coming Soon</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We are working on great content for our blog. Stay tuned for insights on e-commerce, technology, and building businesses in Africa.
          </p>
        </motion.div>
      </Container>
    </main>
  );
}
