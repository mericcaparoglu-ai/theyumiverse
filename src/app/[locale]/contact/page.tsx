'use client';

import { use, useState } from 'react';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Mail, Phone, MapPin, MessageSquare, Check, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getWhatsappUrl,
  STUDIO_EMAIL,
  STUDIO_MAPS_URL,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_HREF,
} from '@/lib/studio';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  const whatsappText = locale === 'tr'
    ? 'Merhaba Üm Pilates Yoga Studio! Reformer Pilates ve Yoga ders paketleriniz, seans programlarınız ve stüdyo kayıt şartlarınız hakkında bilgi alabilir miyim?'
    : 'Hello THEYUMIVERSE! Could I please get details about your Reformer Pilates and Yoga packages, timetable options, and studio enrollment?';

  const whatsappLink = getWhatsappUrl(whatsappText);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {locale === 'tr' ? 'BİZİMLE İLETİŞİME GEÇİN' : 'CONTACT US'}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.contact_page.title}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {dict.contact_page.subtitle}
        </p>
      </div>

      {/* Grid: Form and Contact Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-8">
        {/* Contact Form */}
        <div className="bg-white border border-sand-200 p-8 rounded-3xl space-y-6 hover:shadow-sm transition-premium">
          <h2 className="text-lg font-semibold text-charcoal-900">
            {locale === 'tr' ? 'Mesaj Bırakın' : 'Send a Message'}
          </h2>
          
          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-sage-50 border border-sage-200 text-sage-800 rounded-2xl text-center space-y-3"
            >
              <Check className="w-8 h-8 mx-auto text-sage-500" />
              <h3 className="text-sm font-semibold">{locale === 'tr' ? 'Mesajınız İletildi!' : 'Message Sent!'}</h3>
              <p className="text-xs font-light">
                {locale === 'tr'
                  ? 'En kısa sürede e-posta adresiniz üzerinden geri dönüş sağlayacağız.'
                  : 'We will get back to you via your email address as soon as possible.'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-charcoal-500 font-medium px-1">
                  {dict.contact_page.form_name}
                </label>
                <input
                  type="text"
                  required
                  placeholder={locale === 'tr' ? 'Örn. Ahmet Yılmaz' : 'e.g. John Doe'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs bg-sand-50/80 border border-sand-200 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition-premium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-charcoal-500 font-medium px-1">
                  {dict.contact_page.form_email}
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-sand-50/80 border border-sand-200 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition-premium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-charcoal-500 font-medium px-1">
                  {dict.contact_page.form_message}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={locale === 'tr' ? 'Mesajınızı yazın...' : 'Write your message...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-xs bg-sand-50/80 border border-sand-200 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition-premium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-charcoal-900 hover:bg-sage-500 text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded-xl transition-premium flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-charcoal-900/5"
              >
                {isLoading ? '...' : (
                  <>
                    <Send className="w-4 h-4" />
                    {dict.contact_page.form_submit}
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info and WhatsApp */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h2 className="text-xl font-light text-charcoal-900 leading-tight">
              {locale === 'tr' 
                ? 'Sizi stüdyomuzda bir kahve eşliğinde ağırlamak isteriz.' 
                : 'We would love to host you for a cup of coffee at our studio.'}
            </h2>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              {locale === 'tr'
                ? 'Arsuz ve İskenderun’un tam kalbinde yer alan premium stüdyomuzda, sakinliği ve bedensel gücü hissetmeniz için tüm detayları hazırladık.'
                : 'In our premium studio located right in the heart of Arsuz and Iskenderun, we designed all details for you to experience tranquility.'}
            </p>

            <ul className="space-y-4 pt-4 text-xs text-charcoal-800">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-sage-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">{locale === 'tr' ? 'Adresimiz' : 'Address'}</span>
                  <a
                    href={STUDIO_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 hover:opacity-100 hover:text-sage-700 underline decoration-sand-300 underline-offset-4 transition-premium"
                  >
                    {dict.contact_page.address}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-sage-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">{locale === 'tr' ? 'Telefon & WhatsApp' : 'Phone & WhatsApp'}</span>
                  <a
                    href={STUDIO_PHONE_HREF}
                    className="opacity-80 hover:opacity-100 hover:text-sage-700 transition-premium whitespace-nowrap"
                  >
                    {STUDIO_PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-sage-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">E-posta</span>
                  <a
                    href={`mailto:${STUDIO_EMAIL}`}
                    className="opacity-80 hover:opacity-100 hover:text-sage-700 transition-premium break-all"
                  >
                    {STUDIO_EMAIL}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick WhatsApp Action Card */}
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-4">
            <div className="flex items-center space-x-3 text-emerald-800">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold">
                  {locale === 'tr' ? 'Hızlı Rezervasyon Desteği' : 'Quick Booking Support'}
                </h4>
                <p className="text-[10px] opacity-80">{locale === 'tr' ? 'Müşteri temsilcimiz anında yardımcı olsun.' : 'Connect directly with our customer support.'}</p>
              </div>
            </div>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center block bg-emerald-500 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-bold py-3.5 rounded-2xl transition-premium shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              {dict.contact_page.whatsapp_button}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
