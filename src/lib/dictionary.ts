// Client and Server dictionary loader

const dictionaries = {
  tr: () => import('../../dictionaries/tr.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ['tr', 'en'];
export const defaultLocale: Locale = 'tr';
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const hasLocale = (locale: string | undefined): locale is Locale =>
  !!locale && Object.prototype.hasOwnProperty.call(dictionaries, locale);

// Swap the leading locale segment of a pathname, e.g. /tr/schedule -> /en/schedule
export const localizePath = (pathname: string, nextLocale: Locale) => {
  const [, first, ...rest] = pathname.split('/');
  const segments = hasLocale(first) ? rest : [first, ...rest].filter(Boolean);
  return `/${[nextLocale, ...segments].join('/')}`.replace(/\/$/, '');
};

export const getDictionary = async (locale: Locale) => {
  if (!hasLocale(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
};
