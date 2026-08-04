import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { HeroSection } from '@/components/marketing/HeroSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { WhyCarticom } from '@/components/marketing/WhyCarticom';
import { SolutionsSection } from '@/components/marketing/SolutionsSection';
import { DashboardShowcase } from '@/components/marketing/DashboardShowcase';
import { PricingSection } from '@/components/marketing/PricingSection';
import { CustomSolutionsSection } from '@/components/marketing/CustomSolutionsSection';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { FAQSection } from '@/components/marketing/FAQSection';
import { CTASection } from '@/components/marketing/CTASection';
import { FooterSection } from '@/components/marketing/FooterSection';

export const metadata: Metadata = {
  title: 'Carticom - Commerce Operating System for Africa',
  description: 'Build, sell, manage and scale your business with Carticom. The all-in-one commerce platform for African businesses. Create stores, accept payments, manage orders, and automate with AI.',
  keywords: ['commerce', 'africa', 'ecommerce', 'payments', 'escrow', 'ai', 'business', 'store builder', 'nigeria', 'saas'],
  openGraph: {
    title: 'Carticom - Commerce Operating System for Africa',
    description: 'Build, sell, manage and scale your business with Carticom.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Carticom'},
  twitter: {
    card: 'summary_large_image',
    title: 'Carticom - Commerce Operating System for Africa',
    description: 'Build, sell, manage and scale your business with Carticom.'}};

export default function Home() {
  return (
    <main className="flex-1">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <WhyCarticom />
      <SolutionsSection />
      <DashboardShowcase />
      <PricingSection />
      <CustomSolutionsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
