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
  { href: '/features', label: 'Product' },
  { href: '/templates', label: 'Templates' },
  {
    label: 'Solutions',
    children: [
      { href: '/solutions/ecommerce', label: 'E-Commerce' },
      { href: '/solutions/retail', label: 'Retail & POS' },
      { href: '/solutions/restaurants', label: 'Restaurants' },
      { href: '/solutions/services', label: 'Service Businesses' },
    ]},
  { href: '/pricing', label: 'Pricing' },
  {
    label: 'Resources',
    children: [
      { href: '/help', label: 'Help Center' },
      { href: '/docs', label: 'Documentation' },
      { href: '/tutorials', label: 'Tutorials' },
      { href: '/blog', label: 'Blog' },
    ]},
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl transition-shadow duration-300',
        scrolled ? 'shadow-[0_1px_3px_rgba(53,25,81,0.06)] border-b border-gray-100' : 'border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 md:h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Carticom Home">
            <Image src="/image/carticom_logo.png" alt="Carticom Logo" width={34} height={34} className="rounded-lg" />
            <span className="text-lg font-bold tracking-tight text-brand">Carticom</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
            {NAV_LINKS.map((link) =>
              'children' in link && link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-brand-soft transition-colors">
                    {link.label}
                    <ChevronDown className={cn('h-3.5 w-3.5 text-gray-400 transition-transform', openDropdown === link.label && 'rotate-180')} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-brand/5 p-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand hover:bg-brand-soft rounded-xl transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-brand-soft transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Button asChild className="h-10 rounded-xl bg-brand hover:bg-brand-dark text-white px-5 shadow-sm shadow-brand/20">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href="/login" className="px-3.5 py-2 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-brand-soft transition-colors">
                  Login
                </Link>
                <Button asChild className="h-10 rounded-xl bg-brand hover:bg-brand-dark text-white px-5 shadow-sm shadow-brand/20">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 -mr-1 rounded-xl hover:bg-gray-100 transition-colors"
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
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                'children' in link && link.children ? (
                  <div key={link.label}>
                    <p className="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">{link.label}</p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-brand-soft"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-brand-soft"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                {isAuthenticated ? (
                  <Button asChild className="w-full h-11 rounded-xl bg-brand hover:bg-brand-dark text-white">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block text-center text-sm font-medium text-gray-700 py-2.5 rounded-xl hover:bg-gray-50"
                    >
                      Login
                    </Link>
                    <Button asChild className="w-full h-11 rounded-xl bg-brand hover:bg-brand-dark text-white">
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
