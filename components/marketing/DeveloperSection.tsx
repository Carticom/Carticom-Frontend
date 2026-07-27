'use client';

import { motion } from 'framer-motion';
import { Code, BookOpen, Lock, Cloud, Shield, Key, Webhook, ArrowRight, Server } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const DEV_FEATURES = [
  { icon: Code, title: 'REST APIs', desc: 'Full-featured REST API for every Carticom resource.' },
  { icon: BookOpen, title: 'OpenAPI Documentation', desc: 'Interactive API docs with live code examples.' },
  { icon: Key, title: 'Secure Authentication', desc: 'JWT-based auth with refresh tokens and role-based access.' },
  { icon: Webhook, title: 'Webhook Support', desc: 'Real-time event notifications for your integrations.' },
  { icon: Server, title: 'SDK Ready', desc: 'Client libraries for JavaScript, Python, and more coming soon.' },
];

const SECURITY_FEATURES = [
  { icon: Lock, title: 'JWT Authentication', desc: 'Token-based authentication with automatic refresh.' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Granular permissions for staff, admins, and owners.' },
  { icon: Cloud, title: 'Cloud Infrastructure', desc: 'AWS-hosted with auto-scaling and redundancy.' },
  { icon: Shield, title: 'Data Protection', desc: 'End-to-end encryption for all sensitive data.' },
  { icon: Key, title: 'Encrypted Communication', desc: 'TLS 1.3 for all API and web traffic.' },
  { icon: Server, title: 'Automated Backups', desc: 'Daily backups with point-in-time recovery.' },
];

export function DeveloperSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Developer Experience</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">Built for Developers</h2>
            <p className="text-gray-600 mb-8">Extend and integrate Carticom with your existing systems using our comprehensive API and tools.</p>
            <div className="space-y-4">
              {DEV_FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <f.icon className="h-5 w-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{f.title}</p>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button asChild className="mt-8 rounded-xl bg-gray-900 hover:bg-gray-800 text-white">
              <Link href="/docs">View API Docs <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Enterprise Security</p>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-6">Your Data is Safe</h2>
            <p className="text-gray-600 mb-8">Enterprise-grade security infrastructure protecting your business and customer data.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {SECURITY_FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/20 transition-colors"
                >
                  <f.icon className="h-5 w-5 text-blue-600 mb-3" />
                  <p className="font-medium text-gray-900 text-sm">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
