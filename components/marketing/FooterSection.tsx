'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Templates', href: '/features' },
    { label: 'Integrations', href: '/solutions/ecommerce' },
    { label: 'API', href: '/docs' },
  ],
  Resources: [
    { label: 'Help Center', href: '/help' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Community', href: '/community' },
    { label: 'Partners', href: '/partners' },
  ],
  Developers: [
    { label: 'API Reference', href: '/docs' },
    { label: 'SDKs', href: '/docs' },
    { label: 'Webhooks', href: '/docs' },
    { label: 'Changelog', href: '/docs' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'GDPR', href: '/legal/gdpr' },
    { label: 'Security', href: '/features' },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/image/carticom_logo.png" alt="Carticom Logo" width={36} height={36} className="rounded-lg brightness-0 invert" />
              <span className="font-bold text-lg text-white">Carticom</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm mb-6">
              The all-in-one commerce operating system for Africa. Build, manage, and grow your business from one platform.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/carticom" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors bg-gray-800 px-3 py-1.5 rounded-lg">X</a>
              <a href="https://instagram.com/carticom" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors bg-gray-800 px-3 py-1.5 rounded-lg">IG</a>
              <a href="https://linkedin.com/company/carticom" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors bg-gray-800 px-3 py-1.5 rounded-lg">LI</a>
              <a href="https://youtube.com/@carticom" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors bg-gray-800 px-3 py-1.5 rounded-lg">YT</a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Carticom. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <Link href="/legal/privacy" className="hover:text-gray-400">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-gray-400">Terms</Link>
            <Link href="/legal/cookies" className="hover:text-gray-400">Cookies</Link>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Newsletter subscription coming soon!'); }} className="flex items-center gap-2">
            <input type="email" placeholder="Join newsletter" className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-blue-500 w-40" required />
            <button type="submit" className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
