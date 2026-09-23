import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, locales } from '@/lib/dictionary';
import { getWhatsappUrl } from '@/lib/studio';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import WhatsappIcon from '@/components/icons/WhatsappIcon';
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
  if (!hasLocale(params.locale)) notFound();
  const locale = params.locale;
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
        <Footer locale={locale} dict={{ ...dict.nav, ...dict.footer }} />

        {/* Floating WhatsApp Quick Contact Button */}
        <a
          href={getWhatsappUrl(dict.hero.whatsapp_message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.hero.cta_whatsapp}
          className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2.5 group border-2 border-white/20"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <WhatsappIcon className="w-6 h-6 relative z-10" />
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-semibold uppercase tracking-wider pr-1">
            {locale === 'tr' ? 'Hızlı İletişim' : 'WhatsApp Contact'}
          </span>
        </a>
      </body>
    </html>
  );
}
