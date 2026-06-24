'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChevronDown, Zap, Globe, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from './Container';

const navLinks = [
  { href: '/features', label: 'Features' },
  {
    href: '#solutions',
    label: 'Solutions',
    submenu: [
      { href: '/solutions/ecommerce', label: 'E-commerce', icon: ShoppingCart },
      { href: '/solutions/global', label: 'Global Sales', icon: Globe },
      { href: '/solutions/payments', label: 'Payments', icon: Zap },
    ],
  },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.15 } },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border-b border-gray-100/40'
          : 'bg-transparent'
      }`}
    >
      <Container size="xl">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Carticom Home"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/image/carticom_logo.png"
                alt="Carticom Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </motion.div>
            <div className="flex flex-col gap-0">
              <span className="font-bold text-lg tracking-tight text-gray-900">
                Carticom
              </span>
              <span className="text-xs font-medium text-gray-500 -mt-1">
                Pan-African Commerce
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const hasSubmenu = 'submenu' in link;

              return (
                <div key={link.href} className="relative group">
                  <motion.div
                    onHoverStart={() =>
                      hasSubmenu && setActiveDropdown(link.href)
                    }
                    onHoverEnd={() =>
                      hasSubmenu && setActiveDropdown(null)
                    }
                  >
                    <button
                      className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50/50 group/link flex items-center gap-1.5"
                    >
                      {link.label}
                      {hasSubmenu && (
                        <motion.div
                          animate={{
                            rotate: activeDropdown === link.href ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-gray-400 group-hover/link:text-blue-500" />
                        </motion.div>
                      )}
                      <motion.div
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </button>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {hasSubmenu && activeDropdown === link.href && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 mt-2 w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-100/60 overflow-hidden"
                        >
                          <div className="p-2">
                            {(link as { submenu: typeof link.submenu }).submenu?.map(
                              (item) => {
                                const IconComponent = item.icon;
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group/item"
                                  >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 group-hover/item:bg-blue-100 transition-colors">
                                      <IconComponent className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-sm font-medium text-gray-900">
                                        {item.label}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {item.label === 'E-commerce'
                                          ? 'Sell globally'
                                          : item.label === 'Global Sales'
                                          ? 'Cross-border'
                                          : 'Secure transactions'}
                                      </span>
                                    </div>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-xl hover:bg-blue-50/50"
            >
              Login
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 text-white font-medium"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative h-10 w-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-white/50 backdrop-blur-md -mx-6 border-t border-gray-100/40"
            >
              <div className="py-6 px-6 space-y-1">
                {navLinks.map((link) => {
                  const hasSubmenu = 'submenu' in link;
                  const isOpen = isMobileDropdownOpen === link.href;

                  return (
                    <div key={link.href}>
                      {hasSubmenu ? (
                        <button
                          onClick={() =>
                            setIsMobileDropdownOpen(
                              isOpen ? null : link.href
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          <span>{link.label}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {hasSubmenu && isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="py-2 pl-2 space-y-1">
                              {(link as { submenu: typeof link.submenu }).submenu?.map(
                                (item) => {
                                  const IconComponent = item.icon;
                                  return (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-blue-50/50 rounded-xl transition-colors"
                                      onClick={() =>
                                        setIsMobileMenuOpen(false)
                                      }
                                    >
                                      <IconComponent className="h-4 w-4 text-blue-600" />
                                      {item.label}
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-3">
                  <Link
                    href="/login"
                    className="text-center text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/20 text-white font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                      asChild
                    >
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}