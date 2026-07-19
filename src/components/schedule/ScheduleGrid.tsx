'use client';

import { useState, useMemo } from 'react';
import { Calendar, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleGridProps {
  locale: 'tr' | 'en';
  dict: any;
  onBookClass?: (scheduleId: string) => void;
  isAuthenticated: boolean;
}

// Structured Mock Data for premium display
const MOCK_TRAINERS = [
  { id: 't1', name: 'Ümran Çaparoğlu', slug: 'umran-caparoglu' },
];

const MOCK_CLASS_TYPES = [
  { id: 'c6', name_tr: 'Reformer Grup (Maks 7 Kişi)', name_en: 'Reformer Group (Max 7)', category: 'reformer_pilates', level: 'all_levels', duration: 50 },
  { id: 'c1', name_tr: 'Reformer Solo (Özel)', name_en: 'Reformer Solo (Private)', category: 'reformer_pilates', level: 'all_levels', duration: 50 },
  { id: 'c2', name_tr: 'Reformer Duo (Düet)', name_en: 'Reformer Duo (Duet)', category: 'reformer_pilates', level: 'intermediate', duration: 50 },
  { id: 'c3', name_tr: 'Vinyasa Flow Yoga', name_en: 'Vinyasa Flow Yoga', category: 'yoga', level: 'all_levels', duration: 60 },
  { id: 'c4', name_tr: 'Yin Yoga & Ses Çanakları', name_en: 'Yin Yoga & Sound Healing', category: 'yoga', level: 'beginner', duration: 75 },
  { id: 'c5', name_tr: 'Core Reformer', name_en: 'Core Reformer', category: 'reformer_pilates', level: 'advanced', duration: 50 },
];

const MOCK_SCHEDULE = [
  // Pazartesi / Monday
  { id: 's101', class_id: 'c1', trainer_id: 't1', day: 1, time: '09:00', capacity: 1, booked: 0 },
  { id: 's102', class_id: 'c6', trainer_id: 't1', day: 1, time: '10:00', capacity: 7, booked: 0 },
  { id: 's103', class_id: 'c2', trainer_id: 't1', day: 1, time: '11:00', capacity: 2, booked: 0 },
  { id: 's104', class_id: 'c1', trainer_id: 't1', day: 1, time: '12:00', capacity: 1, booked: 0 },
  { id: 's105', class_id: 'c1', trainer_id: 't1', day: 1, time: '16:30', capacity: 1, booked: 0 },
  { id: 's106', class_id: 'c6', trainer_id: 't1', day: 1, time: '17:30', capacity: 7, booked: 0 },
  { id: 's107', class_id: 'c2', trainer_id: 't1', day: 1, time: '18:30', capacity: 2, booked: 0 },
  { id: 's108', class_id: 'c5', trainer_id: 't1', day: 1, time: '19:30', capacity: 7, booked: 0 },
  { id: 's109', class_id: 'c1', trainer_id: 't1', day: 1, time: '20:10', capacity: 1, booked: 0 },

  // Salı / Tuesday
  { id: 's201', class_id: 'c6', trainer_id: 't1', day: 2, time: '09:00', capacity: 7, booked: 0 },
  { id: 's202', class_id: 'c1', trainer_id: 't1', day: 2, time: '10:00', capacity: 1, booked: 0 },
  { id: 's203', class_id: 'c5', trainer_id: 't1', day: 2, time: '11:00', capacity: 7, booked: 0 },
  { id: 's204', class_id: 'c2', trainer_id: 't1', day: 2, time: '12:00', capacity: 2, booked: 0 },
  { id: 's205', class_id: 'c2', trainer_id: 't1', day: 2, time: '16:30', capacity: 2, booked: 0 },
  { id: 's206', class_id: 'c1', trainer_id: 't1', day: 2, time: '17:30', capacity: 1, booked: 0 },
  { id: 's207', class_id: 'c6', trainer_id: 't1', day: 2, time: '18:30', capacity: 7, booked: 0 },
  { id: 's208', class_id: 'c1', trainer_id: 't1', day: 2, time: '19:30', capacity: 1, booked: 0 },
  { id: 's209', class_id: 'c6', trainer_id: 't1', day: 2, time: '20:10', capacity: 7, booked: 0 },

  // Çarşamba / Wednesday
  { id: 's301', class_id: 'c1', trainer_id: 't1', day: 3, time: '09:00', capacity: 1, booked: 0 },
  { id: 's302', class_id: 'c6', trainer_id: 't1', day: 3, time: '10:00', capacity: 7, booked: 0 },
  { id: 's303', class_id: 'c2', trainer_id: 't1', day: 3, time: '11:00', capacity: 2, booked: 0 },
  { id: 's304', class_id: 'c1', trainer_id: 't1', day: 3, time: '12:00', capacity: 1, booked: 0 },
  { id: 's305', class_id: 'c1', trainer_id: 't1', day: 3, time: '16:30', capacity: 1, booked: 0 },
  { id: 's306', class_id: 'c6', trainer_id: 't1', day: 3, time: '17:30', capacity: 7, booked: 0 },
  { id: 's307', class_id: 'c2', trainer_id: 't1', day: 3, time: '18:30', capacity: 2, booked: 0 },
  { id: 's308', class_id: 'c5', trainer_id: 't1', day: 3, time: '19:30', capacity: 7, booked: 0 },
  { id: 's309', class_id: 'c1', trainer_id: 't1', day: 3, time: '20:10', capacity: 1, booked: 0 },

  // Perşembe / Thursday
  { id: 's401', class_id: 'c6', trainer_id: 't1', day: 4, time: '09:00', capacity: 7, booked: 0 },
  { id: 's402', class_id: 'c1', trainer_id: 't1', day: 4, time: '10:00', capacity: 1, booked: 0 },
  { id: 's403', class_id: 'c5', trainer_id: 't1', day: 4, time: '11:00', capacity: 7, booked: 0 },
  { id: 's404', class_id: 'c2', trainer_id: 't1', day: 4, time: '12:00', capacity: 2, booked: 0 },
  { id: 's405', class_id: 'c2', trainer_id: 't1', day: 4, time: '16:30', capacity: 2, booked: 0 },
  { id: 's406', class_id: 'c1', trainer_id: 't1', day: 4, time: '17:30', capacity: 1, booked: 0 },
  { id: 's407', class_id: 'c6', trainer_id: 't1', day: 4, time: '18:30', capacity: 7, booked: 0 },
  { id: 's408', class_id: 'c1', trainer_id: 't1', day: 4, time: '19:30', capacity: 1, booked: 0 },
  { id: 's409', class_id: 'c6', trainer_id: 't1', day: 4, time: '20:10', capacity: 7, booked: 0 },

  // Cuma / Friday
  { id: 's501', class_id: 'c1', trainer_id: 't1', day: 5, time: '09:00', capacity: 1, booked: 0 },
  { id: 's502', class_id: 'c6', trainer_id: 't1', day: 5, time: '10:00', capacity: 7, booked: 0 },
  { id: 's503', class_id: 'c2', trainer_id: 't1', day: 5, time: '11:00', capacity: 2, booked: 0 },
  { id: 's504', class_id: 'c1', trainer_id: 't1', day: 5, time: '12:00', capacity: 1, booked: 0 },
  { id: 's505', class_id: 'c1', trainer_id: 't1', day: 5, time: '16:30', capacity: 1, booked: 0 },
  { id: 's506', class_id: 'c6', trainer_id: 't1', day: 5, time: '17:30', capacity: 7, booked: 0 },
  { id: 's507', class_id: 'c2', trainer_id: 't1', day: 5, time: '18:30', capacity: 2, booked: 0 },
  { id: 's508', class_id: 'c5', trainer_id: 't1', day: 5, time: '19:30', capacity: 7, booked: 0 },
  { id: 's509', class_id: 'c1', trainer_id: 't1', day: 5, time: '20:10', capacity: 1, booked: 0 },
];

const DAYS_OF_WEEK_TR = [
  { id: 1, name: 'Pazartesi' },
  { id: 2, name: 'Salı' },
  { id: 3, name: 'Çarşamba' },
  { id: 4, name: 'Perşembe' },
  { id: 5, name: 'Cuma' },
  { id: 6, name: 'Cumartesi' },
  { id: 7, name: 'Pazar' },
];

const DAYS_OF_WEEK_EN = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 7, name: 'Sunday' },
];

export default function ScheduleGrid({
  locale,
  dict,
  onBookClass,
  isAuthenticated,
}: ScheduleGridProps) {
  const days = locale === 'tr' ? DAYS_OF_WEEK_TR : DAYS_OF_WEEK_EN;

  // Filters State
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // Mobile Day Selector State
  const [activeDayMobile, setActiveDayMobile] = useState(1);

  // Filtered Sessions
  const filteredSchedule = useMemo(() => {
    return MOCK_SCHEDULE.map((item) => {
      const classInfo = MOCK_CLASS_TYPES.find((c) => c.id === item.class_id);
      const trainerInfo = MOCK_TRAINERS.find((t) => t.id === item.trainer_id);
      return {
        ...item,
        classInfo,
        trainerInfo,
      };
    }).filter((item) => {
      if (selectedTrainer !== 'all' && item.trainer_id !== selectedTrainer) return false;
      if (selectedCategory !== 'all' && item.classInfo?.category !== selectedCategory) return false;
      if (selectedLevel !== 'all' && item.classInfo?.level !== selectedLevel) return false;
      return true;
    });
  }, [selectedTrainer, selectedCategory, selectedLevel]);

  // Group Schedule by day for desktop
  const scheduleByDay = useMemo(() => {
    const grouped: { [key: number]: any[] } = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
    filteredSchedule.forEach((item) => {
      if (grouped[item.day]) {
        grouped[item.day].push(item);
      }
    });
    // Sort day items by time
    Object.keys(grouped).forEach((d) => {
      grouped[Number(d)].sort((a, b) => a.time.localeCompare(b.time));
    });
    return grouped;
  }, [filteredSchedule]);

  const getWhatsappUrl = (item: any) => {
    const classTitle = locale === 'tr' ? item.classInfo?.name_tr : item.classInfo?.name_en;
    const dayName = days.find((d) => d.id === item.day)?.name || '';
    const text = locale === 'tr'
      ? `Merhaba Üm Pilates Yoga Studio! ${dayName} günü saat ${item.time}'daki "${classTitle}" dersi için rezervasyon yaptırmak istiyorum.`
      : `Hello THEYUMIVERSE! I want to book a spot for the "${classTitle}" class on ${dayName} at ${item.time}.`;
    return `https://wa.me/905340245160?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Timetable Filter Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white/40 p-5 rounded-3xl border border-white/50 backdrop-blur-md">
        <div className="flex flex-wrap gap-4">
          {/* Trainer Filter */}
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
              {locale === 'tr' ? 'EĞİTMEN' : 'TRAINER'}
            </span>
            <select
              value={selectedTrainer}
              onChange={(e) => setSelectedTrainer(e.target.value)}
              className="text-xs tracking-wider uppercase font-medium bg-sand-50/80 border border-sand-200 rounded-full px-4 py-2.5 outline-none focus:border-sage-500 transition-premium cursor-pointer"
            >
              <option value="all">{dict.schedule_page?.filters?.all_trainers || 'All Trainers'}</option>
              {MOCK_TRAINERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class Category Filter */}
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
              {locale === 'tr' ? 'DERS TİPİ' : 'CLASS TYPE'}
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs tracking-wider uppercase font-medium bg-sand-50/80 border border-sand-200 rounded-full px-4 py-2.5 outline-none focus:border-sage-500 transition-premium cursor-pointer"
            >
              <option value="all">{dict.schedule_page?.filters?.all_classes || 'All Class Types'}</option>
              <option value="reformer_pilates">Reformer Pilates</option>
              <option value="yoga">Yoga</option>
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
              {locale === 'tr' ? 'SEVİYE' : 'LEVEL'}
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs tracking-wider uppercase font-medium bg-sand-50/80 border border-sand-200 rounded-full px-4 py-2.5 outline-none focus:border-sage-500 transition-premium cursor-pointer"
            >
              <option value="all">{dict.schedule_page?.filters?.all_levels || 'All Levels'}</option>
              <option value="beginner">{dict.common?.beginner || 'Beginner'}</option>
              <option value="intermediate">{dict.common?.intermediate || 'Intermediate'}</option>
              <option value="advanced">{dict.common?.advanced || 'Advanced'}</option>
              <option value="all_levels">{dict.common?.all_levels || 'All Levels'}</option>
            </select>
          </div>
        </div>

        {/* Clear Filters indicator */}
        {(selectedTrainer !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all') && (
          <button
            onClick={() => {
              setSelectedTrainer('all');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="text-[10px] tracking-widest uppercase text-sage-700 hover:text-sage-500 font-semibold transition-premium pt-4 lg:pt-0 cursor-pointer"
          >
            {locale === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
          </button>
        )}
      </div>

      {/* 2. Mobile Day Carousel (Visible on mobile, hidden on desktop) */}
      <div className="block lg:hidden overflow-x-auto pb-2 scrollbar-none">
        <div className="flex space-x-2">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDayMobile(day.id)}
              className={`flex-shrink-0 text-xs uppercase tracking-wider px-5 py-3 rounded-full border transition-premium ${
                activeDayMobile === day.id
                  ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-md'
                  : 'bg-white/60 border-sand-200 text-charcoal-900'
              }`}
            >
              {day.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Timetable Grid Layout */}
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-7 gap-4 min-h-[500px]">
        {days.map((day) => {
          const items = scheduleByDay[day.id] || [];
          return (
            <div key={day.id} className="space-y-4">
              {/* Day Header */}
              <div className="text-center py-3 bg-charcoal-900 rounded-2xl shadow-sm text-sand-50">
                <span className="text-xs uppercase tracking-widest font-semibold block">
                  {day.name}
                </span>
              </div>

              {/* Class Cards */}
              <div className="space-y-3">
                {items.length > 0 ? (
                  items.map((item) => {
                    const isFull = item.booked >= item.capacity;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl border border-sand-200 bg-white hover:shadow-md hover:border-sage-500 transition-premium flex flex-col justify-center h-32 group relative"
                      >
                        <div className="space-y-2">
                          {/* Time tag */}
                          <div className="flex items-center text-[10px] tracking-widest text-charcoal-500 font-semibold uppercase">
                            <Clock className="w-3.5 h-3.5 mr-1 text-sage-500" />
                            {item.time} ({item.classInfo?.duration} dk)
                          </div>
                          
                          {/* Title */}
                          <h4 className="text-xs font-semibold leading-tight text-charcoal-900">
                            {locale === 'tr' ? item.classInfo?.name_tr : item.classInfo?.name_en}
                          </h4>

                          {/* Trainer */}
                          <div className="flex items-center text-[10px] text-charcoal-500 italic">
                            <User className="w-3.5 h-3.5 mr-1 opacity-70" />
                            {item.trainerInfo?.name}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-[10px] tracking-wider text-charcoal-500 italic opacity-60">
                    {locale === 'tr' ? 'Ders yok' : 'No classes'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Version */}
      <div className="block lg:hidden space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayMobile}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {scheduleByDay[activeDayMobile]?.length > 0 ? (
              scheduleByDay[activeDayMobile].map((item) => {
                const isFull = item.booked >= item.capacity;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-3xl border border-sand-200 bg-white shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center text-[10px] font-semibold tracking-wider text-charcoal-500 uppercase">
                        <Clock className="w-3.5 h-3.5 mr-1 text-sage-500" />
                        {item.time} ({item.classInfo?.duration} dk)
                      </div>
                      <h4 className="text-sm font-semibold text-charcoal-900 leading-tight">
                        {locale === 'tr' ? item.classInfo?.name_tr : item.classInfo?.name_en}
                      </h4>
                      <div className="flex items-center space-x-4 text-[10px] text-charcoal-500">
                        <span className="italic flex items-center">
                          <User className="w-3 h-3 mr-1 opacity-70" />
                          {item.trainerInfo?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-xs tracking-wider text-charcoal-500 italic opacity-60 bg-white/20 rounded-3xl border border-dashed border-sand-200">
                {dict.schedule_page?.no_classes || 'No classes scheduled for today.'}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contact & Inquiry Banner */}
      <div className="mt-12 bg-sand-100/60 border border-sand-200 p-8 rounded-3xl text-center space-y-4 max-w-2xl mx-auto shadow-sm">
        <p className="text-xs text-charcoal-700 leading-relaxed font-light">
          {locale === 'tr'
            ? 'Seanslarımıza katılmak, güncel kontenjan durumunu öğrenmek ve kaydınızı tamamlamak için bizimle hemen iletişime geçebilirsiniz.'
            : 'To join our sessions, check class availability, and complete your booking, please reach out to us.'}
        </p>
        <div className="flex justify-center gap-4 flex-wrap pt-2">
          <a
            href={`https://wa.me/905340245160?text=${encodeURIComponent(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! Ders programınızı inceledim ve seanslar hakkında bilgi/kontenjan durumu almak istiyorum.' : 'Hello THEYUMIVERSE! I reviewed your schedule and would like to get information about classes.')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-xs tracking-wider uppercase font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full transition-premium shadow-md shadow-emerald-600/10 cursor-pointer"
          >
            {locale === 'tr' ? 'WhatsApp ile Yazın' : 'Chat via WhatsApp'}
          </a>
          <a
            href={`/${locale}/contact`}
            className="flex items-center text-xs tracking-wider uppercase font-medium bg-charcoal-900 hover:bg-sage-500 text-white px-6 py-2.5 rounded-full transition-premium cursor-pointer"
          >
            {locale === 'tr' ? 'İletişim Bilgileri' : 'Contact Details'}
          </a>
        </div>
      </div>
    </div>
  );
}
