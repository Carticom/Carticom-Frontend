'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const LINK_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Solutions', href: '/solutions/ecommerce' },
      { label: 'API', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Partners', href: '/partners' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Community', href: '/community' },
      { label: 'Custom Solutions', href: '/contact' },
      { label: 'Request a Demo', href: '/demo' },
    ],
  },
];

const SOCIALS = [
  { icon: FaXTwitter, label: 'X (Twitter)', href: 'https://twitter.com/carticom' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com/carticom' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/company/carticom' },
  { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com/@carticom' },
];

export function FooterSection() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2.5" aria-label="Carticom Home">
              <Image src="/image/carticom_logo.png" alt="Carticom Logo" width={34} height={34} className="rounded-lg" />
              <span className="text-lg font-bold tracking-tight text-brand">Carticom</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              The simple way for African businesses to create an online store, manage their business and sell — without
              needing a developer.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-colors hover:border-blue-600/40 hover:bg-blue-50 hover:text-blue-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-1.5 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gray-400" /> support@carticom.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" /> Lagos, Nigeria
              </p>
            </div>
          </div>

          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-sm font-semibold text-gray-900">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-brand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Carticom. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/legal/terms" className="transition-colors hover:text-brand">Terms</Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-brand">Privacy Policy</Link>
            <Link href="/legal/cookies" className="transition-colors hover:text-brand">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
