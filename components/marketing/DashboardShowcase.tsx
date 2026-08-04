'use client';

import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, ArrowRight } from 'lucide-react';
import Link from 'next/link';


export function DashboardShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-blue-950 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(5,150,105,0.1)_0%,_transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <div className="flex gap-1">
              <Monitor className="h-3.5 w-3.5 text-blue-400" />
              <Smartphone className="h-3.5 w-3.5 text-blue-400" />
              <Tablet className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span className="text-xs font-medium text-blue-300">Works Across All Devices</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your Business at Your Fingertips</h2>
          <p className="text-blue-100/60 mt-4 max-w-2xl mx-auto">Manage your entire business from any device. Dashboard, orders, products, and analytics — fully responsive.</p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-5xl aspect-[16/10] rounded-2xl border border-white/10 bg-gradient-to-br from-blue-800/30 to-blue-900/30 backdrop-blur-sm shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <Monitor className="h-12 w-12 text-blue-600 mx-auto" />
                <p className="text-sm text-gray-500">Dashboard screenshot — laptop view</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-48 md:w-64 aspect-[3/4] rounded-xl border border-white/10 bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/register" className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            See the full dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
