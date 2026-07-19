'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function SchedulePage(props: PageProps) {
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

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'STÜDYO PROGRAMI' : 'STUDIO SCHEDULE'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.schedule_page.title}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {dict.schedule_page.subtitle}
        </p>
      </div>

      {/* Main interactive schedule grid */}
      <div className="pt-6">
        <ScheduleGrid
          locale={locale}
          dict={dict}
          isAuthenticated={false}
        />
      </div>
    </div>
  );
}
