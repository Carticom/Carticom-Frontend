'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(5,150,105,0.15)_0%,_transparent_60%),radial-gradient(ellipse_at_70%_50%,_rgba(5,150,105,0.1)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-300">Start free — no credit card required</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Start Building Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">
              Business Today
            </span>
          </h2>

          <p className="text-lg text-blue-100/60 max-w-xl mx-auto">
            Join thousands of African entrepreneurs already using Carticom to launch, manage, and grow their commerce operations.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl bg-white text-blue-900 hover:bg-blue-50 px-10 h-14 text-base font-semibold shadow-xl shadow-black/10 group">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl border-blue-400/30 text-blue-200 hover:bg-white/5 hover:text-white px-10 h-14 text-base">
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>

          <p className="text-xs text-blue-700/80">Free 14-day trial · No credit card · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
