import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, hasLocale, locales, LOCALE_COOKIE, type Locale } from '@/lib/dictionary';

function getLocale(request: NextRequest): Locale {
  // 1. An explicit choice made via the language switcher wins
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (hasLocale(cookieLocale)) return cookieLocale;

  // 2. Otherwise use the highest-weighted supported language from Accept-Language.
  // (A plain `includes('en')` would send e.g. "tr-TR,tr;q=0.9,en;q=0.8" to /en.)
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.split('-')[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find(({ lang }) => hasLocale(lang));

  return (preferred?.lang as Locale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude public static files and api routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') // Matches files like .png, .jpg, robots.txt, sitemap.xml
  ) {
    return NextResponse.next();
  }

  // 2. Check if the pathname has an active locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 3. Redirect if there is no locale prefix
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  // Return redirect response
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
