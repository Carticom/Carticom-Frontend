'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { FileText, Shield, CreditCard, Ban, AlertTriangle, Scale, UserX, Activity } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: 'By accessing or using the Carticom platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms, you may not access or use our services. These terms apply to all visitors, users, and others who access or use our platform, including merchants, buyers, and partners.'},
  {
    icon: Shield,
    title: 'Account Registration',
    content: 'You must provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to refuse service, terminate accounts, or remove content at our discretion.'},
  {
    icon: CreditCard,
    title: 'Payments & Fees',
    content: 'Carticom does not charge commission on sales. Merchants pay only the fees charged by their chosen payment processor (such as Paystack or Flutterwave) plus the subscription fee for their Carticom plan, which is clearly displayed before you subscribe. All fees are non-refundable except as explicitly stated in our refund policy. Currency conversion fees may apply for cross-border transactions processed by the payment provider.'},
  {
    icon: AlertTriangle,
    title: 'Prohibited Activities',
    content: 'You may not use the platform for any unlawful purpose or in violation of any applicable laws or regulations. Prohibited activities include but are not limited to: fraud, money laundering, selling prohibited goods or services, infringing intellectual property rights, distributing malware, engaging in phishing or social engineering, and any activity that could damage, disable, or impair our infrastructure.'},
  {
    icon: Scale,
    title: 'Dispute Resolution',
    content: 'If a dispute arises between you and another user or between you and Carticom, both parties agree to first attempt to resolve it through our support process. If the dispute cannot be resolved informally, it shall be settled by binding arbitration in accordance with Nigerian law, conducted in English in Lagos, Nigeria. Nothing in this section limits either party\'s right to seek injunctive or equitable relief.'},
  {
    icon: Ban,
    title: 'Termination',
    content: 'We may terminate or suspend your account at any time for violating these terms or for any other reason at our sole discretion. Upon termination, your right to use the platform will immediately cease. You may terminate your account at any time by contacting our support team. Provisions that by their nature should survive termination shall survive, including but not limited to payment obligations and dispute resolution provisions.'},
  {
    icon: UserX,
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by law, Carticom shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the platform. Our total liability for any claims under these terms shall not exceed the total fees paid by you to Carticom in the twelve months preceding the claim.'},
  {
    icon: Activity,
    title: 'Modifications to Terms',
    content: 'We reserve the right to modify these terms at any time. We will notify users of material changes via email or through the platform. Your continued use of the platform after such modifications constitutes your acceptance of the updated terms. It is your responsibility to review these terms periodically.'},
];

export default function TermsPage() {
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
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These terms govern your use of the Carticom platform. Please read them carefully before using our services.
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Questions About These Terms?</h2>
          <p className="text-gray-600 mb-4">Contact our legal team for clarification on any of our terms.</p>
          <a
            href="mailto:legal@carticom.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <FileText className="w-4 h-4" />
            legal@carticom.com
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
