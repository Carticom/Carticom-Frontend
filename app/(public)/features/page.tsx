'use client';


import { motion } from 'framer-motion';
import {
  Store,
  CreditCard,
  Shield,
  Bot,
  BarChart3,
  Package,
  Truck,
  Headphones,
  Globe,
  Smartphone,
  Zap,
  Users,
  ShoppingCart,
  Wallet,
  Lock,
  FileText,
  MessageSquare,
  Bell,
  TrendingUp,
  RefreshCw,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Layers,
  Palette} from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }})};

const categories = [
  {
    title: 'Store Management',
    subtitle: 'Build and customize your online presence',
    features: [
      {
        icon: Store,
        title: 'Store Builder',
        description: 'Drag-and-drop store builder with customizable themes. Launch a beautiful online store in minutes without any coding.',
        color: 'blue'},
      {
        icon: Palette,
        title: 'Custom Themes',
        description: 'Choose from professionally designed themes or create your own. Full control over colors, fonts, and layout.',
        color: 'purple'},
      {
        icon: Package,
        title: 'Inventory Management',
        description: 'Track stock levels across multiple warehouses. Set low-stock alerts and manage variants, bundles, and digital products.',
        color: 'pink'},
      {
        icon: Layers,
        title: 'Product Categories',
        description: 'Organize products with unlimited categories, subcategories, and tags. Advanced filtering for better discoverability.',
        color: 'orange'},
      {
        icon: ShoppingCart,
        title: 'Multi-channel Selling',
        description: 'Sell on WhatsApp, Instagram, Facebook, and your custom storefront. Manage all channels from one dashboard.',
        color: 'cyan'},
      {
        icon: Search,
        title: 'SEO Optimization',
        description: 'Built-in SEO tools, meta tags, sitemaps, and structured data. Get found by customers searching on Google.',
        color: 'green'},
    ]},
  {
    title: 'Payments & Finance',
    subtitle: 'Accept payments and manage your finances',
    features: [
      {
        icon: CreditCard,
        title: 'Payment Gateway',
        description: 'Accept payments via Paystack, Flutterwave, bank transfers, cards, mobile money, and USSD across Africa.',
        color: 'green'},
      {
        icon: Wallet,
        title: 'Carticom Wallet',
        description: 'Built-in digital wallet for instant settlements, withdrawals, and balance management. No more waiting for payouts.',
        color: 'blue'},
      {
        icon: Shield,
        title: 'Escrow Service',
        description: 'Secure payment protection for high-value transactions. Funds are released only when both parties are satisfied.',
        color: 'indigo'},
      {
        icon: RefreshCw,
        title: 'Recurring Billing',
        description: 'Set up subscriptions, installment plans, and recurring invoices. Automate billing for SaaS and membership businesses.',
        color: 'orange'},
      {
        icon: FileText,
        title: 'Invoicing',
        description: 'Generate professional invoices, receipts, and credit notes. Send automated billing reminders and track payments.',
        color: 'red'},
      {
        icon: TrendingUp,
        title: 'Multi-currency',
        description: 'Display prices in NGN, USD, GBP, EUR, and more. Accept payments in any currency with automatic conversion.',
        color: 'cyan'},
    ]},
  {
    title: 'AI & Automation',
    subtitle: 'Work smarter with intelligent automation',
    features: [
      {
        icon: Bot,
        title: 'AI Chatbot',
        description: '24/7 AI-powered customer support via WhatsApp and web chat. Handles FAQs, order tracking, and returns automatically.',
        color: 'indigo'},
      {
        icon: MessageSquare,
        title: 'WhatsApp Integration',
        description: 'Sell and provide support directly on WhatsApp. Send order updates, promotions, and abandoned cart reminders.',
        color: 'green'},
      {
        icon: Zap,
        title: 'Smart Automation',
        description: 'Automate repetitive tasks: order processing, inventory updates, email marketing, and customer follow-ups.',
        color: 'amber'},
      {
        icon: BarChart3,
        title: 'Predictive Analytics',
        description: 'AI-powered sales forecasts, demand predictions, and customer insights. Make data-driven decisions confidently.',
        color: 'blue'},
      {
        icon: Users,
        title: 'Customer Insights',
        description: 'Deep customer profiles with purchase history, preferences, and behavior patterns. Segment and target effectively.',
        color: 'pink'},
      {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'Intelligent alerts for low stock, unusual activity, payment failures, and key business milestones.',
        color: 'purple'},
    ]},
  {
    title: 'Operations & Growth',
    subtitle: 'Scale your business with powerful tools',
    features: [
      {
        icon: Truck,
        title: 'Logistics Integration',
        description: 'Connect with top delivery services across Africa. Automated shipping labels, real-time tracking, and delivery confirmations.',
        color: 'cyan'},
      {
        icon: Globe,
        title: 'Global Reach',
        description: 'Sell to customers across 45+ countries. Localized checkout, regional payment methods, and international shipping.',
        color: 'blue'},
      {
        icon: Smartphone,
        title: 'Mobile App',
        description: 'Manage your business on the go with our mobile app. Real-time notifications, order management, and analytics.',
        color: 'orange'},
      {
        icon: Lock,
        title: 'Bank-grade Security',
        description: 'PCI-DSS compliant, end-to-end encryption, and fraud detection. Your data and transactions are always protected.',
        color: 'red'},
      {
        icon: Users,
        title: 'Team Management',
        description: 'Add team members with role-based permissions. Collaborate on orders, inventory, and customer support.',
        color: 'green'},
      {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Dedicated support team available around the clock via chat, email, and phone. We help you succeed.',
        color: 'purple'},
    ]},
];

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200', gradient: 'from-blue-600 to-blue-600' },
  green: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200', gradient: 'from-blue-600 to-blue-500' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'group-hover:border-indigo-200', gradient: 'from-indigo-600 to-purple-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'group-hover:border-orange-200', gradient: 'from-orange-600 to-amber-500' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'group-hover:border-pink-200', gradient: 'from-pink-600 to-rose-500' },
  cyan: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'group-hover:border-blue-200', gradient: 'from-blue-600 to-blue-500' },
  red: { bg: 'bg-red-50', text: 'text-red-600', border: 'group-hover:border-red-200', gradient: 'from-red-600 to-rose-500' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'group-hover:border-purple-200', gradient: 'from-purple-600 to-indigo-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'group-hover:border-amber-200', gradient: 'from-amber-600 to-yellow-500' }};

const stats = [
  { number: '50K+', label: 'Active Sellers', icon: Users },
  { number: '$2.5B+', label: 'GMV Processed', icon: Wallet },
  { number: '45+', label: 'Countries', icon: Globe },
  { number: '99.99%', label: 'Uptime', icon: Zap },
];

const highlights = [
  { icon: Zap, title: 'Lightning Fast', description: 'Page loads in under 100ms with our optimized infrastructure' },
  { icon: Shield, title: 'Fully Secure', description: 'PCI-DSS Level 1 compliant with real-time fraud monitoring' },
  { icon: RefreshCw, title: 'Always Synced', description: 'Real-time synchronization across all your devices and channels' },
  { icon: Sparkles, title: 'AI-Powered', description: 'Smart automation that learns and adapts to your business' },
];

export default function FeaturesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-8%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-bl from-blue-500/15 via-blue-400/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/12 via-indigo-400/6 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #1e40af 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} />
        </div>

        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              Everything You Need
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
            >
              Powerful features to
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                grow your business
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto"
            >
              From store management and payments to AI-powered automation and logistics,
              Carticom provides every tool you need to build, manage, and scale your business across Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            >
              <Button size="lg" className="h-14 px-8 text-base font-semibold rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-950 hover:to-gray-900 text-white shadow-2xl shadow-gray-900/20" asChild>
                <a href="/register">
                  <span className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <a href="/demo">Book a Demo</a>
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50/50 border-y border-gray-100">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <StatIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Features Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={category.title} className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}`}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{category.title}</h2>
              <p className="text-lg text-gray-600">{category.subtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.features.map((feature, index) => {
                const colors = colorMap[feature.color];
                return (
                  <motion.div
                    key={feature.title}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className={`group p-6 rounded-2xl bg-white border border-gray-100 ${colors.border} transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5`}
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.text} mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </section>
      ))}

      {/* Highlights Grid */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              Why Carticom
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for performance, designed for scale
            </h2>
            <p className="text-lg text-gray-600">
              Enterprise-grade infrastructure that grows with your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-50/50 border border-gray-100 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <ItemIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
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
              <Sparkles className="h-4 w-4" />
              Start Your Free Trial
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to transform your business?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join 50,000+ African businesses already using Carticom. Start your 30-day free trial today. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button size="lg" className="w-full sm:w-auto gap-2 h-14 px-8 text-base bg-white text-blue-600 hover:bg-blue-50 shadow-xl rounded-2xl" asChild>
                <a href="/register">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-14 px-8 text-base bg-transparent border-white text-white hover:bg-white/10 rounded-2xl" asChild>
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
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100"
            >
              {['No credit card required', '30-day free trial', 'Cancel anytime', '24/7 support'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
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
