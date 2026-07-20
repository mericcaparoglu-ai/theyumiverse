'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, MapPin, Instagram } from 'lucide-react';
import { getDictionary, Locale } from '@/lib/dictionary';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function HomePage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  
  // Dynamic state for dict loader
  const [dict, setDict] = useState<any>(null);

  // Load dict client-side since we are using 'use client' for premium animations
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


  const whyChooseUs = [
    {
      icon: <Sparkles className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Lüks & Premium Atmosfer' : 'Luxury & Premium Atmosphere',
      desc: locale === 'tr' 
        ? 'İskandinav minimalizmi ile tasarlanmış stüdyomuzda, kendinizi huzurun ve zarafetin içinde bulacaksınız.' 
        : 'In our studio designed with Scandinavian minimalism, you will find yourself in peace and elegance.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Kişiselleştirilmiş İlgi' : 'Personalized Attention',
      desc: locale === 'tr' 
        ? 'Maksimum 7 kişilik reformer seansları ile eğitmenlerimizin tüm dikkati sizin hareket formunuzda olur.' 
        : 'With reformer sessions of max 7 people, our trainers focus fully on your movement form.',
    },
    {
      icon: <Heart className="w-5 h-5 text-sage-500" />,
      title: locale === 'tr' ? 'Uzman Eğitmen Kadrosu' : 'Expert Training Staff',
      desc: locale === 'tr' 
        ? 'Sertifikalı ve wellness felsefesini benimsemiş profesyonel kadromuzla hedeflerinize güvenle ulaşın.' 
        : 'Safely reach your goals with our certified professional staff who embrace the wellness philosophy.',
    },
  ];

  const featuredClasses = [
    {
      title: locale === 'tr' ? 'Reformer Solo & Duo' : 'Reformer Solo & Duet',
      desc: locale === 'tr' ? 'Birebir veya düet seanslarla duruşunuzu düzeltin ve çekirdek gücünüzü artırın.' : 'Tailored solo and duet sessions to improve your posture and build core strength.',
      tag: locale === 'tr' ? 'Solo / Düet' : 'Solo / Duet',
      bg: 'bg-white',
    },
    {
      title: locale === 'tr' ? 'Reformer Grup (Maks 7)' : 'Reformer Group (Max 7)',
      desc: locale === 'tr' ? 'Maksimum 7 kişilik premium reformer grupları ile dinamik ve yüksek verimli antrenmanlar.' : 'Dynamic and high-energy workouts with premium reformer groups capping at max 7.',
      tag: locale === 'tr' ? 'Grup Dersi' : 'Group Class',
      bg: 'bg-sage-100/40',
    },
    {
      title: 'Hatha Yoga',
      desc: locale === 'tr' ? 'Nefes, duruş ve meditasyon ile zihinsel odaklanma ve içsel dengenizi sağlayın.' : 'Align body and mind through breath control, traditional postures, and meditation.',
      tag: locale === 'tr' ? 'Yoga' : 'Yoga',
      bg: 'bg-white',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-sand-100 to-sand-50 overflow-hidden px-6">
        {/* Soft decorative blur background circle */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-200/30 rounded-full filter blur-[80px] -z-10 animate-pulse" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/60 border border-sand-200 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-sage-500 animate-ping" />
            <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-700">
              {locale === 'tr' ? "Arsuz & İskenderun'un Premium Stüdyosu" : 'Arsuz & Iskenderun Premium Studio'}
            </span>
          </motion.div>

          {/* Large elegant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="title-display text-charcoal-900 flex flex-col items-center"
          >
            <span>{dict.hero.headline_1}</span>
            <span className="text-sage-500 italic">{dict.hero.headline_2}</span>
            <span>{dict.hero.headline_3}</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base text-charcoal-700 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {dict.hero.subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              href={`/${locale}/schedule`}
              className="w-full sm:w-auto bg-charcoal-900 hover:bg-sage-500 text-sand-50 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-premium shadow-lg shadow-charcoal-900/10 hover:shadow-sage-500/10"
            >
              {dict.hero.cta_book}
            </Link>
            <Link
              href={`/${locale}/classes`}
              className="w-full sm:w-auto bg-white/60 hover:bg-white border border-sand-200 text-charcoal-900 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold transition-premium"
            >
              {dict.hero.cta_explore}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. STUDIO INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="space-y-6">
            <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
              {locale === 'tr' ? 'STÜDYO HAKKINDA' : 'ABOUT THE STUDIO'}
            </span>
            <h2 className="text-3xl md:text-4xl text-charcoal-900 font-light leading-tight">
              {locale === 'tr' 
                ? 'Sadece bir stüdyo değil, bütünsel bir wellness yolculuğu.' 
                : 'Not just a studio, but a holistic wellness journey.'}
            </h2>
            <p className="text-sm leading-relaxed text-charcoal-700 font-light">
              {dict.about_page.story}
            </p>
            <div className="pt-4">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-sage-700 hover:text-charcoal-900 transition-premium"
              >
                {locale === 'tr' ? 'Hikayemizi Keşfedin' : 'Discover Our Story'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
          
          {/* Aesthetic Studio Image representing visual wellness */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden border border-sand-200 shadow-sm group">
            <img
              src="/studio-hero.png"
              alt="THEYUMIVERSE Studio"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-charcoal-900/10 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-sand-50">
                THEY<span className="text-sage-300 font-extrabold text-sm align-middle -mx-0.5">UM</span>IVERSE Studio
              </span>
              <p className="text-xs font-serif italic text-sand-100/90">
                {locale === 'tr' ? 'Huzurun modern tasarımla birleşimi' : 'Serenity meets modern design'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-sand-100/50 border-y border-sand-200/80 py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold">
              {locale === 'tr' ? 'AVANTAJLARIMIZ' : 'OUR ADVANTAGES'}
            </span>
            <h2 className="text-3xl text-charcoal-900 font-light">
              {locale === 'tr' ? 'Neden THEYUMIVERSE?' : 'Why THEYUMIVERSE?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-sand-200 p-8 rounded-3xl space-y-4 hover:shadow-md transition-premium"
              >
                <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-charcoal-900">{item.title}</h3>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CLASSES */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold">
              {locale === 'tr' ? 'EĞİTİMLER' : 'CLASSES'}
            </span>
            <h2 className="text-3xl text-charcoal-900 font-light">
              {locale === 'tr' ? 'Öne Çıkan Derslerimiz' : 'Featured Classes'}
            </h2>
          </div>
          <Link
            href={`/${locale}/classes`}
            className="text-xs uppercase tracking-widest font-semibold text-sage-700 hover:text-charcoal-900 transition-premium flex items-center"
          >
            {locale === 'tr' ? 'Tüm Dersleri İncele' : 'Explore All Classes'}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredClasses.map((item, idx) => (
            <div
              key={idx}
              className={`border border-sand-200 p-8 rounded-3xl space-y-6 flex flex-col justify-between h-80 hover:shadow-md transition-premium ${item.bg}`}
            >
              <div className="space-y-3">
                <span className="text-[9px] tracking-widest uppercase font-bold text-sage-700 bg-sage-50 border border-sage-100 px-3 py-1 rounded-full inline-block">
                  {item.tag}
                </span>
                <h3 className="text-xl font-light text-charcoal-900">{item.title}</h3>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">{item.desc}</p>
              </div>
              <div>
                <Link
                  href={`/${locale}/schedule`}
                  className="text-xs font-semibold text-charcoal-900 hover:text-sage-500 flex items-center gap-1 transition-premium"
                >
                  {locale === 'tr' ? 'Programı Gör' : 'View Schedule'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WEEKLY SCHEDULE PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold">
            {locale === 'tr' ? 'HAFTALIK TAKVİM' : 'WEEKLY TIMETABLE'}
          </span>
          <h2 className="text-3xl text-charcoal-900 font-light">
            {dict.schedule_page.title}
          </h2>
          <p className="text-xs opacity-75 max-w-md mx-auto">
            {dict.schedule_page.subtitle}
          </p>
        </div>

        {/* Timetable schedule grid with bookings */}
        <ScheduleGrid
          locale={locale}
          dict={dict}
          isAuthenticated={false}
        />
      </section>

      {/* 6. INSTAGRAM SOCIAL FEED */}
      <section className="bg-sand-100/30 border-y border-sand-200 py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <Instagram className="w-6 h-6 mx-auto text-sage-500" />
            <h2 className="text-xl tracking-widest uppercase font-light text-charcoal-950">
              @THEY<span className="text-sage-500 font-bold text-2xl align-middle -mx-0.5">UM</span>IVERSE
            </h2>
            <p className="text-xs opacity-75">
              {locale === 'tr' ? 'Bizi Instagram\'da takip edin, topluluğumuza katılın.' : 'Follow us on Instagram and join our wellness community.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { id: 1, img: '/post1.jpg', title: 'Stüdyomuzdan' },
              { id: 2, img: '/post2.jpg', title: 'ÜM Stüdyo Logo' },
              { id: 3, img: '/post3.jpg', title: 'Reformer Odası & Işıklandırma' },
            ].map((post) => (
              <div key={post.id} className="aspect-square bg-sand-200/60 rounded-3xl border border-sand-200/80 flex items-center justify-center group overflow-hidden relative shadow-sm">
                {post.img ? (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-[10px] tracking-widest text-charcoal-500 uppercase font-semibold">{post.title}</span>
                )}
                <div className="absolute inset-0 bg-charcoal-900/40 opacity-0 group-hover:opacity-100 transition-premium flex items-center justify-center z-10">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
