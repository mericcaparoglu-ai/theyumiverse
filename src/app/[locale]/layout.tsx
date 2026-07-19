import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { getDictionary, Locale } from '@/lib/dictionary';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import '@/app/globals.css';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const isTr = locale === 'tr';

  return {
    title: 'UM Pilates & Yoga | The Yumiverse',
    description: isTr
      ? 'UM Pilates ve Yoga deneyiminin dijital evreni: The Yumiverse. Arsuz ve İskenderun’da lüks, huzurlu ve premium wellness deneyimi.'
      : 'The digital universe of the UM Pilates & Yoga experience: The Yumiverse. Luxury, serene, and premium wellness experience in Arsuz and Iskenderun.',
    keywords: isTr
      ? ['Arsuz reformer pilates', 'İskenderun reformer pilates', 'Arsuz yoga', 'İskenderun yoga', 'Hatay pilates stüdyosu', 'wellness']
      : ['Arsuz reformer pilates', 'Iskenderun reformer pilates', 'Arsuz yoga', 'Iskenderun yoga', 'Hatay pilates studio', 'wellness'],
    alternates: {
      languages: {
        tr: '/tr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isTr ? 'tr_TR' : 'en_US',
      url: 'https://theyumiverse.com',
      siteName: 'THEYUMIVERSE',
      images: [
        {
          url: '/images/og-share.jpg',
          width: 1200,
          height: 630,
          alt: 'THEYUMIVERSE Premium Studio',
        },
      ],
    },
  };
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;
  const { children } = props;
  const locale = (params.locale as Locale) || 'tr';
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-charcoal-900">
        {/* Navigation Bar */}
        <Navbar locale={locale} dict={dict.nav} />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-[76px]">
          {children}
        </main>
        
        {/* Footer block */}
        <Footer locale={locale} dict={{ ...dict.nav, ...dict.contact_page }} />
      </body>
    </html>
  );
}
