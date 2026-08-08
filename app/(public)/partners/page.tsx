'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Handshake, Building2, Store, GitBranch, GraduationCap, ArrowRight, Star, Users } from 'lucide-react';

const partnerTypes = [
  {
    icon: Building2,
    title: 'Enterprise Partners',
    description: 'Large organizations that integrate Carticom into their operations or distribute our solutions to their clients.',
    benefits: ['Co-marketing opportunities', 'Priority support', 'Revenue sharing', 'Joint product development']},
  {
    icon: Store,
    title: 'Agency Partners',
    description: 'Digital agencies that build and manage Carticom stores for their clients.',
    benefits: ['White-label options', 'Commission structure', 'Training resources', 'Dedicated account manager']},
  {
    icon: GitBranch,
    title: 'Technology Partners',
    description: 'SaaS companies and platforms that integrate with Carticom via our API.',
    benefits: ['API access', 'Integration support', 'Joint go-to-market', 'Technical documentation']},
  {
    icon: GraduationCap,
    title: 'Education Partners',
    description: 'Educational institutions and training organizations teaching digital commerce skills.',
    benefits: ['Student accounts', 'Curriculum resources', 'Certification programs', 'Guest lectures']},
];

const stats = [
  { value: '200+', label: 'Active Partners', icon: Handshake },
  { value: '50+', label: 'Countries', icon: Globe },
  { value: '98%', label: 'Partner Satisfaction', icon: Star },
  { value: '15,000+', label: 'Merchants Served', icon: Users },
];

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function PartnersPage() {
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
            <Handshake className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner with Carticom</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our partner ecosystem and help shape the future of commerce in Africa.
            Together, we can empower businesses across the continent.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <partner.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.title}</h3>
              <p className="text-gray-600 mb-4">{partner.description}</p>
              <ul className="space-y-2">
                {partner.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-center text-white"
        >
          <Handshake className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Ready to Partner?</h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Let us discuss how we can work together to drive commerce growth across Africa.
          </p>
          <a
            href="mailto:partners@carticom.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Become a Partner
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
