'use client';

import { useState, useMemo } from 'react';
import { User, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CLASS_TYPES, getClassName } from '@/lib/classes';
import { getWhatsappUrl } from '@/lib/studio';

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
    () => MOCK_TRAINERS.filter((t) => MOCK_SCHEDULE.some((s) => s.trainer_id === t.id)),
    []
  );
  const showTrainerFilter = scheduledTrainers.length > 1;

  const hasActiveFilters =
    selectedTrainer !== 'all' || selectedCategory !== 'all' || selectedLevel !== 'all';

  // Filtered Sessions
  const filteredSchedule = useMemo(() => {
    return MOCK_SCHEDULE.map((item) => {
      const classInfo = CLASS_TYPES.find((c) => c.id === item.class_id);
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

  // Group Schedule by day
  const scheduleByDay = useMemo(() => {
    const grouped: { [key: number]: typeof filteredSchedule } = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] };
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
                  items.map((item) => (
                    <motion.a
                      key={item.id}
                      href={getBookingUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group p-5 lg:p-3.5 xl:p-4 rounded-3xl lg:rounded-2xl border border-sand-200 bg-white shadow-sm lg:shadow-none hover:shadow-md hover:border-sage-500 transition-premium flex items-center lg:items-start justify-between gap-3 lg:min-h-32 min-w-0"
                    >
                      <div className="space-y-1.5 lg:space-y-2 min-w-0">
                        {/* Time tag */}
                        <div className="flex flex-wrap items-center text-[10px] tracking-wider lg:tracking-widest text-charcoal-500 font-semibold uppercase">
                          <Clock className="w-3.5 h-3.5 mr-1 text-sage-500 shrink-0" />
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
                        <div className="flex items-center text-[10px] text-charcoal-500 italic min-w-0">
                          <User className="w-3 h-3 lg:w-3.5 lg:h-3.5 mr-1 opacity-70 shrink-0" />
                          <span className="truncate">{item.trainerInfo?.name}</span>
                        </div>
                      </div>

                      {/* Mobile booking affordance */}
                      <span className="lg:hidden shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-emerald-700">
                        {dict.schedule_page?.book || (locale === 'tr' ? 'Rezervasyon' : 'Book')}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </motion.a>
                  ))
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
