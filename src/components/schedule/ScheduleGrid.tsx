'use client';

import { useState, useMemo } from 'react';
import { User, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CLASS_TYPES, getClassName } from '@/lib/classes';
import { getWhatsappUrl } from '@/lib/studio';
import { TRAINERS, getTrainer } from '@/lib/trainers';

interface ScheduleGridProps {
  locale: 'tr' | 'en';
  dict: any;
  onBookClass?: (scheduleId: string) => void;
  isAuthenticated: boolean;
}

// Weekly timetable (Mon–Fri). Class names come from CLASS_TYPES, trainers from TRAINERS.
// c6 = Reformer Grup (Maks. 7 Kişi) · Ümran Solmaz | c7 = Hatha Yoga · Meriç Çaparoğlu
// Hatha Yoga slots run in parallel with a Reformer group class in the reformer room.
const MOCK_SCHEDULE = [
  // Pazartesi / Monday
  { id: 's101', class_id: 'c7', trainer_id: 't2', day: 1, time: '09:00', capacity: 10, booked: 0 },
  { id: 's106', class_id: 'c6', trainer_id: 't1', day: 1, time: '09:00', capacity: 7, booked: 0 },
  { id: 's102', class_id: 'c6', trainer_id: 't1', day: 1, time: '10:00', capacity: 7, booked: 0 },
  { id: 's103', class_id: 'c6', trainer_id: 't1', day: 1, time: '17:30', capacity: 7, booked: 0 },
  { id: 's104', class_id: 'c6', trainer_id: 't1', day: 1, time: '18:30', capacity: 7, booked: 0 },
  { id: 's105', class_id: 'c6', trainer_id: 't1', day: 1, time: '19:30', capacity: 7, booked: 0 },

  // Salı / Tuesday
  { id: 's201', class_id: 'c6', trainer_id: 't1', day: 2, time: '09:00', capacity: 7, booked: 0 },
  { id: 's202', class_id: 'c6', trainer_id: 't1', day: 2, time: '10:00', capacity: 7, booked: 0 },
  { id: 's203', class_id: 'c6', trainer_id: 't1', day: 2, time: '17:30', capacity: 7, booked: 0 },
  { id: 's204', class_id: 'c6', trainer_id: 't1', day: 2, time: '18:30', capacity: 7, booked: 0 },
  { id: 's205', class_id: 'c7', trainer_id: 't2', day: 2, time: '19:30', capacity: 10, booked: 0 },
  { id: 's206', class_id: 'c6', trainer_id: 't1', day: 2, time: '19:30', capacity: 7, booked: 0 },

  // Çarşamba / Wednesday
  { id: 's301', class_id: 'c7', trainer_id: 't2', day: 3, time: '09:00', capacity: 10, booked: 0 },
  { id: 's306', class_id: 'c6', trainer_id: 't1', day: 3, time: '09:00', capacity: 7, booked: 0 },
  { id: 's302', class_id: 'c6', trainer_id: 't1', day: 3, time: '10:00', capacity: 7, booked: 0 },
  { id: 's303', class_id: 'c6', trainer_id: 't1', day: 3, time: '17:30', capacity: 7, booked: 0 },
  { id: 's304', class_id: 'c6', trainer_id: 't1', day: 3, time: '18:30', capacity: 7, booked: 0 },
  { id: 's305', class_id: 'c6', trainer_id: 't1', day: 3, time: '19:30', capacity: 7, booked: 0 },

  // Perşembe / Thursday
  { id: 's401', class_id: 'c6', trainer_id: 't1', day: 4, time: '09:00', capacity: 7, booked: 0 },
  { id: 's402', class_id: 'c6', trainer_id: 't1', day: 4, time: '10:00', capacity: 7, booked: 0 },
  { id: 's403', class_id: 'c6', trainer_id: 't1', day: 4, time: '17:30', capacity: 7, booked: 0 },
  { id: 's404', class_id: 'c6', trainer_id: 't1', day: 4, time: '18:30', capacity: 7, booked: 0 },
  { id: 's405', class_id: 'c7', trainer_id: 't2', day: 4, time: '19:30', capacity: 10, booked: 0 },
  { id: 's406', class_id: 'c6', trainer_id: 't1', day: 4, time: '19:30', capacity: 7, booked: 0 },

  // Cuma / Friday
  { id: 's501', class_id: 'c6', trainer_id: 't1', day: 5, time: '09:00', capacity: 7, booked: 0 },
  { id: 's502', class_id: 'c6', trainer_id: 't1', day: 5, time: '10:00', capacity: 7, booked: 0 },
  { id: 's503', class_id: 'c6', trainer_id: 't1', day: 5, time: '17:30', capacity: 7, booked: 0 },
  { id: 's504', class_id: 'c6', trainer_id: 't1', day: 5, time: '18:30', capacity: 7, booked: 0 },
  { id: 's505', class_id: 'c6', trainer_id: 't1', day: 5, time: '19:30', capacity: 7, booked: 0 },
];

const DAYS_OF_WEEK_TR = [
  { id: 1, name: 'Pazartesi', short: 'Pzt' },
  { id: 2, name: 'Salı', short: 'Sal' },
  { id: 3, name: 'Çarşamba', short: 'Çar' },
  { id: 4, name: 'Perşembe', short: 'Per' },
  { id: 5, name: 'Cuma', short: 'Cum' },
  { id: 6, name: 'Cumartesi', short: 'Cmt' },
  { id: 7, name: 'Pazar', short: 'Paz' },
];

const DAYS_OF_WEEK_EN = [
  { id: 1, name: 'Monday', short: 'Mon' },
  { id: 2, name: 'Tuesday', short: 'Tue' },
  { id: 3, name: 'Wednesday', short: 'Wed' },
  { id: 4, name: 'Thursday', short: 'Thu' },
  { id: 5, name: 'Friday', short: 'Fri' },
  { id: 6, name: 'Saturday', short: 'Sat' },
  { id: 7, name: 'Sunday', short: 'Sun' },
];

// JS: 0 = Sunday … 6 = Saturday  ->  schedule: 1 = Monday … 7 = Sunday
const getTodayId = () => new Date().getDay() || 7;

// Per-category card styling: Reformer keeps the minimal white card,
// Yoga gets a soft sage tone. Meta text uses sage-700 on the sage tint (≥5:1 contrast).
const CARD_THEMES = {
  reformer_pilates: {
    card: 'bg-white border-sand-200 hover:border-sage-500',
    meta: 'text-charcoal-500',
    icon: 'text-sage-500',
    cta: 'text-emerald-700',
    badge: null,
  },
  yoga: {
    card: 'bg-sage-100/70 border-sage-200 hover:border-sage-500',
    meta: 'text-sage-700',
    icon: 'text-sage-700',
    cta: 'text-sage-700',
    badge: 'bg-white/70 text-sage-700 border-sage-200',
  },
} as const;

const selectClassName =
  'w-full sm:w-auto text-[11px] sm:text-xs tracking-normal sm:tracking-wider sm:uppercase font-medium bg-sand-50/80 border border-sand-200 rounded-full pl-3 pr-2 sm:px-4 py-2.5 outline-none focus:border-sage-500 transition-premium cursor-pointer';

export default function ScheduleGrid({
  locale,
  dict,
}: ScheduleGridProps) {
  const days = locale === 'tr' ? DAYS_OF_WEEK_TR : DAYS_OF_WEEK_EN;
  const minutesShort = dict.schedule_page?.minutes_short || (locale === 'tr' ? 'dk' : 'min');

  // Filters State
  const [selectedTrainer, setSelectedTrainer] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mobile Day Tabs State (defaults to today)
  const [activeDayMobile, setActiveDayMobile] = useState(getTodayId);

  // Only offer a trainer filter when there is actually something to choose between
  const scheduledTrainers = useMemo(
    () => TRAINERS.filter((t) => MOCK_SCHEDULE.some((s) => s.trainer_id === t.id)),
    []
  );
  const showTrainerFilter = scheduledTrainers.length > 1;

  const hasActiveFilters =
    selectedTrainer !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all';

  // Filtered Sessions
  const filteredSchedule = useMemo(() => {
    return MOCK_SCHEDULE.map((item) => {
      const classInfo = CLASS_TYPES.find((c) => c.id === item.class_id);
      const trainerInfo = getTrainer(item.trainer_id);
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

  // Group Schedule by day
  const scheduleByDay = useMemo(() => {
    const grouped: { [key: number]: typeof filteredSchedule } = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
    filteredSchedule.forEach((item) => {
      if (grouped[item.day]) {
        grouped[item.day].push(item);
      }
    });
    // Sort day items by time; parallel classes at the same time keep a fixed,
    // language-independent order (by session id) so /tr and /en match.
    Object.keys(grouped).forEach((d) => {
      grouped[Number(d)].sort((a, b) => a.time.localeCompare(b.time) || a.id.localeCompare(b.id));
    });
    return grouped;
  }, [filteredSchedule]);

  const getBookingUrl = (item: (typeof filteredSchedule)[number]) => {
    const classTitle = getClassName(item.classInfo, locale);
    const dayName = days.find((d) => d.id === item.day)?.name || '';
    const text = locale === 'tr'
      ? `Merhaba Üm Pilates Yoga Studio! ${dayName} günü saat ${item.time}'daki "${classTitle}" dersi için rezervasyon yaptırmak istiyorum.`
      : `Hello THEYUMIVERSE! I want to book a spot for the "${classTitle}" class on ${dayName} at ${item.time}.`;
    return getWhatsappUrl(text);
  };

  const emptyText = hasActiveFilters
    ? dict.schedule_page?.no_classes
    : dict.schedule_page?.no_classes_day || (locale === 'tr' ? 'Ders yok' : 'No classes');

  return (
    <div className="w-full space-y-8">
      {/* 1. Timetable Filter Toolbar */}
      <div className="flex flex-wrap gap-4 items-end justify-between bg-white/40 p-5 rounded-3xl border border-white/50 backdrop-blur-md">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 w-full sm:w-auto">
          {/* Trainer Filter (only when >1 trainer) */}
          {showTrainerFilter && (
            <label className="flex flex-col space-y-1 min-w-0">
              <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
                {locale === 'tr' ? 'EĞİTMEN' : 'TRAINER'}
              </span>
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className={selectClassName}
              >
                <option value="all">{dict.schedule_page?.filters?.all_trainers || 'All Trainers'}</option>
                {scheduledTrainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Class Category Filter */}
          <label className="flex flex-col space-y-1 min-w-0">
            <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
              {locale === 'tr' ? 'DERS TİPİ' : 'CLASS TYPE'}
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={selectClassName}
            >
              <option value="all">{dict.schedule_page?.filters?.all_classes || 'All Class Types'}</option>
              <option value="reformer_pilates">Reformer Pilates</option>
              <option value="yoga">Yoga</option>
            </select>
          </label>

          {/* Level Filter */}
          <label className="flex flex-col space-y-1 min-w-0">
            <span className="text-[10px] tracking-widest uppercase opacity-60 font-semibold px-1">
              {locale === 'tr' ? 'SEVİYE' : 'LEVEL'}
            </span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className={selectClassName}
            >
              <option value="all">{dict.schedule_page?.filters?.all_levels || 'All Levels'}</option>
              <option value="beginner">{dict.common?.beginner || 'Beginner'}</option>
              <option value="intermediate">{dict.common?.intermediate || 'Intermediate'}</option>
              <option value="advanced">{dict.common?.advanced || 'Advanced'}</option>
              <option value="all_levels">{dict.common?.all_levels || 'All Levels'}</option>
            </select>
          </label>
        </div>

        {/* Clear Filters indicator */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSelectedTrainer('all');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="text-[10px] tracking-widest uppercase text-sage-700 hover:text-sage-500 font-semibold transition-premium py-2 cursor-pointer"
          >
            {locale === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
          </button>
        )}
      </div>

      {/* 2. Mobile Day Tabs (hidden on desktop) */}
      <div
        role="tablist"
        aria-label={dict.schedule_page?.title}
        className="lg:hidden overflow-x-auto scrollbar-none snap-x"
      >
        <div className="flex gap-1.5">
          {days.map((day) => {
            const isActive = activeDayMobile === day.id;
            const count = scheduleByDay[day.id]?.length ?? 0;
            return (
              <button
                key={day.id}
                role="tab"
                id={`day-tab-${day.id}`}
                aria-selected={isActive}
                aria-controls={`day-panel-${day.id}`}
                onClick={() => setActiveDayMobile(day.id)}
                className={`snap-start flex-1 min-w-10 flex flex-col items-center gap-1 px-1.5 py-2.5 rounded-2xl border text-xs uppercase tracking-wider font-semibold transition-premium cursor-pointer ${
                  isActive
                    ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-md'
                    : 'bg-white/60 border-sand-200 text-charcoal-900'
                } ${count === 0 && !isActive ? 'opacity-50' : ''}`}
              >
                <span>{day.short}</span>
                <span
                  aria-hidden="true"
                  className={`w-1 h-1 rounded-full ${count > 0 ? (isActive ? 'bg-sage-200' : 'bg-sage-500') : 'bg-transparent'}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Timetable — one DOM tree for all breakpoints:
          desktop shows all 7 columns, mobile shows only the active day's panel. */}
      <div className="lg:grid lg:grid-cols-7 lg:gap-3 xl:gap-4 lg:min-h-[500px]">
        {days.map((day) => {
          const items = scheduleByDay[day.id] || [];
          const isActive = activeDayMobile === day.id;
          return (
            <section
              key={day.id}
              id={`day-panel-${day.id}`}
              role="tabpanel"
              aria-labelledby={`day-tab-${day.id}`}
              className={`${isActive ? 'block' : 'hidden'} lg:block space-y-4 min-w-0`}
            >
              {/* Day Header — full-width card on desktop, compact caption on mobile */}
              <h3 className="lg:text-center lg:py-3 lg:bg-charcoal-900 lg:rounded-2xl lg:shadow-sm lg:text-sand-50 text-charcoal-900">
                <span className="text-xs uppercase tracking-widest font-semibold">{day.name}</span>
                <span className="lg:hidden text-[10px] tracking-wider text-charcoal-500 ml-2">
                  · {items.length} {dict.common?.sessions || (locale === 'tr' ? 'ders' : 'classes')}
                </span>
              </h3>

              {/* Class Cards */}
              <div className="space-y-3">
                {items.length > 0 ? (
                  items.map((item) => {
                    const theme = CARD_THEMES[item.classInfo?.category ?? 'reformer_pilates'];
                    return (
                    <motion.a
                      key={item.id}
                      href={getBookingUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      data-category={item.classInfo?.category}
                      className={`group p-5 lg:p-3.5 xl:p-4 rounded-3xl lg:rounded-2xl border ${theme.card} shadow-sm lg:shadow-none hover:shadow-md hover:border-sage-500 transition-premium flex items-center lg:items-start justify-between gap-3 lg:min-h-32 min-w-0`}
                    >
                      <div className="space-y-1.5 lg:space-y-2 min-w-0">
                        {/* Category badge (yoga only) */}
                        {theme.badge && (
                          <span className={`inline-block text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                            Yoga
                          </span>
                        )}

                        {/* Time tag */}
                        <div className={`flex flex-wrap items-center text-[10px] tracking-wider lg:tracking-widest ${theme.meta} font-semibold uppercase`}>
                          <Clock className={`w-3.5 h-3.5 mr-1 ${theme.icon} shrink-0`} />
                          <span>{item.time}</span>
                          <span className="ml-1 font-medium opacity-80">
                            ({item.classInfo?.duration} {minutesShort})
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm lg:text-xs xl:text-[13px] font-semibold leading-snug text-charcoal-900 break-words hyphens-auto">
                          {getClassName(item.classInfo, locale)}
                        </h4>

                        {/* Trainer */}
                        <div className={`flex items-center text-[10px] ${theme.meta} italic min-w-0`}>
                          <User className="w-3 h-3 lg:w-3.5 lg:h-3.5 mr-1 opacity-70 shrink-0" />
                          <span className="truncate">{item.trainerInfo?.name}</span>
                        </div>
                      </div>

                      {/* Mobile booking affordance */}
                      <span className={`lg:hidden shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold ${theme.cta}`}>
                        {dict.schedule_page?.book || (locale === 'tr' ? 'Rezervasyon' : 'Book')}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </motion.a>
                    );
                  })
                ) : (
                  <div className="py-16 lg:py-8 text-center text-xs lg:text-[10px] tracking-wider text-charcoal-500 italic opacity-60 bg-white/20 lg:bg-transparent rounded-3xl border border-dashed border-sand-200 lg:border-0">
                    {emptyText}
                  </div>
                )}
              </div>
            </section>
          );
        })}
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
            href={getWhatsappUrl(locale === 'tr' ? 'Merhaba Üm Pilates Yoga Studio! Ders programınızı inceledim ve seanslar hakkında bilgi/kontenjan durumu almak istiyorum.' : 'Hello THEYUMIVERSE! I reviewed your schedule and would like to get information about classes.')}
            target="_blank"
            rel="noopener noreferrer"
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
