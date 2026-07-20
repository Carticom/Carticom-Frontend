import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { AI } from '@/components/marketing/AI';
import { Analytics } from '@/components/marketing/Analytics';
import { CustomSolutions } from '@/components/marketing/CustomSolutions';
import { Pricing } from '@/components/marketing/Pricing';
import { Testimonials } from '@/components/marketing/Testimonials';
import { FAQ } from '@/components/marketing/FAQ';
import { CTA } from '@/components/marketing/CTA';
import { Footer } from '@/components/marketing/Footer';

export const metadata = {
  title: 'Carticom - Commerce Operating System for Africa',
  description: 'Build, sell, manage and scale your business with Carticom. The all-in-one commerce platform for African businesses. Create stores, accept payments, manage orders, and automate support with AI.',
  keywords: ['commerce', 'africa', 'ecommerce', 'payments', 'escrow', 'ai', 'business', 'store builder', 'nigeria'],
  authors: [{ name: 'Carticom' }],
  openGraph: {
    title: 'Carticom - Commerce Operating System for Africa',
    description: 'Build, sell, manage and scale your business with Carticom. The all-in-one commerce platform for African businesses.',
    type: 'website',
    locale: 'en_NG',
    url: 'https://carticom.app',
    siteName: 'Carticom',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Carticom - Commerce Operating System for Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carticom - Commerce Operating System for Africa',
    description: 'Build, sell, manage and scale your business with Carticom.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://carticom.app',
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Features />
      <AI />
      <Analytics />
      <CustomSolutions />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
