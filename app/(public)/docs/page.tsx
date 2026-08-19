'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { BookOpen, Code, Terminal, Server, Layers, Lock, Zap, Globe } from 'lucide-react';

const docsCategories = [
  {
    icon: Code,
    title: 'Getting Started',
    description: 'Learn the basics of the Carticom platform and set up your first store.',
    links: ['Quickstart Guide', 'Account Setup', 'Dashboard Overview', 'First Product'],
    color: 'bg-blue-50 text-blue-600'},
  {
    icon: Terminal,
    title: 'API Reference',
    description: 'Comprehensive API documentation for integrating with Carticom.',
    links: ['Authentication', 'Products API', 'Orders API', 'Webhooks'],
    color: 'bg-purple-50 text-purple-600'},
  {
    icon: Server,
    title: 'Store Management',
    description: 'Manage your store, products, inventory, and customer relationships.',
    links: ['Products & Inventory', 'Order Management', 'Customer Management', 'Shipping Setup'],
    color: 'bg-blue-50 text-blue-600'},
  {
    icon: Layers,
    title: 'Payments & Escrow',
    description: 'Understand our payment processing and escrow system.',
    links: ['Payment Methods', 'Escrow Process', 'Payouts & Withdrawals', 'Dispute Resolution'],
    color: 'bg-orange-50 text-orange-600'},
  {
    icon: Lock,
    title: 'Security & Compliance',
    description: 'Security best practices and compliance requirements.',
    links: ['Data Protection', 'GDPR Compliance', 'PCI Compliance', 'Security Best Practices'],
    color: 'bg-red-50 text-red-600'},
  {
    icon: Zap,
    title: 'Custom Solutions',
    description: 'Build custom solutions and extensions for your business needs.',
    links: ['Custom Checkout', 'Workflow Automation', 'Custom Reporting', 'Plugin Development'],
    color: 'bg-yellow-50 text-yellow-600'},
  {
    icon: Globe,
    title: 'Multi-Marketplace',
    description: 'Sell across multiple marketplaces from a single dashboard.',
    links: ['Marketplace Setup', 'Cross-Listing', 'Inventory Sync', 'Channel Management'],
    color: 'bg-blue-50 text-blue-600'},
  {
    icon: BookOpen,
    title: 'SDKs & Libraries',
    description: 'Official SDKs and client libraries for popular languages.',
    links: ['JavaScript SDK', 'Python SDK', 'PHP SDK', 'Mobile SDKs'],
    color: 'bg-indigo-50 text-indigo-600'},
];

export default function DocsPage() {
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
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build, integrate, and scale with the Carticom platform.
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {docsCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${category.color}`}>
                <category.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.description}</p>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-gray-400 cursor-default">
                      {link} — coming soon
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
