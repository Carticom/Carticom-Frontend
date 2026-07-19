"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Store,
  CreditCard,
  Shield,
  Bot,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const floatingCards = [
  {
    icon: Store,
    title: "Online Store",
    value: "Live",
    description: "Go live instantly",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200/50",
  },
  {
    icon: CreditCard,
    title: "Smart Payments",
    value: "100+ Methods",
    description: "Global & local",
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200/50",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    value: "24/7 Support",
    description: "Intelligent automation",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200/50",
  },
];

const statsBadges = [
  { number: "50K+", label: "Active Sellers", icon: TrendingUp },
  { number: "$2.5B", label: "GMV Processed", icon: CreditCard },
  { number: "45+", label: "Countries", icon: Globe },
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-white">
        {/* Main gradient orbs - smaller */}
        <div className="absolute top-[-10%] right-[-3%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-500/15 via-blue-400/8 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/12 via-indigo-400/6 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-3xl" />

        {/* Subtle accent gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none" />

        {/* Grid pattern overlay - more subtle */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1e40af 1.5px, transparent 1.5px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <Container size="xl">
        <div className="pt-10 md:pt-14 pb-10 md:pb-14">
          <div className="max-w-7xl mx-auto">
            {/* Stats Pills - Top */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex flex-wrap items-center justify-center gap-3">
                {statsBadges.map((stat, i) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-200/60 backdrop-blur-sm"
                    >
                      <StatIcon
                        className="h-4 w-4 text-gray-600"
                        aria-hidden="true"
                      />
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-900">
                          {stat.number}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {stat.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-center mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6">
                The Commerce
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Operating System
                  </span>
                </span>
                <br />
                <span className="text-gray-600">Built for Africa</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-500 leading-relaxed max-w-4xl mx-auto font-light tracking-wide">
                Create stores, accept payments, manage orders, automate support
                with AI, and scale your business—all from one powerful platform.
              </p>
            </motion.div>

            {/* Floating Cards - Feature Grid */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.35}
              className="mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {floatingCards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    custom={0.4 + i * 0.08}
                    className={`group relative p-5 rounded-2xl bg-white/70 backdrop-blur-xl border ${card.borderColor} shadow-lg shadow-gray-900/5 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-300`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <card.icon
                            className={`h-5 w-5 ${card.iconColor}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex h-6 px-2.5 items-center rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-200/50">
                          <span className="text-xs font-semibold text-green-700">
                            Active
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {card.description}
                      </p>
                      <div className="text-base font-bold text-gray-900">
                        {card.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-950 hover:to-gray-900 text-white shadow-2xl shadow-gray-900/20 hover:shadow-gray-900/40 transition-all duration-300"
                  asChild
                >
                  <a href="/register">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Free Trial
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </motion.div>
                    </span>
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="group w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-0 text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                  asChild
                >
                  <a href="/demo" className="flex items-center gap-2">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    </motion.div>
                    Book Demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.65}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Trusted by leading African businesses
              </p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {["Bank Grade Security", "99.99% Uptime", "24/7 Support"].map(
                  (badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-gray-700">
                        {badge}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Simple Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Explore
          </span>
          <div className="flex flex-col items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="h-1 w-1 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </button>
      </motion.div>
    </section>
  );
}
