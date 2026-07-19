import type { Metadata } from 'next';
import { getDictionary, Locale } from '@/lib/dictionary';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const isTr = locale === 'tr';
  return {
    title: isTr ? 'Gizlilik Politikası | THEYUMIVERSE' : 'Privacy Policy | THEYUMIVERSE',
  };
}

export default async function PrivacyPage(props: PageProps) {
  const { locale } = await props.params;
  const isTr = locale === 'tr';

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 space-y-8">
      <h1 className="text-3xl font-light text-charcoal-900 tracking-tight">
        {isTr ? 'Gizlilik Politikası' : 'Privacy Policy'}
      </h1>

      <div className="prose prose-sand text-xs md:text-sm text-charcoal-700 leading-relaxed space-y-6 font-light">
        {isTr ? (
          <>
            <p><strong>Son Güncelleme:</strong> 19 Temmuz 2026</p>
            <p>THEYUMIVERSE olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, stüdyomuza kayıt olan ve web sitemizi kullanan üyelerimizin kişisel verilerinin korunmasına büyük önem veriyoruz.</p>
            
            <h3>1. Toplanan Kişisel Veriler</h3>
            <p>Sizlere premium reformer pilates ve yoga hizmetlerimizi sunabilmek amacıyla; ad-soyad, e-posta adresi, telefon numarası, ders rezervasyon geçmişi ve satın aldığınız üyelik paketlerinin kalan bakiye adetleri gibi verileri güvenli sunucularımızda saklıyoruz.</p>

            <h3>2. Verilerin İşlenme Amacı</h3>
            <p>Toplanan kişisel verileriniz; ders rezervasyon onaylarının WhatsApp ile iletilmesi, rezervasyon iptallerinde ders kredinizin iade edilmesi, Google Calendar senkronizasyonu ve üyelik analizleri amacıyla işlenmektedir.</p>

            <h3>3. Veri Güvenliği</h3>
            <p>Kişisel verileriniz, Supabase altyapısının sağladığı en güncel veritabanı şifreleme yöntemleri ve Row-Level Security (RLS) güvenlik protokolleri ile korunmaktadır.</p>
          </>
        ) : (
          <>
            <p><strong>Last Updated:</strong> July 19, 2026</p>
            <p>At THEYUMIVERSE, we show maximum sensitivity regarding the security of your personal data. We attach great importance to the protection of the personal data of our members who enroll in our studio.</p>

            <h3>1. Collected Data</h3>
            <p>In order to provide you with our premium reformer pilates & yoga services, we store details such as name, email, phone number, class reservation logs, and your active session packages in our secure database.</p>

            <h3>2. Purpose of Processing</h3>
            <p>Your personal data is processed to dispatch WhatsApp booking updates, restore class credits on valid cancellations, enable Google Calendar syncing, and track dashboard analytics.</p>
          </>
        )}
      </div>
    </div>
  );
}
