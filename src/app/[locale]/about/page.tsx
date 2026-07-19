'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Eye, Heart } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutPage(props: PageProps) {
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

  const values = [
    {
      icon: <Compass className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Bilinçli Hareket' : 'Mindful Movement',
      desc: locale === 'tr'
        ? 'Her seansı bedeninizin sınırlarına saygı duyarak, hizalanma prensiplerine uygun şekilde kurguluyoruz.'
        : 'We design every session respecting your body boundaries, in accordance with alignment principles.',
    },
    {
      icon: <Eye className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Bütünsel Wellness' : 'Holistic Wellness',
      desc: locale === 'tr'
        ? 'Sadece fiziksel egzersiz değil, zihinsel rahatlama, nefes farkındalığı ve ruhsal dinginliği de hedefliyoruz.'
        : 'We target not only physical exercise but also mental relaxation, breathing awareness, and spiritual peace.',
    },
    {
      icon: <Heart className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Samimi Topluluk' : 'Warm Community',
      desc: locale === 'tr'
        ? 'Herkesin kendini güvende ve evinde hissedeceği, destekleyici bir stüdyo topluluğu inşa ediyoruz.'
        : 'We build a supportive studio community where everyone feels safe and at home.',
    },
  ];

  return (
    <div className="py-16 md:py-24 space-y-24 md:space-y-32">
      {/* 1. HERO HEADER */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center bg-sage-50 border border-sage-100 px-4 py-1 rounded-full"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold text-sage-700">
            {locale === 'tr' ? 'HİKAYEMİZ' : 'OUR STORY'}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-light text-charcoal-900 tracking-tight"
        >
          {dict.about_page.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-charcoal-700 leading-relaxed max-w-2xl mx-auto font-light"
        >
          {dict.about_page.story}
        </motion.p>
      </section>

      {/* 2. VALUES */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-sand-200 p-8 rounded-3xl space-y-4 hover:shadow-sm transition-premium"
            >
              <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-base font-semibold text-charcoal-900">{val.title}</h3>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="bg-sand-100/50 border-y border-sand-200/80 py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4">
            <h2 className="text-xl uppercase tracking-widest font-light text-charcoal-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
              {dict.about_page.mission}
            </h2>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              {dict.about_page.mission_text}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl uppercase tracking-widest font-light text-charcoal-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
              {dict.about_page.vision}
            </h2>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              {dict.about_page.vision_text}
            </p>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE CTAs */}
      <section className="max-w-3xl mx-auto px-6 text-center space-y-8 pb-12">
        <h2 className="text-2xl font-light text-charcoal-900">
          {locale === 'tr' 
            ? 'Kendinize vakit ayırın. Akışa katılın.' 
            : 'Take time for yourself. Join the flow.'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/schedule`}
            className="bg-charcoal-900 hover:bg-sage-500 text-sand-50 text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full transition-premium"
          >
            {locale === 'tr' ? 'Ders Programını İncele' : 'Check Timetable'}
          </Link>
          <Link
            href={`/${locale}/trainers`}
            className="bg-white border border-sand-200 text-charcoal-900 text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded-full hover:bg-sand-100 transition-premium flex items-center justify-center"
          >
            {dict.nav.trainers}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
