'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Cookie, Sliders, Target, BarChart3, Settings, Shield, Info, XCircle } from 'lucide-react';

const sections = [
  {
    icon: Info,
    title: 'What Are Cookies?',
    content: 'Cookies are small text files stored on your device by your web browser when you visit a website. They help websites remember your preferences, login status, and browsing behavior. Cookies are widely used to make websites work more efficiently and provide valuable information to website owners.'},
  {
    icon: Sliders,
    title: 'Strictly Necessary Cookies',
    content: 'These cookies are essential for the proper functioning of our platform. They enable core functionality such as security, network management, and account authentication. Without these cookies, our services cannot function properly. These cookies do not collect any personally identifiable information and are set automatically when you use our platform.'},
  {
    icon: BarChart3,
    title: 'Analytics Cookies',
    content: 'We use analytics cookies to understand how visitors interact with our platform, measure the effectiveness of our marketing campaigns, and improve our services. These cookies collect aggregated information about page visits, time spent on pages, and navigation patterns. We use tools like Google Analytics and Mixpanel for this purpose.'},
  {
    icon: Target,
    title: 'Marketing Cookies',
    content: 'Marketing cookies are used to track visitors across websites to display relevant advertisements that are tailored to your interests. These cookies may be set by our advertising partners through our platform. They help us measure the effectiveness of our advertising campaigns and limit the number of times you see an ad.'},
  {
    icon: Settings,
    title: 'Managing Cookies',
    content: 'You can control and manage cookies in your browser settings. Most browsers allow you to block or delete cookies, and you can set preferences for specific websites. However, please note that disabling certain cookies may affect the functionality of our platform. You can also use our cookie consent banner to customize your preferences when you first visit our site.'},
  {
    icon: Shield,
    title: 'Third-Party Cookies',
    content: 'Some cookies are placed by third-party services that appear on our platform. These may include payment processors like Paystack and Stripe, analytics providers, and social media platforms. We do not control these third-party cookies. We recommend reviewing the privacy and cookie policies of these third parties for more information.'},
  {
    icon: XCircle,
    title: 'How to Disable Cookies',
    content: 'To disable cookies, follow the instructions provided by your browser: Chrome (Settings > Privacy and Security > Cookies), Firefox (Options > Privacy & Security > Cookies and Site Data), Safari (Preferences > Privacy > Cookies), or Edge (Settings > Site permissions > Cookies). On mobile devices, check your browser settings for similar options.'},
];

export default function CookiesPage() {
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
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how Carticom uses cookies to improve your experience and how you can control them.
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
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookie Preferences</h2>
          <p className="text-gray-600 mb-4">You can update your cookie preferences at any time through your account settings.</p>
          <a
            href="mailto:privacy@carticom.com"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Cookie className="w-4 h-4" />
            privacy@carticom.com
          </a>
        </motion.div>
      </Container>
    </main>
  );
}
