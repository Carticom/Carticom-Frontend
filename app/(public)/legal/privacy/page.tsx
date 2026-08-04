'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Shield, Lock, Eye, Database, Mail, UserCheck, Globe, FileText } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, including your name, email address, phone number, business name, and payment information when you create an account or use our services. We also automatically collect certain information about your device, browsing actions, and usage patterns when you interact with our platform. This includes IP addresses, browser type, operating system, referring URLs, and pages viewed.'},
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and inquiries, and communicate with you about products, services, and events. We may also use the information to monitor and analyze trends, usage, and activities in connection with our services.'},
  {
    icon: Eye,
    title: 'Information Sharing',
    content: 'We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. These providers are contractually obligated to protect your information and may only use it for the purposes we specify.'},
  {
    icon: Lock,
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include encryption at rest and in transit, regular security audits, access controls, and secure data centers located in reliable jurisdictions. However, no method of transmission over the Internet is 100% secure.'},
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: 'Depending on your location, you may have the right to access, correct, update, or request deletion of your personal information. You may also have the right to object to or restrict certain processing of your data, and the right to data portability. To exercise these rights, please contact us at privacy@carticom.app. We will respond to your request within 30 days.'},
  {
    icon: Mail,
    title: 'Communications',
    content: 'We may send you promotional communications about our services. You can opt out of these at any time by following the unsubscribe instructions in the communication or by adjusting your account settings. We will continue to send you non-promotional service-related messages regarding your account and transactions.'},
  {
    icon: Globe,
    title: 'International Data Transfers',
    content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place through standard contractual clauses and data processing agreements to protect your information in accordance with applicable data protection laws.'},
  {
    icon: FileText,
    title: 'Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically for any updates.'},
];

export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carticom respects your privacy and is committed to protecting your personal data.
            This policy explains how we collect, use, and safeguard your information.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last Updated: July 22, 2026</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gray-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about this Privacy Policy, please contact our Data Protection Officer.
          </p>
          <a
            href="mailto:privacy@carticom.app"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Mail className="w-4 h-4" />
            privacy@carticom.app
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
