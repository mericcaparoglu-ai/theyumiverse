// Client and Server dictionary loader

const dictionaries = {
  tr: () => import('../../dictionaries/tr.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
};

export type Locale = 'tr' | 'en';

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.tr();
  }
  return dictionaries[locale]();
};
