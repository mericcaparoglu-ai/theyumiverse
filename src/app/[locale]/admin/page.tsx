'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, BookOpen, Settings, Plus, RefreshCw, BarChart2, DollarSign, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const REVENUE_DATA = [
  { month: 'Oca', gelir: 28000 },
  { month: 'Şub', gelir: 34000 },
  { month: 'Mar', gelir: 42000 },
  { month: 'Nis', gelir: 39000 },
  { month: 'May', gelir: 48000 },
  { month: 'Haz', gelir: 55000 },
  { month: 'Tem', gelir: 62000 },
];

const CLASS_OCCUPANCY_DATA = [
  { name: 'Reformer Solo', doluluk: 95 },
  { name: 'Reformer Duo', doluluk: 80 },
  { name: 'Vinyasa Yoga', doluluk: 65 },
  { name: 'Yin Yoga', doluluk: 50 },
];

const INITIAL_SCHEDULE = [
  { id: 's1', name_tr: 'Reformer Solo (Özel)', time: '08:00', day: 'Pazartesi', trainer: 'Ceren Yılmaz', capacity: 1, booked: 0, status: 'active' },
  { id: 's2', name_tr: 'Vinyasa Flow Yoga', time: '09:30', day: 'Pazartesi', trainer: 'Deniz Kaya', capacity: 12, booked: 5, status: 'active' },
  { id: 's3', name_tr: 'Reformer Duo (Düet)', time: '18:00', day: 'Pazartesi', trainer: 'Ceren Yılmaz', capacity: 2, booked: 2, status: 'active' },
];

const INITIAL_MEMBERS = [
  { id: 'm1', name: 'Derin Aksoy', package: '8-Session Reformer', remaining: 5, total: 8, registered: '2026-07-01' },
  { id: 'm2', name: 'Alp Yılmaz', package: '12-Session Reformer', remaining: 10, total: 12, registered: '2026-07-05' },
  { id: 'm3', name: 'Elif Şen', package: 'Single Session', remaining: 0, total: 1, registered: '2026-07-18' },
];

export default function AdminDashboardPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);

  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'schedule' | 'members' | 'blogs'>('analytics');
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  
  // New Class Form State
  const [newClassName, setNewClassName] = useState('');
  const [newClassTrainer, setNewClassTrainer] = useState('Ceren Yılmaz');
  const [newClassTime, setNewClassTime] = useState('08:00');
  const [newClassDay, setNewClassDay] = useState('Pazartesi');
  const [newClassCapacity, setNewClassCapacity] = useState('2');

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

  const handleCancelSchedule = (id: string) => {
    setSchedule((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'cancelled' ? 'active' : 'cancelled' } : s))
    );
  };

  const handleAddClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass = {
      id: `s${schedule.length + 1}`,
      name_tr: newClassName || 'Reformer Pilates',
      time: newClassTime,
      day: newClassDay,
      trainer: newClassTrainer,
      capacity: Number(newClassCapacity),
      booked: 0,
      status: 'active',
    };
    setSchedule((prev) => [...prev, newClass]);
    setShowAddClassModal(false);
    setNewClassName('');
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-12">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-sand-200 pb-6">
        <div>
          <span className="text-[10px] tracking-widest uppercase text-red-500 font-bold block">
            {locale === 'tr' ? 'YÖNETİCİ KONTROL PANELİ' : 'ADMIN CONTROL PANEL'}
          </span>
          <h1 className="text-3xl font-light text-charcoal-900 tracking-tight">
            THEYUMIVERSE Studio Dashboard
          </h1>
        </div>

        {/* Action Tabs Row */}
        <div className="flex space-x-2 bg-white/50 p-1.5 rounded-full border border-sand-200 backdrop-blur-sm text-xs">
          {[
            { id: 'analytics', label: locale === 'tr' ? 'Analizler' : 'Analytics', icon: <BarChart2 className="w-3.5 h-3.5" /> },
            { id: 'schedule', label: locale === 'tr' ? 'Program Yönetimi' : 'Timetable', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'members', label: locale === 'tr' ? 'Üyeler' : 'Members', icon: <Users className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold transition-premium cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'text-charcoal-700 hover:bg-sand-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Sub-Tab Content */}

      {/* SUB-TAB: ANALYTICS */}
      {activeSubTab === 'analytics' && (
        <div className="space-y-12">
          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-sand-200 p-6 rounded-3xl space-y-3 hover:shadow-sm transition-premium">
              <div className="flex justify-between items-center text-charcoal-400">
                <Users className="w-5 h-5 text-sage-500" />
                <span className="text-[10px] uppercase font-bold text-emerald-600">+12%</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal-900">142</h3>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">{locale === 'tr' ? 'Aktif Üye Sayısı' : 'Active Members'}</p>
            </div>

            <div className="bg-white border border-sand-200 p-6 rounded-3xl space-y-3 hover:shadow-sm transition-premium">
              <div className="flex justify-between items-center text-charcoal-400">
                <DollarSign className="w-5 h-5 text-sage-500" />
                <span className="text-[10px] uppercase font-bold text-emerald-600">+18%</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal-900">62,000 TL</h3>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">{locale === 'tr' ? 'Aylık Ciro (Temmuz)' : 'Monthly Revenue'}</p>
            </div>

            <div className="bg-white border border-sand-200 p-6 rounded-3xl space-y-3 hover:shadow-sm transition-premium">
              <div className="flex justify-between items-center text-charcoal-400">
                <TrendingUp className="w-5 h-5 text-sage-500" />
                <span className="text-[10px] uppercase font-bold text-emerald-600">82%</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal-900">72.5%</h3>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">{locale === 'tr' ? 'Ortalama Doluluk Oranı' : 'Average Occupancy'}</p>
            </div>

            <div className="bg-white border border-sand-200 p-6 rounded-3xl space-y-3 hover:shadow-sm transition-premium">
              <div className="flex justify-between items-center text-charcoal-400">
                <Calendar className="w-5 h-5 text-sage-500" />
                <span className="text-[10px] uppercase font-bold text-charcoal-400">Bugün</span>
              </div>
              <h3 className="text-2xl font-semibold text-charcoal-900">18</h3>
              <p className="text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">{locale === 'tr' ? 'Rezervasyon Yapılan Seans' : 'Classes Booked Today'}</p>
            </div>
          </div>

          {/* Recharts Graphical Visualizers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Area Chart */}
            <div className="bg-white border border-sand-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal-500">
                {locale === 'tr' ? 'Gelir Analizi (Aylık)' : 'Revenue Trend (Monthly)'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6f8f80" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6f8f80" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#faf7f2', border: '1px solid #e8ddd2', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="gelir" stroke="#6f8f80" strokeWidth={2} fillOpacity={1} fill="url(#colorGelir)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Occupancy Rate Bar Chart */}
            <div className="bg-white border border-sand-200 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal-500">
                {locale === 'tr' ? 'Ders Doluluk Oranları (%)' : 'Class Occupancy Rates (%)'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CLASS_OCCUPANCY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ background: '#faf7f2', border: '1px solid #e8ddd2', borderRadius: '12px' }} />
                    <Bar dataKey="doluluk" fill="#6f8f80" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: TIMETABLE MANAGEMENT */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal-500">
              {locale === 'tr' ? 'Haftalık Seans Düzenlemeleri' : 'Timetable Scheduling'}
            </h3>
            <button
              onClick={() => setShowAddClassModal(true)}
              className="flex items-center gap-1 bg-charcoal-900 hover:bg-sage-500 text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2.5 rounded-full transition-premium cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {locale === 'tr' ? 'Yeni Seans Ekle' : 'Add Class'}
            </button>
          </div>

          <div className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-sand-100 text-xs">
              {schedule.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.status === 'cancelled' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      <h4 className="font-semibold text-charcoal-900 text-sm">{item.name_tr}</h4>
                    </div>
                    <p className="text-[10px] text-charcoal-500 italic">
                      {item.trainer} • {item.day} • {item.time} • ({item.booked} / {item.capacity} rezervasyon)
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCancelSchedule(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-[10px] font-semibold uppercase tracking-wider transition-premium cursor-pointer ${
                        item.status === 'cancelled'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                          : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {item.status === 'cancelled' ? (locale === 'tr' ? 'Aktifleştir' : 'Activate') : (locale === 'tr' ? 'İptal Et' : 'Cancel')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB: MEMBERS LIST */}
      {activeSubTab === 'members' && (
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal-500">
            {locale === 'tr' ? 'Stüdyo Üye Listesi & Paket Takibi' : 'Member Balances'}
          </h3>

          <div className="bg-white border border-sand-200 rounded-3xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-sand-50 border-b border-sand-200 text-[10px] uppercase tracking-wider text-charcoal-500 font-semibold">
                  <th className="p-4">{locale === 'tr' ? 'Üye Adı' : 'Member Name'}</th>
                  <th className="p-4">{locale === 'tr' ? 'Aktif Paket' : 'Active Package'}</th>
                  <th className="p-4">{locale === 'tr' ? 'Kalan Ders' : 'Remaining Credits'}</th>
                  <th className="p-4">{locale === 'tr' ? 'Kayıt Tarihi' : 'Registered Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-sand-50/50 transition-premium">
                    <td className="p-4 font-semibold text-charcoal-900">{member.name}</td>
                    <td className="p-4 text-charcoal-700">{member.package}</td>
                    <td className="p-4 font-bold text-sage-600">{member.remaining} / {member.total}</td>
                    <td className="p-4 text-charcoal-500">{member.registered}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Class Dialog Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowAddClassModal(false)} className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" />
          <div className="bg-sand-50 rounded-3xl border border-sand-200 shadow-2xl p-6 relative w-full max-w-md z-10 space-y-6">
            <div className="border-b border-sand-200 pb-3">
              <h3 className="text-sm font-semibold text-charcoal-900 uppercase tracking-wider">
                {locale === 'tr' ? 'Yeni Seans Ekle' : 'Add New Class Session'}
              </h3>
            </div>

            <form onSubmit={handleAddClassSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-charcoal-500">Seans Adı (Ders Tipi)</label>
                <input
                  type="text"
                  required
                  placeholder="örn. Reformer Solo"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full bg-white border border-sand-200 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition-premium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal-500">Eğitmen</label>
                  <select
                    value={newClassTrainer}
                    onChange={(e) => setNewClassTrainer(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded-xl px-3 py-3 outline-none transition-premium"
                  >
                    <option value="Ceren Yılmaz">Ceren Yılmaz</option>
                    <option value="Deniz Kaya">Deniz Kaya</option>
                    <option value="Can Demir">Can Demir</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal-500">Kapasite</label>
                  <input
                    type="number"
                    required
                    value={newClassCapacity}
                    onChange={(e) => setNewClassCapacity(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded-xl px-3 py-3 outline-none transition-premium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal-500">Saat</label>
                  <input
                    type="text"
                    required
                    placeholder="örn. 08:00"
                    value={newClassTime}
                    onChange={(e) => setNewClassTime(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded-xl px-3 py-3 outline-none transition-premium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-charcoal-500">Gün</label>
                  <select
                    value={newClassDay}
                    onChange={(e) => setNewClassDay(e.target.value)}
                    className="w-full bg-white border border-sand-200 rounded-xl px-3 py-3 outline-none transition-premium"
                  >
                    <option value="Pazartesi">Pazartesi</option>
                    <option value="Salı">Salı</option>
                    <option value="Çarşamba">Çarşamba</option>
                    <option value="Perşembe">Perşembe</option>
                    <option value="Cuma">Cuma</option>
                    <option value="Cumartesi">Cumartesi</option>
                    <option value="Pazar">Pazar</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-grow bg-charcoal-900 hover:bg-sage-500 text-white py-3 rounded-xl uppercase font-semibold tracking-wider cursor-pointer"
                >
                  Ekle
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClassModal(false)}
                  className="flex-grow border border-sand-200 text-charcoal-700 py-3 rounded-xl uppercase font-semibold tracking-wider hover:bg-sand-100 cursor-pointer"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
