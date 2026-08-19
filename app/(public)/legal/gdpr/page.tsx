'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { ShieldCheck, Download, Trash2, Edit3, Bell, Users, FileCheck, Globe } from 'lucide-react';

const sections = [
  {
    icon: ShieldCheck,
    title: 'Our Commitment to GDPR',
    content: 'Carticom is fully committed to compliance with the General Data Protection Regulation (GDPR). As a platform serving users across Africa and Europe, we have implemented comprehensive data protection measures to safeguard the personal data of all our users, including those in the European Economic Area (EEA).'},
  {
    icon: FileCheck,
    title: 'Data Processing & Lawful Basis',
    content: 'We process personal data only when we have a lawful basis to do so. This includes: your consent (which you can withdraw at any time), the performance of a contract with you, compliance with legal obligations, and our legitimate interests. We maintain detailed records of our processing activities as required by Article 30 of the GDPR.'},
  {
    icon: Download,
    title: 'Right to Access & Data Portability',
    content: 'As a data subject, you have the right to obtain confirmation as to whether your personal data is being processed, and if so, access to that data. You also have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another controller without hindrance.'},
  {
    icon: Edit3,
    title: 'Right to Rectification',
    content: 'You have the right to request the correction of inaccurate personal data concerning you. Depending on the purposes of processing, you may also have the right to have incomplete personal data completed, including by providing a supplementary statement. You can update most of your information directly through your account settings.'},
  {
    icon: Trash2,
    title: 'Right to Erasure (Right to be Forgotten)',
    content: 'You have the right to request the deletion of your personal data when: the data is no longer necessary for the purposes it was collected, you withdraw your consent, you object to processing, the data was unlawfully processed, or the data must be erased to comply with a legal obligation. We will process such requests within 30 days.'},
  {
    icon: Bell,
    title: 'Data Breach Notifications',
    content: 'In the event of a data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach. If the breach is likely to result in a high risk to your rights, we will also notify you directly without undue delay.'},
  {
    icon: Users,
    title: 'Data Protection Officer (DPO)',
    content: 'We have appointed a Data Protection Officer who is responsible for overseeing our GDPR compliance. Our DPO ensures that we handle personal data in accordance with GDPR requirements, conducts privacy impact assessments, and serves as the point of contact for data subjects and supervisory authorities.'},
  {
    icon: Globe,
    title: 'International Data Transfers',
    content: 'When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place. This includes using Standard Contractual Clauses (SCCs) approved by the European Commission, implementing Binding Corporate Rules (BCRs), or relying on adequacy decisions for certain countries.'},
];

export default function GdprPage() {
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
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carticom is committed to protecting the privacy and data rights of all users in accordance with the General Data Protection Regulation.
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Our DPO</h2>
          <p className="text-gray-600 mb-4">
            To exercise your GDPR rights or for any data protection inquiries, contact our Data Protection Officer.
          </p>
          <a
            href="mailto:dpo@carticom.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ShieldCheck className="w-4 h-4" />
            dpo@carticom.com
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
