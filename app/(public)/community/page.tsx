'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Users, MessageCircle, Code2, X, Globe } from 'lucide-react';

const communityLinks = [
  { icon: MessageCircle, title: 'Discord Server', description: 'Join our real-time chat community for discussions and support.', href: 'https://discord.gg/carticom', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Code2, title: 'GitHub', description: 'Contribute to open-source projects and explore our codebase.', href: 'https://github.com/carticom', color: 'bg-gray-50 text-gray-900' },
  { icon: X, title: 'Twitter (X)', description: 'Follow us for the latest updates, tips, and community highlights.', href: 'https://x.com/carticom', color: 'bg-sky-50 text-sky-600' },
  { icon: Globe, title: 'Community Forum', description: 'Ask questions, share knowledge, and connect with other merchants.', href: 'https://community.carticom.com', color: 'bg-blue-50 text-blue-600' },
];

export default function CommunityPage() {
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
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join merchants, developers, and partners building the future of commerce in Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {communityLinks.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group block"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${link.color}`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{link.title}</h3>
              <p className="text-sm text-gray-500">{link.description}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-center text-white"
        >
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Be part of the growing merchant community in Africa. Share insights, get support, and grow together.
          </p>
          <a
            href="https://discord.gg/carticom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Join Discord
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
