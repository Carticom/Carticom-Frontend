'use client';

import { Hero } from '@/components/marketing/Hero';
import { TrustedBy } from '@/components/marketing/TrustedBy';
import { Features } from '@/components/marketing/Features';
import { Escrow } from '@/components/marketing/Escrow';
import { AI } from '@/components/marketing/AI';
import { Analytics } from '@/components/marketing/Analytics';
import { Pricing } from '@/components/marketing/Pricing';
import { Testimonials } from '@/components/marketing/Testimonials';
import { FAQ } from '@/components/marketing/FAQ';
import { CTA } from '@/components/marketing/CTA';
import { Footer } from '@/components/marketing/Footer';

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      {/* <TrustedBy /> */}
      <Features />
      <Escrow />
      <AI />
      <Analytics />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}