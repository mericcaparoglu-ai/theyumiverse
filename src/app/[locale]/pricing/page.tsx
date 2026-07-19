'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Check, Calendar, MessageSquare, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function PricingPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);

  useState(() => {
    getDictionary(locale).then((data) => setDict(data));
  });

  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="w-6 h-6 border-2 border-sage-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const packages = [
    {
      title: locale === 'tr' ? 'Tek Seans' : 'Single Session',
      price: '500',
      period: locale === 'tr' ? 'Seanslık' : 'Per Session',
      sessions: 1,
      validity: locale === 'tr' ? '7 Gün Geçerli' : '7 Days Validity',
      features: [
        locale === 'tr' ? '1 Ders Reformer veya Yoga' : '1 Reformer or Yoga class',
        locale === 'tr' ? 'Eğitmen rehberliği' : 'Instructor guidance',
        locale === 'tr' ? '12 saat öncesine kadar ücretsiz iptal' : 'Free cancel up to 12h',
      ],
      popular: false,
      cta: locale === 'tr' ? 'Satın Al & İletişime Geç' : 'Buy & Get in Touch',
      href: `https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! Tek seans ders paketi satın almak ve rezervasyon yaptırmak istiyorum.' : 'Hello THEYUMIVERSE! I would like to get info and purchase the Single Session class.')}`,
    },
    {
      title: locale === 'tr' ? '8 Seans Reformer' : '8-Session Reformer',
      price: '3750',
      period: locale === 'tr' ? 'Paket' : 'Pack',
      sessions: 8,
      validity: locale === 'tr' ? '30 Gün Geçerli' : '30 Days Validity',
      features: [
        locale === 'tr' ? '8 Reformer Pilates Dersi' : '8 Reformer Pilates classes',
        locale === 'tr' ? 'Birebir / Özel rehberlik' : 'Private instructor guidance',
        locale === 'tr' ? 'Takvim entegrasyon desteği' : 'Calendar support',
        locale === 'tr' ? '12 saat öncesine kadar ücretsiz iptal' : 'Free cancel up to 12h',
      ],
      popular: true,
      cta: locale === 'tr' ? 'Satın Al & İletişime Geç' : 'Buy & Get in Touch',
      href: `https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! 8 seanslık Reformer paketiniz (3750₺) hakkında bilgi almak ve satın almak istiyorum.' : 'Hello THEYUMIVERSE! I would like to purchase the 8-Session Reformer pack (3750 TRY).')}`,
    },
    {
      title: locale === 'tr' ? '12 Seans Reformer' : '12-Session Reformer',
      price: '5500',
      period: locale === 'tr' ? 'Paket' : 'Pack',
      sessions: 12,
      validity: locale === 'tr' ? '30 Gün Geçerli' : '30 Days Validity',
      features: [
        locale === 'tr' ? '12 Reformer Pilates Dersi' : '12 Reformer Pilates classes',
        locale === 'tr' ? 'Birebir / Özel rehberlik' : 'Private instructor guidance',
        locale === 'tr' ? 'Takvim entegrasyon desteği' : 'Calendar support',
        locale === 'tr' ? '12 saat öncesine kadar ücretsiz iptal' : 'Free cancel up to 12h',
      ],
      popular: false,
      cta: locale === 'tr' ? 'Satın Al & İletişime Geç' : 'Buy & Get in Touch',
      href: `https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! 12 seanslık Reformer paketiniz (5500₺) hakkında bilgi almak ve satın almak istiyorum.' : 'Hello THEYUMIVERSE! I would like to purchase the 12-Session Reformer pack (5500 TRY).')}`,
    },
    {
      title: locale === 'tr' ? 'Solo Reformer (10 Ders)' : 'Solo Reformer (10 Sessions)',
      price: '15.000',
      period: locale === 'tr' ? 'Aylık' : 'Monthly',
      sessions: 10,
      validity: locale === 'tr' ? '30 Gün Geçerli' : '30 Days Validity',
      features: [
        locale === 'tr' ? '10 Solo Reformer Pilates Dersi' : '10 Solo Reformer Pilates classes',
        locale === 'tr' ? 'Kişiye özel birebir eğitmen rehberliği' : 'Private instructor guidance',
        locale === 'tr' ? 'Takvim entegrasyon desteği' : 'Calendar support',
        locale === 'tr' ? '12 saat öncesine kadar ücretsiz iptal' : 'Free cancel up to 12h',
      ],
      popular: false,
      cta: locale === 'tr' ? 'Satın Al & İletişime Geç' : 'Buy & Get in Touch',
      href: `https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! Aylık 10 derslik Solo Reformer paketiniz (15.000₺) hakkında bilgi almak ve satın almak istiyorum.' : 'Hello THEYUMIVERSE! I would like to purchase the Solo Reformer monthly 10-session pack (15,000 TRY).')}`,
    },
    {
      title: locale === 'tr' ? 'Duo Reformer (8 Seans)' : 'Duo Reformer (8 Sessions)',
      price: '15.000',
      period: locale === 'tr' ? 'Aylık' : 'Monthly',
      sessions: 8,
      validity: locale === 'tr' ? '30 Gün Geçerli' : '30 Days Validity',
      features: [
        locale === 'tr' ? '8 Duo Reformer Pilates Dersi (Düet)' : '8 Duo Reformer Pilates classes (Duet)',
        locale === 'tr' ? 'Eğitmen gözetiminde eşli antrenman' : 'Trainer supervised partner workout',
        locale === 'tr' ? 'Takvim entegrasyon desteği' : 'Calendar support',
        locale === 'tr' ? '12 saat öncesine kadar ücretsiz iptal' : 'Free cancel up to 12h',
      ],
      popular: false,
      cta: locale === 'tr' ? 'Satın Al & İletişime Geç' : 'Buy & Get in Touch',
      href: `https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! Aylık 8 seanslık Duo Reformer paketiniz (15.000₺) hakkında bilgi almak ve satın almak istiyorum.' : 'Hello THEYUMIVERSE! I would like to purchase the Duo Reformer monthly 8-session pack (15,000 TRY).')}`,
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'FİYATLANDIRMA' : 'PRICING'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.pricing_page.title}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {dict.pricing_page.subtitle}
        </p>
      </div>

      {/* Grid of Pricing Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 items-stretch justify-center">
        {packages.map((pkg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`border rounded-3xl p-8 flex flex-col justify-between relative transition-premium ${
              pkg.popular
                ? 'bg-white border-sage-500 shadow-xl shadow-sage-500/5 lg:scale-105 z-10'
                : 'bg-white border-sand-200 hover:shadow-md'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sage-500 text-white text-[9px] uppercase tracking-widest px-4 py-1 rounded-full font-bold">
                {locale === 'tr' ? 'EN POPÜLER' : 'MOST POPULAR'}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-charcoal-900">{pkg.title}</h3>
                <div className="flex items-baseline pt-4">
                  <span className="text-3xl font-light text-charcoal-900">{pkg.price}</span>
                  <span className="text-sm text-charcoal-500 ml-1">TRY</span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-400 ml-2">
                    / {pkg.period}
                  </span>
                </div>
                <div className="flex items-center text-[10px] text-sage-600 font-medium pt-1.5">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {pkg.validity}
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-charcoal-700 pt-4 border-t border-sand-100">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <Check className="w-4 h-4 mr-2.5 text-sage-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <a
                href={pkg.href}
                target="_blank"
                rel="noreferrer"
                className={`w-full text-center block text-xs uppercase tracking-widest font-semibold py-3.5 rounded-full transition-premium cursor-pointer ${
                  pkg.popular
                    ? 'bg-charcoal-900 text-white hover:bg-sage-500 shadow-md shadow-charcoal-900/10'
                    : 'bg-sand-100 hover:bg-charcoal-900 hover:text-white text-charcoal-900'
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Explanations Section */}
      <section className="bg-sand-100/40 p-8 md:p-12 rounded-3xl border border-sand-200/80 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 mt-16">
        <div className="space-y-2">
          <Award className="w-6 h-6 text-sage-500" />
          <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900">
            {locale === 'tr' ? 'Kişiselleştirilmiş Program' : 'Customized Program'}
          </h4>
          <p className="text-[11px] text-charcoal-600 leading-relaxed font-light">
            {locale === 'tr'
              ? 'Kendi hedeflerinize ve takviminize uygun özel seans programınızı eğitmenlerimizle birlikte oluşturun.'
              : 'Build your custom class schedule tailored to your personal goals and calendar directly with our trainers.'}
          </p>
        </div>

        <div className="space-y-2">
          <MessageSquare className="w-6 h-6 text-sage-500" />
          <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900">
            {locale === 'tr' ? 'WhatsApp Hızlı İletişim' : 'Quick WhatsApp Support'}
          </h4>
          <p className="text-[11px] text-charcoal-600 leading-relaxed font-light">
            {locale === 'tr'
              ? 'Rezervasyon, üyelik satın alımı ve seans detayları hakkında WhatsApp üzerinden anında stüdyomuzla iletişim kurun.'
              : 'Instantly contact our studio via WhatsApp regarding bookings, membership purchases, and class info.'}
          </p>
        </div>

        <div className="space-y-2">
          <Calendar className="w-6 h-6 text-sage-500" />
          <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal-900">
            {locale === 'tr' ? 'Premium Stüdyo Konforu' : 'Premium Studio Comfort'}
          </h4>
          <p className="text-[11px] text-charcoal-600 leading-relaxed font-light">
            {locale === 'tr'
              ? 'Lüks, minimal İskandinav tarzı stüdyomuzda en kaliteli reformer ekipmanları eşliğinde seansların tadını çıkarın.'
              : 'Enjoy your private reformer and yoga sessions in our luxury Scandinavian studio with premium equipment.'}
          </p>
        </div>
      </section>
    </div>
  );
}
