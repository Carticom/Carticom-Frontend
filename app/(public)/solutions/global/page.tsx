'use client';


import { motion } from 'framer-motion';
import { Globe, DollarSign, Truck, Shield, ArrowRight, CheckCircle, MapPin, Banknote, Clock, RefreshCw } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Globe,
    title: 'Cross-Border Commerce',
    description: 'Sell to customers in 45+ African countries and beyond. Handle international orders, duties, and compliance automatically.',
    color: 'emerald'},
  {
    icon: DollarSign,
    title: 'Multi-Currency Support',
    description: 'Price products in NGN, USD, GBP, EUR, and accept payments in your customers preferred currency with real-time conversion.',
    color: 'blue'},
  {
    icon: Truck,
    title: 'Global Logistics Network',
    description: 'Connect with international and local carriers. Automated shipping labels, tracking, and last-mile delivery across borders.',
    color: 'amber'},
  {
    icon: Shield,
    title: 'Trade & Payment Protection',
    description: 'Built-in escrow for high-value cross-border transactions. Fraud detection, dispute resolution, and buyer/seller protection.',
    color: 'purple'},
];

const benefits = [
  'Automated currency conversion with competitive rates',
  'Pre-calculated duties, taxes, and shipping costs at checkout',
  'Localised checkout experience in 20+ languages',
  'Integration with major African and global carriers',
  'Compliance with African Continental Free Trade Area (AfCFTA)',
  'Real-time tracking from warehouse to delivery',
];

export default function GlobalSalesPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-emerald-500/15 via-emerald-400/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/12 via-teal-400/6 to-transparent rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              Global Sales Solution
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight"
            >
              Sell across borders
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                without the complexity
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              Expand your business beyond borders. Carticom handles cross-border payments, multi-currency pricing, logistics, and compliance so you can focus on growth.
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
                  Go Global
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-4 text-base rounded-2xl" asChild>
                <a href="/features">
                  See How It Works
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
              Borderless selling made simple
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Break into new markets with tools that handle the hard part — payments, shipping, and compliance across every African market.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const colorMap: Record<string, string> = {
                emerald: 'bg-emerald-50 text-emerald-600',
                blue: 'bg-blue-50 text-blue-600',
                amber: 'bg-amber-50 text-amber-600',
                purple: 'bg-purple-50 text-purple-600'};
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Why Sell Globally with Carticom
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your passport to pan-African commerce
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                The African Continental Free Trade Area is creating the worlds largest free trade zone. Carticom positions your business to take full advantage of this historic opportunity.
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
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
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
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Banknote className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cross-Border Performance</p>
                      <p className="text-xs text-gray-500">Active markets</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Countries Reached</p>
                      <p className="text-2xl font-bold text-gray-900">28</p>
                      <span className="text-xs font-medium text-emerald-600">and growing</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Currencies</p>
                      <p className="text-2xl font-bold text-gray-900">15+</p>
                      <span className="text-xs font-medium text-emerald-600">supported</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Avg. Delivery Time</p>
                      <p className="text-2xl font-bold text-gray-900">2-5 days</p>
                      <span className="text-xs font-medium text-emerald-600">intra-Africa</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">+42%</p>
                      <span className="text-xs font-medium text-emerald-600">with local pricing</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <Clock className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                    <span>Real-time exchange rates powered by Carticom</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
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
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Start Your Global Expansion
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to reach customers across Africa?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto"
            >
              Break into new markets with confidence. Start your 30-day free trial and begin selling across borders today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gap-2 px-8 py-4 text-lg bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl rounded-2xl" asChild>
                <a href="/register">
                  Start Global Selling
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
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-100 mt-10"
            >
              {['No credit card required', '30-day free trial', 'Multi-currency support', '24/7 support'].map((item) => (
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
