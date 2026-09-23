// Shared class catalog so class names stay identical across pages and languages.
// Naming convention: "Reformer <Format>" + a localized descriptor in parentheses.

export type ClassCategory = 'reformer_pilates' | 'yoga';
export type ClassLevel = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';

export interface ClassType {
  id: string;
  name_tr: string;
  name_en: string;
  category: ClassCategory;
  level: ClassLevel;
  duration: number;
}

export const CLASS_TYPES: ClassType[] = [
  { id: 'c6', name_tr: 'Reformer Grup (Maks. 7 Kişi)', name_en: 'Reformer Group (Max. 7)', category: 'reformer_pilates', level: 'all_levels', duration: 50 },
  { id: 'c1', name_tr: 'Reformer Solo (Özel Ders)', name_en: 'Reformer Solo (Private)', category: 'reformer_pilates', level: 'all_levels', duration: 50 },
  { id: 'c2', name_tr: 'Reformer Duo (İkili Ders)', name_en: 'Reformer Duo (Semi-Private)', category: 'reformer_pilates', level: 'intermediate', duration: 50 },
  { id: 'c5', name_tr: 'Reformer Core (Merkez Güç)', name_en: 'Reformer Core (Core Strength)', category: 'reformer_pilates', level: 'advanced', duration: 50 },
  { id: 'c7', name_tr: 'Hatha Yoga', name_en: 'Hatha Yoga', category: 'yoga', level: 'all_levels', duration: 60 },
  { id: 'c3', name_tr: 'Vinyasa Flow Yoga', name_en: 'Vinyasa Flow Yoga', category: 'yoga', level: 'all_levels', duration: 60 },
  { id: 'c4', name_tr: 'Yin Yoga & Ses Çanakları', name_en: 'Yin Yoga & Sound Healing', category: 'yoga', level: 'beginner', duration: 75 },
];

export const getClassName = (cls: Pick<ClassType, 'name_tr' | 'name_en'> | undefined, locale: 'tr' | 'en') =>
  cls ? (locale === 'tr' ? cls.name_tr : cls.name_en) : '';
