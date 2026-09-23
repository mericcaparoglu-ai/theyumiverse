'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Clock, Tag, Gauge, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ClassesPage(props: PageProps) {
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

  const classList = [
    {
      title_tr: 'Reformer Grup (Maks. 7 Kişi)',
      title_en: 'Reformer Group (Max. 7)',
      slug: 'reformer-grup',
      duration: 50,
      level_tr: 'Her Seviye',
      level_en: 'All Levels',
      category: 'reformer_pilates',
      desc_tr: 'Maksimum 7 kişiyle, stüdyomuzdaki 7 adet premium reformer aletimiz eşliğinde yapılan grup dersleri. Eğitmen gözetiminde, hem dinamik hem de motive edici bir topluluk antrenmanı sunar.',
      desc_en: 'Group classes for a maximum of 7 people, conducted with our 7 premium reformer equipment. Offers a dynamic and motivating community workout under trainer supervision.',
    },
    {
      title_tr: 'Reformer Solo (Özel Ders)',
      title_en: 'Reformer Solo (Private)',
      slug: 'reformer-solo',
      duration: 50,
      level_tr: 'Her Seviye',
      level_en: 'All Levels',
      category: 'reformer_pilates',
      desc_tr: 'Birebir eğitmen eşliğinde, vücut yapınıza ve hedeflerinize özel olarak tasarlanan reformer pilates seansı. Omurga sağlığı, esneklik ve çekirdek gücü için en etkili seçenektir.',
      desc_en: 'One-on-one reformer pilates session tailored to your body type and fitness goals. The most effective option for spinal health, flexibility, and core strength.',
    },
    {
      title_tr: 'Reformer Duo (İkili Ders)',
      title_en: 'Reformer Duo (Semi-Private)',
      slug: 'reformer-duo',
      duration: 50,
      level_tr: 'Orta Seviye',
      level_en: 'Intermediate',
      category: 'reformer_pilates',
      desc_tr: 'Arkadaşınız veya eşinizle birlikte, eğitmen gözetiminde gerçekleştireceğiniz 2 kişilik ikili reformer seansı. Hem motive edici hem de yüksek verimli bir antrenman deneyimi sunar.',
      desc_en: 'A semi-private reformer session for 2 people with trainer supervision. Offers a motivating and highly productive workout experience with a friend or partner.',
    },
    {
      title_tr: 'Hatha Yoga',
      title_en: 'Hatha Yoga',
      slug: 'hatha-yoga',
      duration: 60,
      level_tr: 'Her Seviye',
      level_en: 'All Levels',
      category: 'yoga',
      desc_tr: 'Geleneksel Hatha Yoga duruşları, nefes çalışmaları (Pranayama) ve meditasyonun bir araya geldiği, bedeni dengeleyen ve zihni sakinleştiren bütünsel bir pratik.',
      desc_en: 'A traditional practice combining Hatha Yoga postures, breathing exercises (Pranayama), and meditation to balance the body and calm the mind.',
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'STÜDYO DERSLERİMİZ' : 'STUDIO CLASSES'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {locale === 'tr' ? 'Bedeninize Değer Katın' : 'Add Value to Your Body'}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {locale === 'tr'
            ? 'Kendinize en uygun ders kategorisini seçin. Reformer Pilates ve Yoga ile hareket kalitenizi bir üst seviyeye taşıyın.'
            : 'Select the class category that fits you best. Take your movement quality to the next level with Reformer Pilates and Yoga.'}
        </p>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {classList.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-sand-200 p-6 sm:p-8 rounded-3xl space-y-6 min-w-0 flex flex-col justify-between hover:shadow-md transition-premium"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-3 py-1 rounded-full flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {item.category === 'yoga' ? 'Yoga' : 'Reformer Pilates'}
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-charcoal-500 bg-sand-100 border border-sand-200 px-3 py-1 rounded-full flex items-center">
                  <Gauge className="w-3 h-3 mr-1" />
                  {locale === 'tr' ? item.level_tr : item.level_en}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-light text-charcoal-900 leading-snug break-words hyphens-auto">
                {locale === 'tr' ? item.title_tr : item.title_en}
              </h2>
              
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                {locale === 'tr' ? item.desc_tr : item.desc_en}
              </p>
            </div>

            <div className="pt-4 border-t border-sand-100 flex justify-between items-center text-xs">
              <span className="flex items-center text-charcoal-500">
                <Clock className="w-4 h-4 mr-1 text-sage-500" />
                {item.duration} {dict.common?.minutes || 'dk'}
              </span>
              <Link
                href={`/${locale}/schedule`}
                className="text-sage-700 hover:text-charcoal-900 font-semibold uppercase tracking-widest flex items-center"
              >
                {locale === 'tr' ? 'Ders Seç' : 'Book Session'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
