'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '@/components/common/Container';

const faqs = [
  {
    question: 'What is Carticom?',
    answer: 'Carticom is a Commerce Operating System built specifically for African businesses. It combines store management, payments (Paystack, Flutterwave), AI automation via WhatsApp, and advanced analytics into one unified platform.'},
  {
    question: 'Which payment gateways are supported?',
    answer: 'Carticom supports Paystack, Flutterwave, bank transfers, and mobile money. We also support card payments, USSD, and QR codes. Our platform is built to handle the unique payment preferences across all 54 African countries.'},
  {
    question: 'Can I use Carticom for WhatsApp commerce?',
    answer: 'Yes! Our AI automation features allow you to sell, support customers, and track orders directly through WhatsApp Business. You can automate responses, send order updates, and even process payments via WhatsApp.'},
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all plans come with a 14-day free trial. No credit card is required to start. You can explore all features and decide which plan works best for your business before committing.'},
  {
    question: 'How do I migrate from my current platform?',
    answer: 'We offer free migration assistance for all new customers. Our team will help you transfer your products, customers, and order history from platforms like Shopify, WooCommerce, or custom solutions. Most migrations are completed within 3-5 business days.'},
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include email support. Growth plans and above get priority support with faster response times. Business and Enterprise plans include 24/7 phone support and a dedicated account manager. We also have extensive documentation and video tutorials.'},
  {
    question: 'Can I customize the platform for my business?',
    answer: 'Absolutely. Business and Enterprise plans include API access, custom integrations, and white-label options. Our platform is built to be flexible and can adapt to your specific business needs, whether you\'re in retail, services, or digital products.'},
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 leading-relaxed pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
          >
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Everything you need to know about Carticom. Can&apos;t find the answer you&apos;re looking for? Contact our support team.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@carticom.ng"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact our support team
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}