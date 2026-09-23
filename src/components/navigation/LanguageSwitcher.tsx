'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { localizePath, LOCALE_COOKIE, type Locale } from '@/lib/dictionary';

interface LanguageSwitcherProps {
  locale: Locale;
  onNavigate?: () => void;
}

export default function LanguageSwitcher({ locale, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;
  const nextLocale: Locale = locale === 'tr' ? 'en' : 'tr';

  return (
    <Link
      href={localizePath(pathname, nextLocale)}
      hrefLang={nextLocale}
      lang={nextLocale}
      aria-label={nextLocale === 'en' ? 'Switch to English' : 'Türkçeye geç'}
      onClick={() => {
        // Remember the explicit choice so the proxy redirects "/" to it next time
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
        onNavigate?.();
      }}
      className="flex items-center text-xs tracking-wider uppercase font-medium text-charcoal-900 opacity-70 hover:opacity-100 transition-premium"
    >
      <Globe className="w-3.5 h-3.5 mr-1" />
      {nextLocale.toUpperCase()}
    </Link>
  );
}
