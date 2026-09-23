// Single source of truth for studio contact details used across the site.

// Written in capitals on purpose: CSS `uppercase` under lang="tr" turns "i" into "İ" (THE YUMİVERSE).
export const BRAND_NAME = 'THE YUMIVERSE';

export const STUDIO_PHONE_E164 = '+905340245160';
export const STUDIO_PHONE_DISPLAY = '+90 (534) 024 51 60';
export const STUDIO_PHONE_HREF = `tel:${STUDIO_PHONE_E164}`;

export const STUDIO_EMAIL = 'umpilatesyogastudyo@gmail.com';

export const STUDIO_ADDRESS = 'Hacı Bektaş-ı Veli Caddesi No: 32/A Hatay Arsuz';

// Google Maps business link for the studio.
// To update: open the studio's listing in Google Maps → "Share" → "Copy link"
// and paste it here (e.g. 'https://maps.app.goo.gl/XXXXXXXX').
// While empty, an address search is used as a fallback.
const STUDIO_MAPS_PLACE_URL = '';

export const STUDIO_MAPS_URL =
  STUDIO_MAPS_PLACE_URL ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'UM Pilates & Yoga, Hacı Bektaş-ı Veli Caddesi No: 32/A, Arsuz, Hatay'
  )}`;

export const getWhatsappUrl = (text?: string) =>
  `https://wa.me/${STUDIO_PHONE_E164.slice(1)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
