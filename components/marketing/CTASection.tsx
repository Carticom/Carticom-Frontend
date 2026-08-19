'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-center md:px-12 md:py-20"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Store className="h-7 w-7 text-brand" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to take your business online?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Create your Carticom store and start selling without the complexity.
            </p>
            <Button
              asChild
              size="lg"
              className="group mt-8 h-14 rounded-xl bg-brand px-8 text-base font-semibold text-white shadow-lg shadow-black/20 hover:bg-brand-dark"
            >
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-gray-300">Free 30-day trial · No card required · No commission on sales</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
