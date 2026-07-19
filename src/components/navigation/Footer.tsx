'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

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
    address: string;
  };
}

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: `/${locale}/about`, label: dict.about },
    { href: `/${locale}/classes`, label: dict.classes },
    { href: `/${locale}/schedule`, label: dict.schedule },
    { href: `/${locale}/pricing`, label: dict.pricing },
  ];

  const supportLinks = [
    { href: `/${locale}/faq`, label: dict.faq },
    { href: `/${locale}/contact`, label: dict.contact },
    { href: `/${locale}/privacy`, label: locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy' },
    { href: `/${locale}/terms`, label: locale === 'tr' ? 'Kullanım Şartları' : 'Terms & Conditions' },
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
            <span className="text-[7.5px] tracking-[0.45em] uppercase font-light text-sand-50/60 mt-1 transition-premium group-hover:text-sand-50/80">
              The Yumiverse
            </span>
          </Link>
          <p className="text-xs leading-relaxed opacity-75 max-w-sm">
            {locale === 'tr'
              ? 'Arsuz ve İskenderun bölgesinde Reformer Pilates ve Yoga eğitimlerini lüks, doğayla uyumlu ve dingin bir stüdyo ortamında deneyimleyin.'
              : 'Experience Reformer Pilates and Yoga classes in a luxury, nature-connected and serene studio environment in Arsuz and Iskenderun.'}
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
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">Stüdyo</h4>
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
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">Program</h4>
          <ul className="space-y-2.5 text-xs opacity-75">
            <li>Reformer Pilates</li>
            <li>Hatha Yoga</li>
            <li>Özel Seanslar</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white font-medium">İletişim</h4>
          <ul className="space-y-3 text-xs opacity-75">
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-2.5 text-sage-200 shrink-0 mt-0.5" />
              <span>Hacı Bektaş-ı Veli Caddesi No: 32/A Hatay Arsuz</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2.5 text-sage-200 shrink-0" />
              <a href="tel:05340245160" className="hover:text-sage-200 transition-premium">05340245160</a>
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2.5 text-sage-200 shrink-0" />
              <a href="mailto:umpilatesyogastudyo@gmail.com" className="hover:text-sage-200 transition-premium">
                umpilatesyogastudyo@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-sand-50/10 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider uppercase opacity-60 space-y-4 sm:space-y-0">
        <p>© {currentYear} UM Pilates ve Yoga Studio. Powered by The Yumiverse</p>
        <p>
          {locale === 'tr'
            ? 'Arsuz & İskenderun Pilates ve Yoga Stüdyosu'
            : 'Arsuz & Iskenderun Pilates & Yoga Studio'}
        </p>
      </div>
    </footer>
  );
}
