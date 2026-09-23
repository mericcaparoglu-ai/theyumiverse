'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import {
  BRAND_NAME,
  STUDIO_ADDRESS,
  STUDIO_EMAIL,
  STUDIO_MAPS_URL,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_HREF,
} from '@/lib/studio';

interface FooterProps {
  locale: 'tr' | 'en';
  dict: {
    home: string;
    about: string;
    classes: string;
    schedule: string;
    pricing: string;
    blog: string;
    gallery: string;
    faq: string;
    contact: string;
    studio: string;
    program: string;
    private_sessions: string;
    privacy: string;
    terms: string;
    tagline: string;
    copyright: string;
    powered_by: string;
    region: string;
    open_in_maps: string;
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [beforeBrand, afterBrand = ''] = dict.powered_by.split('{brand}');

  const links = [
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/classes`, label: dict.classes },
    { href: `/${locale}/schedule`, label: dict.schedule },
    { href: `/${locale}/pricing`, label: dict.pricing },
  ];

  const supportLinks = [
    { href: `/${locale}/faq`, label: dict.faq },
    { href: `/${locale}/contact`, label: dict.contact },
    { href: `/${locale}/privacy`, label: dict.privacy },
    { href: `/${locale}/terms`, label: dict.terms },
  ];

  return (
    <footer className="bg-charcoal-900 text-sand-50/80 pt-16 pb-8 border-t border-charcoal-900 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Block */}
        <div className="space-y-4">
          <Link
            href={`/${locale}`}
            className="flex flex-col items-start leading-none group"
          >
            <span className="text-base tracking-[0.22em] font-light text-white transition-premium group-hover:text-sage-200">
              <span className="font-extrabold text-sage-200 text-xl tracking-normal">UM</span> PILATES & YOGA
            </span>
            <span className="text-[7.5px] tracking-[0.45em] font-light text-sand-50/60 mt-1 transition-premium group-hover:text-sand-50/80">
              {BRAND_NAME}
            </span>
          </Link>
          <p className="text-xs leading-relaxed opacity-75 max-w-sm">
            {dict.tagline}
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-sand-50/20 flex items-center justify-center hover:bg-sage-500 hover:border-sage-500 hover:text-white transition-premium"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Studio Links */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">{dict.studio}</h4>
          <ul className="space-y-2.5 text-xs">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sage-200 transition-premium">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Classes */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">{dict.program}</h4>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>Reformer Pilates</li>
            <li>Hatha Yoga</li>
            <li>{dict.private_sessions}</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">{dict.contact}</h4>
          <ul className="space-y-3 text-xs opacity-75">
            <li>
              <a
                href={STUDIO_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                title={dict.open_in_maps}
                className="flex items-start hover:text-sage-200 transition-premium"
              >
                <MapPin className="w-4 h-4 mr-2.5 text-sage-200 shrink-0 mt-0.5" />
                <span>{STUDIO_ADDRESS}</span>
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2.5 text-sage-200 shrink-0" />
              <a href={STUDIO_PHONE_HREF} className="hover:text-sage-200 transition-premium whitespace-nowrap">
                {STUDIO_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2.5 text-sage-200 shrink-0" />
              <a href={`mailto:${STUDIO_EMAIL}`} className="hover:text-sage-200 transition-premium break-all">
                {STUDIO_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-sand-50/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 text-[10px] tracking-wider uppercase opacity-60">
        <p>
          © {currentYear} {dict.copyright}. {beforeBrand}
          <span className="normal-case">{BRAND_NAME}</span>
          {afterBrand}
        </p>
        <p>{dict.region}</p>
      </div>
    </footer>
  );
}
