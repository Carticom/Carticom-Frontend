// ============================================================
// CARTICOM AUTHENTICATION — Shared Auth Page Layout
// ============================================================

'use client';

import React from 'react';


import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Hide social proof section */
  hideSocialProof?: boolean;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  hideSocialProof = false}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10"
          >
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            {children}
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500"
          >
            &copy; {new Date().getFullYear()} Carticom. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Branding / Social Proof */}
      {!hideSocialProof && (
        <div className="relative hidden flex-1 lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                backgroundSize: "40px 40px"}}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                The Commerce Operating System for Africa
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 text-lg text-blue-100"
              >
                Build, sell, and scale your business across Africa — all from
                one powerful platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 grid grid-cols-3 gap-6 text-center"
              >
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">50K+</p>
                  <p className="mt-1 text-xs text-blue-200">Active Sellers</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">$2.5B</p>
                  <p className="mt-1 text-xs text-blue-200">GMV Processed</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-white">45+</p>
                  <p className="mt-1 text-xs text-blue-200">Countries</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}