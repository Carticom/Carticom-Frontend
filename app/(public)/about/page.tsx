'use client';


import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, Globe, Users, ArrowRight, Sparkles, Store, Headphones, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/Container';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }})};

const stats = [
  { value: '50K+', label: 'Merchants', icon: Store },
  { value: '$2.5B', label: 'GMV Processed', icon: BarChart3 },
  { value: '45+', label: 'Countries', icon: Globe },
  { value: '24/7', label: 'Support', icon: Headphones },
];

const values = [
  {
    icon: Target,
    title: 'African First',
    description:
      'Every feature we build is designed for the unique realities of African commerce — from mobile money to USSD to last-mile logistics.',
    color: 'blue'},
  {
    icon: Heart,
    title: 'Merchant Obsession',
    description:
      'We succeed only when our merchants grow. Every decision starts with the question: does this help our sellers win?',
    color: 'rose'},
  {
    icon: Shield,
    title: 'Trust & Security',
    description:
      'We handle payments, escrow, and sensitive data with bank-grade encryption and rigorous compliance across every market we serve.',
    color: 'emerald'},
  {
    icon: Zap,
    title: 'Radical Simplicity',
    description:
      'Complexity is the enemy of execution. We obsess over clean interfaces and workflows that just work — even on 2G networks.',
    color: 'amber'},
  {
    icon: Users,
    title: 'Community Power',
    description:
      'Carticom is built for the African entrepreneur ecosystem. We connect sellers, buyers, logistics partners, and payment providers.',
    color: 'indigo'},
  {
    icon: Globe,
    title: 'Borderless Commerce',
    description:
      'We break down barriers so a seller in Lagos can sell to a buyer in Nairobi or London as easily as selling next door.',
    color: 'cyan'},
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100 group-hover:border-blue-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100 group-hover:border-rose-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100 group-hover:border-emerald-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100 group-hover:border-amber-200' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100 group-hover:border-indigo-200' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100 group-hover:border-cyan-200' }};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* ──────── Hero ──────── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-blue-500/10 via-blue-400/5 to-transparent blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-indigo-400/5 to-transparent blur-3xl" />
        </div>

        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Our Story
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="text-4xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Carticom
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 sm:text-xl"
            >
              We are building the commerce operating system for Africa — a single platform that lets
              any business create a store, accept payments, manage operations, and scale across the
              continent and beyond.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ──────── Mission ──────── */}
      <section className="bg-gray-50/50 py-24">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Empowering African entrepreneurs to thrive in the digital economy
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 text-gray-600"
              >
                <p>
                  Africa&apos;s commerce infrastructure is fragmented. Payments, logistics, storefronts,
                  and customer engagement live in disconnected silos — forcing merchants to stitch
                  together dozens of tools just to run their business.
                </p>
                <p>
                  Carticom brings everything together. We provide a unified platform with integrated
                  payments, AI-powered automation, real-time analytics, and logistics — purpose-built
                  for the African market.
                </p>
                <p>
                  Founded in Lagos, we are a team of engineers, operators, and entrepreneurs who have
                  experienced the pain of building a business in Africa first-hand. Our mission is to
                  remove every barrier so merchants can focus on what matters: growing their business.
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ──────── Values ──────── */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              <Heart className="h-4 w-4" aria-hidden="true" />
              What We Believe
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              These principles guide every product decision, partnership, and interaction we make.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const colors = colorMap[value.color];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className={`group rounded-2xl border bg-white p-8 ${colors.border} transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5`}
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ──────── Stats ──────── */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-20">
        <Container>
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14 text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Carticom by the numbers
              </h2>
              <p className="mt-3 text-lg text-blue-100">
                The impact we have made across the African commerce ecosystem.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
                  >
                    <StatIcon className="mx-auto mb-3 h-8 w-8 text-blue-200" aria-hidden="true" />
                    <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium text-blue-200">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ──────── CTA ──────── */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Get Started
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Ready to grow your business with Carticom?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join 50,000+ merchants across Africa who trust Carticom to power their commerce. Start
              your 30-day free trial today — no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 text-base font-semibold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:from-blue-700 hover:to-cyan-700 hover:shadow-blue-500/40 sm:w-auto"
                asChild
              >
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full rounded-2xl border-gray-300 px-8 text-base font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 sm:w-auto"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
