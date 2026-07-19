import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const isTr = locale === 'tr';
  return {
    title: isTr ? 'Kullanım Şartları | THEYUMIVERSE' : 'Terms & Conditions | THEYUMIVERSE',
  };
}

export default async function TermsPage(props: PageProps) {
  const { locale } = await props.params;
  const isTr = locale === 'tr';

  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 space-y-8">
      <h1 className="text-3xl font-light text-charcoal-900 tracking-tight">
        {isTr ? 'Kullanım Şartları' : 'Terms & Conditions'}
      </h1>

      <div className="prose prose-sand text-xs md:text-sm text-charcoal-700 leading-relaxed space-y-6 font-light">
        {isTr ? (
          <>
            <p><strong>Son Güncelleme:</strong> 19 Temmuz 2026</p>
            <p>THEYUMIVERSE wellness stüdyosuna hoş geldiniz. Web sitemizi veya mobil entegrasyonlarımızı kullanarak aşağıdaki şartları peşinen kabul etmiş bulunursunuz.</p>
            
            <h3>1. Üyelik ve Paket Geçerliliği</h3>
            <p>Satın alınan ders paketleri kişiye özeldir, üçüncü şahıslara devredilemez veya nakde çevrilemez. Her paketin satın alındığı tarihten itibaren başlayan bir son kullanma tarihi (örneğin 8 seanslık paketlerde 30 gün) vardır.</p>

            <h3>2. İptal Politikası</h3>
            <p>Planlanan ders saatinden en az 12 saat öncesine kadar yapılan iptallerde ders kredisi üyenin bakiyesine iade edilir. 12 saatten kısa süre kalan veya katılınmayan (no-show) seanslarda ders kredisi kullanılmış sayılır.</p>

            <h3>3. Sağlık Beyanı</h3>
            <p>Derslerimize katılan tüm üyeler, egzersiz yapmalarına engel bir sağlık problemleri olmadığını beyan etmiş sayılırlar. Hamilelik, ameliyat geçmişi veya kronik rahatsızlık durumlarında eğitmenlerimize önceden bilgi verilmesi zorunludur.</p>
          </>
        ) : (
          <>
            <p><strong>Last Updated:</strong> July 19, 2026</p>
            <p>Welcome to THEYUMIVERSE. By using our website, reservation platform, or client features, you agree to comply with the following conditions.</p>

            <h3>1. Memberships and Credits</h3>
            <p>Purchased class packages are personal, non-transferable, and non-refundable. Each package has a defined validation lifespan (e.g., 30 days for 8-Session packs) from the purchase date.</p>

            <h3>2. Cancellation Rules</h3>
            <p>Cancellations made 12 hours or more prior to the scheduled class time restore credits to your balance. Cancellations made inside the 12-hour limit or no-shows deduct credits automatically.</p>
          </>
        )}
      </div>
    </div>
  );
}
