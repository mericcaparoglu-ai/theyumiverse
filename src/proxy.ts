import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  
  if (acceptLanguage.toLowerCase().includes('en')) {
    return 'en';
  }
  return defaultLocale;
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
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // Return redirect response
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
