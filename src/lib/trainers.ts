// Shared trainer roster so the schedule, trainers page and gallery use identical names.

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  role_tr: string;
  role_en: string;
}

export const TRAINERS: Trainer[] = [
  { id: 't1', name: 'Ümran Solmaz', slug: 'umran-solmaz', role_tr: 'Kurucu / Eğitmen', role_en: 'Founder / Instructor' },
  { id: 't2', name: 'Meriç Çaparoğlu', slug: 'meric-caparoglu', role_tr: 'Yoga Eğitmeni', role_en: 'Yoga Instructor' },
];

export const getTrainer = (id: string) => TRAINERS.find((t) => t.id === id);
