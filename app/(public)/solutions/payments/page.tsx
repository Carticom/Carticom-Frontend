'use client';


import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Shield, Zap, ArrowRight, CheckCircle, Banknote, QrCode, Receipt } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: CreditCard,
    title: 'Paystack & Flutterwave Integration',
    description: 'Accept payments from the leading African payment gateways. Seamless checkout with cards, bank transfers, and digital wallets.',
    color: 'purple'},
  {
    icon: Smartphone,
    title: 'Mobile Money & USSD',
    description: 'Tap into the mobile-first market with MTN MoMo, Airtel Money, M-Pesa, and USSD codes. No internet? No problem.',
    color: 'amber'},
  {
    icon: Shield,
    title: 'Escrow & Payment Protection',
    description: 'Built-in escrow for high-value transactions. Funds are held securely until both parties are satisfied. Fraud protection included.',
    color: 'blue'},
  {
    icon: Zap,
    title: 'Instant Settlements & Payouts',
    description: 'Get paid faster with instant settlements. Withdraw to your bank account, mobile wallet, or prefered payment method in real time.',
    color: 'green'},
];

const benefits = [
  'Accept 100+ payment methods across Africa',
  'Real-time currency conversion at checkout',
  'Automated invoicing and receipt generation',
  'Subscription and recurring billing support',
  'Detailed transaction reporting and reconciliation',
  'PCI-DSS Level 1 certified security',
];

export default function PaymentsPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-purple-500/15 via-purple-400/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/12 via-indigo-400/6 to-transparent rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6"
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Payments Solution
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight"
            >
              Accept payments from
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                every African customer
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              Paystack, Flutterwave, mobile money, USSD, cards — one integration, every payment method your customers need. No matter how they want to pay.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gap-2 px-8 py-4 text-base rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl" asChild>
                <a href="/register">
                  Start Accepting Payments
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-4 text-base rounded-2xl" asChild>
                <a href="/features">
                  View Payment Options
                </a>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Payment methods your customers already use
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              From card payments to mobile money, Carticom connects you to every major payment method across the continent.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const colorMap: Record<string, string> = {
                purple: 'bg-purple-50 text-purple-600',
                amber: 'bg-amber-50 text-amber-600',
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-blue-50 text-blue-600'};
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${colorMap[feature.color]} mb-5`}>
                    <feature.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6">
                <Banknote className="h-4 w-4" aria-hidden="true" />
                Why Carticom Payments
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                The most comprehensive payment stack for Africa
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Africas payment landscape is fragmented. Carticom unifies it into a single, powerful API — so you can focus on selling, not integrating.
              </p>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                {benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Receipt className="h-5 w-5 text-purple-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Payment Overview</p>
                      <p className="text-xs text-gray-500">Last 30 days</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Transactions</p>
                      <p className="text-2xl font-bold text-gray-900">12,847</p>
                      <span className="text-xs font-medium text-purple-600">+28% vs last month</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Volume Processed</p>
                      <p className="text-2xl font-bold text-gray-900">₦42.6M</p>
                      <span className="text-xs font-medium text-purple-600">+35% vs last month</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">98.7%</p>
                      <span className="text-xs font-medium text-purple-600">99.9% uptime</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Payment Methods</p>
                      <p className="text-2xl font-bold text-gray-900">100+</p>
                      <span className="text-xs font-medium text-purple-600">across Africa</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <QrCode className="h-3 w-3 text-purple-500" aria-hidden="true" />
                    <span>PCI-DSS Level 1 compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Start Accepting Payments
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to accept every payment method?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto"
            >
              One integration to accept payments from every African customer. Start your 30-day free trial today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gap-2 px-8 py-4 text-lg bg-white text-purple-600 hover:bg-purple-50 shadow-xl rounded-2xl" asChild>
                <a href="/register">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white/10 rounded-2xl" asChild>
                <a href="mailto:sales@carticom.com">
                  Contact Sales
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-purple-100 mt-10"
            >
              {['No credit card required', '30-day free trial', '100+ payment methods', '24/7 support'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
