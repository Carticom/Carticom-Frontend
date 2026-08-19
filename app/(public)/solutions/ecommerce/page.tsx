'use client';


import { motion } from 'framer-motion';
import { Store, Package, ShoppingCart, BarChart3, ArrowRight, CheckCircle, Layers, Tag, RefreshCw, Globe } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Store,
    title: 'Drag-and-Drop Store Builder',
    description: 'Launch a beautiful online store in minutes with our intuitive builder. Customise themes, layouts, and branding with zero coding required.',
    color: 'blue'},
  {
    icon: Package,
    title: 'Product Management',
    description: 'Add unlimited products with variants, images, descriptions, and pricing. Organise collections, set categories, and bulk-import from spreadsheets.',
    color: 'green'},
  {
    icon: ShoppingCart,
    title: 'Smart Inventory Tracking',
    description: 'Monitor stock levels in real time, set low-stock alerts, and manage multiple warehouse locations. Never miss a sale due to overselling.',
    color: 'indigo'},
  {
    icon: BarChart3,
    title: 'Sales & Revenue Analytics',
    description: 'Track performance with live dashboards. See top-selling products, revenue trends, customer acquisition channels, and conversion rates.',
    color: 'orange'},
];

const benefits = [
  'Mobile-optimised storefronts that load in under 2 seconds',
  'Built-in SEO tools to rank higher on Google',
  'Abandoned cart recovery with automated WhatsApp messages',
  'Multi-currency pricing for African and global markets',
  'One-click duplication and bulk product editing',
  'Seamless integration with Carticom Payments & Logistics',
];

export default function EcommercePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-blue-500/15 via-blue-400/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/12 via-indigo-400/6 to-transparent rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
            >
              <Store className="h-4 w-4" aria-hidden="true" />
              E-Commerce Solution
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.08] tracking-tight"
            >
              Build and scale your
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                online store
              </span>
              <br />
              across Africa
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              From product listings to checkout, Carticom gives you everything you need to create a stunning e-commerce experience. No technical skills required.
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
                  Start Your Store
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-4 text-base rounded-2xl" asChild>
                <a href="/features">
                  View Features
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
              Everything you need to sell online
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Powerful tools designed to help African merchants build, manage, and grow their e-commerce businesses.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-blue-50 text-blue-600',
                indigo: 'bg-indigo-50 text-indigo-600',
                orange: 'bg-orange-50 text-orange-600'};
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                <Layers className="h-4 w-4" aria-hidden="true" />
                Why Carticom E-Commerce
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Built for African merchants, by African builders
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We understand the unique challenges of selling online in Africa. From low bandwidth to mobile-first shopping, every feature is designed with your market in mind.
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
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-3xl p-8 border border-blue-100">
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Tag className="h-5 w-5 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Store Performance</p>
                      <p className="text-xs text-gray-500">Last 30 days</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">1,247</p>
                      <span className="text-xs font-medium text-blue-600">+23% vs last month</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">₦8.4M</p>
                      <span className="text-xs font-medium text-blue-600">+31% vs last month</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">4.8%</p>
                      <span className="text-xs font-medium text-blue-600">+12% vs last month</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900">342</p>
                      <span className="text-xs font-medium text-blue-600">+18% vs last month</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                    <RefreshCw className="h-3 w-3 text-blue-500" aria-hidden="true" />
                    <span>Real-time sync across all channels</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden">
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
              <Globe className="h-4 w-4" aria-hidden="true" />
              Launch Your Store Today
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to start selling online?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of African merchants already using Carticom. Create your store free — no credit card required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="gap-2 px-8 py-4 text-lg bg-white text-blue-600 hover:bg-blue-50 shadow-xl rounded-2xl" asChild>
                <a href="/register">
                  Create Your Store
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white/10 rounded-2xl" asChild>
                <a href="mailto:sales@carticom.com">
                  Talk to Sales
                </a>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100 mt-10"
            >
              {['No credit card required', '30-day free trial', 'Cancel anytime', '24/7 support'].map((item) => (
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
