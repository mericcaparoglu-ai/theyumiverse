'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function FAQPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);
  
  // Accordion active index
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const faqItems = [
    {
      q_tr: 'Reformer pilatese yeni başlayanlar katılabilir mi?',
      q_en: 'Can beginners join reformer pilates?',
      a_tr: 'Evet, kesinlikle! Reformer pilates seanslarımız kişiye özel (Solo) veya düet (Duo) olarak tasarlandığı için eğitmenimiz programı tamamen sizin seviyenize göre ayarlar. Daha önce hiç pilates yapmamış olmanız bir engel değildir.',
      a_en: 'Yes, absolutely! Since our reformer sessions are designed as private (Solo) or duet (Duo), our instructors customize the routine completely to your fitness levels. No prior experience is required.',
    },
    {
      q_tr: 'Ders rezervasyonumu nasıl ve ne zamana kadar iptal edebilirim?',
      q_en: 'How and when can I cancel my reservation?',
      a_tr: 'Ders rezervasyonlarınızı, seans saatinden en geç 12 saat öncesine kadar kişisel panelinizden veya WhatsApp hattımız üzerinden ücretsiz olarak iptal edebilirsiniz. 12 saatten kısa süre kalan iptallerde ders krediniz düşülmektedir.',
      a_en: 'You can cancel bookings free of charge from your dashboard or WhatsApp up to 12 hours before the class. Cancellations within the 12-hour window will result in the loss of that class credit.',
    },
    {
      q_tr: 'Haftada kaç gün reformer pilates veya yoga yapmalıyım?',
      q_en: 'How many days a week should I practice reformer or yoga?',
      a_tr: 'Vücudunuzun gelişimini görmek ve hareket formunuzu korumak için haftada en az 2 gün düzenli katılım tavsiye edilir. Daha ileri seviye gelişim hedefleri için bu sayı haftada 3 veya 4 güne çıkarılabilir.',
      a_en: 'We recommend attending at least 2 days a week to maintain your form and see optimal body development. For advanced targets, this can be increased to 3 or 4 days a week.',
    },
    {
      q_tr: 'Ders paketlerinin geçerlilik süresi var mı?',
      q_en: 'Do class packages have an expiration date?',
      a_tr: 'Evet, stüdyomuzdaki ders paketlerinin belirli süreleri bulunmaktadır. Örneğin; 8 seanslık reformer paketimiz satın alma tarihinden itibaren 30 gün boyunca geçerlidir. Süresi dolan paketlerdeki kalan dersler devredilmez.',
      a_en: 'Yes, packages have expiration limits to encourage consistency. For example, our 8-Session Reformer Pack is valid for 30 days from the purchase date. Unused expired credits do not roll over.',
    },
    {
      q_tr: 'Stüdyonuza gelmeden önce rezervasyon yaptırmak zorunlu mu?',
      q_en: 'Is booking mandatory before visiting the studio?',
      a_tr: 'Evet. Derslerimizin kalitesini ve eğitmenlerimizin kişiye özel ilgisini korumak adına tüm seanslarımız randevu sistemiyle çalışmaktadır. Program sayfamızdan dersinizi seçip rezervasyon oluşturabilirsiniz.',
      a_en: 'Yes. To maintain specialized attention and class qualities, all sessions operate strictly on booking appointments. You can choose a slot and book on our schedule page.',
    },
  ];

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'SIKÇA SORULAN SORULAR' : 'FAQ'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.nav.faq}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {locale === 'tr'
            ? 'Stüdyomuz, derslerimiz, paketlerimiz ve iptal politikalarımız hakkında merak edilenlerin yanıtları.'
            : 'Find answers about our reformer pilates & yoga classes, credits, and cancellation policies.'}
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 pt-6">
        {faqItems.map((item, idx) => {
          const isOpen = activeIndex === idx;
          const question = locale === 'tr' ? item.q_tr : item.q_en;
          const answer = locale === 'tr' ? item.a_tr : item.a_en;

          return (
            <div
              key={idx}
              className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-premium"
            >
              {/* Trigger header */}
              <button
                onClick={() => setActiveIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3 text-charcoal-900">
                  <HelpCircle className="w-5 h-5 text-sage-500 shrink-0" />
                  <span className="text-sm font-semibold leading-tight">{question}</span>
                </div>
                <div className="shrink-0 text-charcoal-500 bg-sand-50 w-7 h-7 rounded-full flex items-center justify-center border border-sand-200">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 text-xs text-charcoal-700 leading-relaxed font-light border-t border-sand-100/50">
                      {answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
