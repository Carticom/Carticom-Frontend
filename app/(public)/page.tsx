import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/HeroSection';
import { ProblemSection } from '@/components/marketing/ProblemSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { DashboardShowcase } from '@/components/marketing/DashboardShowcase';
import { PricingSection } from '@/components/marketing/PricingSection';
import { WhyCarticom } from '@/components/marketing/WhyCarticom';
import { WaitlistSection } from '@/components/marketing/WaitlistSection';
import { CTASection } from '@/components/marketing/CTASection';
import { FooterSection } from '@/components/marketing/FooterSection';

export const metadata: Metadata = {
  title: 'Carticom - Sell Online. Grow Your Business.',
  description: 'Everything you need to sell online. Carticom gives African businesses a simple way to create an online store, manage their business and sell to customers — without needing a developer.',
  keywords: ['commerce', 'africa', 'ecommerce', 'payments', 'ai', 'business', 'store builder', 'nigeria', 'saas', 'sell online'],
  openGraph: {
    title: 'Carticom - Sell Online. Grow Your Business.',
    description: 'Everything you need to sell online. Carticom gives African businesses a simple way to create an online store and sell.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Carticom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carticom - Sell Online. Grow Your Business.',
    description: 'Everything you need to sell online. Carticom gives African businesses a simple way to create an online store and sell.',
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardShowcase />
      <PricingSection />
      <WhyCarticom />
      <WaitlistSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
