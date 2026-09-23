'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Instagram, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TRAINERS } from '@/lib/trainers';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function TrainersPage(props: PageProps) {
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

  const trainerList = [
    {
      name: TRAINERS[0].name,
      specialties: ['Reformer Pilates', 'Duo Reformer', 'Mat Pilates', 'Core Stability'],
      bio_tr: 'Ümran, uzun yıllara dayanan stüdyo reformer pilates deneyimine sahiptir. Omurga sağlığı, duruş düzeltme ve çekirdek (core) gücü geliştirme konularında uzmanlaşmıştır.',
      bio_en: 'Ümran has years of studio reformer pilates experience. She specializes in spinal health, postural correction, and core strength development.',
      instagram: 'https://www.instagram.com/umransolmaz?igsh=a2wxMGgycTRydTQ0&utm_source=qr',
      badge: locale === 'tr' ? TRAINERS[0].role_tr : TRAINERS[0].role_en,
      image: '/umran.png',
    },
    {
      name: TRAINERS[1].name,
      specialties: ['Hatha Yoga', 'Raja Yoga', 'Pranayama', 'Meditation'],
      bio_tr: 'Meriç, Hatha Yoga ve geleneksel nefes teknikleri (Pranayama) alanında uzmanlaşmıştır. Nefes, hareket ve meditasyonu bir araya getirerek zihinsel odaklanma, içsel denge ve bütünsel iyi oluşu destekleyen seanslar düzenlemektedir.',
      bio_en: 'Meriç specializes in Hatha Yoga and traditional breathing techniques (Pranayama). He conducts sessions focusing on mental concentration and inner peace.',
      instagram: 'https://www.instagram.com/mericcaparoglu?igsh=MWdlb3BmcnZuYWF4eQ%3D%3D&utm_source=qr',
      badge: locale === 'tr' ? TRAINERS[1].role_tr : TRAINERS[1].role_en,
      image: '/meric.png',
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'EĞİTMEN KADROMUZ' : 'OUR TRAINERS'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {locale === 'tr' ? 'Uzman Ellerdesiniz' : 'You are in Expert Hands'}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {locale === 'tr'
            ? 'Alanında uluslararası sertifikalara sahip profesyonel eğitmenlerimiz, hedeflerinize en güvenli şekilde ulaşmanız için yanınızda.'
            : 'Our professional trainers with international certifications are with you to help you reach your goals in the safest way.'}
        </p>
      </div>

      {/* Grid of Trainers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 max-w-4xl mx-auto">
        {trainerList.map((trainer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-premium"
          >
            {/* Trainer Avatar Placeholder Card */}
            <div className="aspect-square bg-sand-200/50 flex flex-col items-center justify-center border-b border-sand-100 relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-charcoal-900 text-sand-50 text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
                {trainer.badge}
              </div>
              {trainer.image ? (
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <span className="text-2xl font-light text-charcoal-900 tracking-[0.2em] p-6">
                  {trainer.name.split(' ').map((n) => n[0]).join('')}
                </span>
              )}
            </div>

            {/* Trainer Info */}
            <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-charcoal-900">{trainer.name}</h2>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {trainer.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] uppercase tracking-wider font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-2.5 py-0.5 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                  {locale === 'tr' ? trainer.bio_tr : trainer.bio_en}
                </p>
              </div>

              <div className="pt-6 border-t border-sand-100 flex items-center justify-between">
                <a
                  href={trainer.instagram.startsWith('http') ? trainer.instagram : `https://instagram.com/${trainer.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-[10px] tracking-widest font-semibold uppercase text-charcoal-500 hover:text-sage-500 transition-premium"
                >
                  <Instagram className="w-4 h-4 mr-1.5" />
                  @{trainer.instagram.startsWith('http') 
                    ? (trainer.instagram.split('instagram.com/')[1] || '').split('?')[0]
                    : trainer.instagram}
                </a>

                <Link
                  href={`/${locale}/schedule`}
                  className="text-[10px] tracking-widest font-semibold uppercase text-sage-700 hover:text-charcoal-900 transition-premium flex items-center"
                >
                  {locale === 'tr' ? 'Seans Al' : 'Book'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
