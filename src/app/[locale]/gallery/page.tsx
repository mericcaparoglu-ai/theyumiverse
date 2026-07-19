'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Camera, Heart, Eye } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function GalleryPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);
  
  const [filter, setFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

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

  const photos = [
    { id: 1, category: 'studio', label_tr: 'Reformer Odası - Modern Tasarım', label_en: 'Reformer Studio - Modern Design', img: '/post1.jpg' },
    { id: 2, category: 'studio', label_tr: 'ÜM Stüdyo Amblemi', label_en: 'ÜM Studio Emblem', img: '/post2.jpg' },
    { id: 3, category: 'studio', label_tr: 'Reformer Odası & Işıklandırma', label_en: 'Reformer Studio & Ambient Lighting', img: '/post3.jpg' },
    { id: 4, category: 'classes', label_tr: 'Ümran Çaparoğlu ile Reformer Seansı', label_en: 'Reformer Session with Ümran Çaparoğlu', img: null },
    { id: 5, category: 'classes', label_tr: 'Meriç Çaparoğlu ile Hatha Yoga', label_en: 'Hatha Yoga with Meriç Çaparoğlu', img: null },
    { id: 6, category: 'events', label_tr: 'Açılış Etkinliği - Wellness Kahvaltısı', label_en: 'Opening Event - Wellness Breakfast', img: null },
  ];

  const filteredPhotos = filter === 'all' ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'STÜDYO GALERİSİ' : 'STUDIO GALLERY'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.nav.gallery}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {locale === 'tr'
            ? 'THEYUMIVERSE wellness stüdyosunun modern tasarımlı alanlarını ve ders karelerini inceleyin.'
            : 'Explore the modern design spaces and session moments of THEYUMIVERSE wellness studio.'}
        </p>
      </div>

      {/* Filter Menu */}
      <div className="flex justify-center gap-3 bg-white/40 p-3 rounded-full border border-sand-200 backdrop-blur-md max-w-md mx-auto">
        {['all', 'studio', 'classes', 'events'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[10px] uppercase tracking-widest font-semibold px-4 py-2 rounded-full transition-premium cursor-pointer ${
              filter === cat
                ? 'bg-charcoal-900 text-white shadow-sm'
                : 'text-charcoal-700 hover:bg-sand-100'
            }`}
          >
            {cat === 'all' ? (locale === 'tr' ? 'Tümü' : 'All') : (cat === 'studio' ? (locale === 'tr' ? 'Stüdyo' : 'Studio') : (cat === 'classes' ? (locale === 'tr' ? 'Dersler' : 'Classes') : (locale === 'tr' ? 'Etkinlikler' : 'Events')))}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="aspect-square bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm relative group cursor-pointer"
              onClick={() => setActivePhoto(photo)}
            >
              {/* Photo placeholder or uploaded image */}
              {photo.img ? (
                <img
                  src={photo.img}
                  alt={locale === 'tr' ? photo.label_tr : photo.label_en}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-sage-200/20 to-transparent flex flex-col items-center justify-center p-6 transition-premium group-hover:scale-105">
                  <ImageIcon className="w-8 h-8 text-sage-500/80 mb-2" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-charcoal-500">
                    {photo.category}
                  </span>
                </div>
              )}

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-premium flex flex-col justify-end p-6 z-10">
                <span className="text-white text-xs font-semibold leading-tight">
                  {locale === 'tr' ? photo.label_tr : photo.label_en}
                </span>
                <span className="text-sage-200 text-[10px] uppercase tracking-widest font-semibold flex items-center pt-2 gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {locale === 'tr' ? 'Görüntüle' : 'View'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-charcoal-900/80 backdrop-blur-sm"
            />

            {/* Lightbox card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-sand-50 rounded-3xl overflow-hidden border border-sand-200 shadow-2xl p-6 space-y-4 z-10"
            >
              {/* Lightbox Header */}
              <div className="flex justify-between items-center border-b border-sand-200 pb-3">
                <span className="text-[9px] uppercase tracking-widest text-sage-600 font-bold bg-sage-50 border border-sage-100 px-3 py-1 rounded-full">
                  {activePhoto.category}
                </span>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="text-xs text-charcoal-500 hover:text-charcoal-900 uppercase font-semibold cursor-pointer"
                >
                  {locale === 'tr' ? 'Kapat' : 'Close'}
                </button>
              </div>

              {/* Large Image or Placeholder */}
              <div className="aspect-16/9 bg-white rounded-2xl flex flex-col items-center justify-center border border-sand-200 relative overflow-hidden">
                {activePhoto.img ? (
                  <img
                    src={activePhoto.img}
                    alt={locale === 'tr' ? activePhoto.label_tr : activePhoto.label_en}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-200/10 to-transparent" />
                    <Camera className="w-12 h-12 text-sage-500/60 mb-2" />
                    <p className="text-xs italic text-charcoal-500">{locale === 'tr' ? 'Görsel Yükleniyor...' : 'Loading Image...'}</p>
                  </>
                )}
              </div>

              {/* Caption */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-charcoal-900">
                  {locale === 'tr' ? activePhoto.label_tr : activePhoto.label_en}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
