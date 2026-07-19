'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  locale: 'tr' | 'en';
  dict: {
    home: string;
    about: string;
    classes: string;
    schedule: string;
    trainers: string;
    pricing: string;
    blog: string;
    contact: string;
    dashboard: string;
  };
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: dict.home },
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/classes`, label: dict.classes },
    { href: `/${locale}/schedule`, label: dict.schedule },
    { href: `/${locale}/trainers`, label: dict.trainers },
    { href: `/${locale}/pricing`, label: dict.pricing },
    { href: `/${locale}/blog`, label: dict.blog },
    { href: `/${locale}/contact`, label: dict.contact },
  ];

  const switchLanguage = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    const pathSegments = pathname.split('/');
    pathSegments[1] = nextLocale;
    const newPath = pathSegments.join('/');
    router.push(newPath);
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-premium duration-300 ${
          isScrolled ? 'glass-panel py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex flex-col items-start leading-none group"
          >
            <span className="text-base tracking-[0.22em] font-light text-charcoal-900 transition-premium group-hover:text-sage-500">
              <span className="font-extrabold text-sage-500 text-xl tracking-normal">UM</span> PILATES & YOGA
            </span>
            <span className="text-[7.5px] tracking-[0.45em] uppercase font-light text-charcoal-500 mt-1 transition-premium group-hover:text-charcoal-700">
              The Yumiverse
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs tracking-widest uppercase font-medium text-charcoal-900 transition-premium hover:text-sage-500 ${
                  isActive(link.href) ? 'text-sage-500' : 'opacity-70'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-sage-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language switch */}
            <button
              onClick={switchLanguage}
              className="flex items-center text-xs tracking-wider uppercase font-medium text-charcoal-900 opacity-70 hover:opacity-100 transition-premium cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 mr-1" />
              {locale === 'tr' ? 'EN' : 'TR'}
            </button>

            {/* Contact CTA */}
            <Link
              href={`/${locale}/contact`}
              className="flex items-center text-xs tracking-wider uppercase font-medium bg-charcoal-900 text-sand-50 px-5 py-2.5 rounded-full hover:bg-sage-500 hover:text-white transition-premium"
            >
              {dict.contact}
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={switchLanguage}
              className="flex items-center text-xs tracking-wider uppercase font-medium text-charcoal-900 opacity-70 hover:opacity-100 transition-premium cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 mr-1" />
              {locale === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal-900 hover:text-sage-500 transition-premium cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-sand-50/95 backdrop-blur-xl border-b border-sand-200 lg:hidden shadow-lg"
          >
            <div className="flex flex-col px-6 py-8 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm tracking-widest uppercase font-medium text-charcoal-900 hover:text-sage-500 transition-premium ${
                    isActive(link.href) ? 'text-sage-500' : 'opacity-70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-sand-200 flex flex-col space-y-4">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center text-xs tracking-wider uppercase font-medium bg-charcoal-900 text-sand-50 py-3 rounded-full hover:bg-sage-500 hover:text-white transition-premium"
                >
                  {dict.contact}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
