'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  {
    label: 'Solutions',
    children: [
      { href: '/solutions/ecommerce', label: 'E-Commerce' },
      { href: '/solutions/retail', label: 'Retail & POS' },
      { href: '/solutions/restaurants', label: 'Restaurants' },
      { href: '/solutions/services', label: 'Service Businesses' },
    ]},
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Developers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Carticom Home">
            <Image src="/image/carticom_logo.png" alt="Carticom Logo" width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-lg tracking-tight text-gray-900">Carticom</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV_LINKS.map((link) => (
              'children' in link && link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-colors">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 p-2"
                      >
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href!}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-colors">
                  Login
                </Link>
                <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                'children' in link && link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{link.label}</p>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href!} onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-3 px-4">
                {isAuthenticated ? (
                  <Button asChild className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}
                      className="block text-center text-sm font-medium text-gray-700 py-2.5 rounded-xl hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Button asChild className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
