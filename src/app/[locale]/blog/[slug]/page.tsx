import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, Locale } from '@/lib/dictionary';
import { Calendar, User, Clock, ChevronLeft, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const BLOG_DATA = {
  'arsuzda-reformer-pilates-faydalari': {
    category: 'reformer_pilates',
    tags: ['Reformer Pilates', 'Arsuz', 'Sıkılaşma'],
    author: 'Ceren Yılmaz',
    readingTime: 5,
    date: '2026-07-10',
    title_tr: 'Arsuz’da Reformer Pilates: Bedensel Dönüşümün Anahtarı',
    title_en: 'Reformer Pilates in Arsuz: Key to Physical Transformation',
    excerpt_tr: 'Reformer pilatesin omurga sağlığı, duruş bozuklukları ve esneklik üzerindeki faydalarını ve stüdyomuzdaki ayrıcalıkları keşfedin.',
    excerpt_en: 'Discover the benefits of reformer pilates on spinal health, posture correction, and flexibility inside our luxury studio.',
    content_tr: `
      <p>Reformer pilates, son yıllarda wellness ve fitness dünyasında en çok öne çıkan egzersiz modellerinden biridir. Özellikle <strong>Arsuz</strong> ve <strong>İskenderun</strong> gibi bölgelerde, hem yerel sakinlerin hem de tatilcilerin sağlıklı yaşam arayışlarında ilk tercihleri arasında yer almaktadır.</p>
      
      <h3>Reformer Pilates Nedir?</h3>
      <p>Reformer pilates, özel olarak tasarlanmış bir yaylı mekanizma ve makara sistemi üzerinde yapılan, kasları uzatıp güçlendiren bütünsel bir egzersiz biçimidir. Dirençli yaylar sayesinde, kendi vücut ağırlığınızın ötesinde derin kas gruplarını hedefleyebilirsiniz.</p>
      
      <h3>Arsuz'da Wellness Deneyimi</h3>
      <p>THEYUMIVERSE olarak stüdyomuzu sadece bir egzersiz alanı değil, lüks bir kaçış noktası olarak kurguladık. Arsuz'un huzurlu iklimine ve doğal güzelliklerine uyum sağlayan İskandinav tarzı ahşap detaylar ve sakin renk tonları ile tasarlanan stüdyomuzda aldığınız her nefes, bedensel arınmanızı destekler.</p>
      
      <h3>Başlıca Faydaları</h3>
      <ul>
        <li><strong>Duruş (Postür) Düzeltme:</strong> Masa başı çalışanlar için omurga ağrılarını hafifletir ve doğru dik duruş alışkanlığı kazandırır.</li>
        <li><strong>Çekirdek (Core) Bölgesi Gücü:</strong> Karın ve bel kaslarını güçlendirerek vücut dengesini en üst seviyeye çıkarır.</li>
        <li><strong>Esneklik ve Eklemler:</strong> Kas boyunu uzatarak eklemlere baskı yapmadan esneklik sağlar.</li>
      </ul>
      
      <p>Siz de THEYUMIVERSE bünyesinde Ceren Yılmaz liderliğinde reformer seanslarına katılmak ve kalan ders haklarınızı panelinizden kontrol etmek isterseniz, ders programımıza hemen göz atabilirsiniz.</p>
    `,
    content_en: `
      <p>Reformer pilates has become one of the most prominent exercise models in the wellness and fitness world. Especially in areas like <strong>Arsuz</strong> and <strong>Iskenderun</strong>, it ranks among the first choices for residents and visitors looking for a healthy lifestyle.</p>
      
      <h3>What is Reformer Pilates?</h3>
      <p>Reformer pilates is a holistic exercise method performed on a specially designed sliding carriage with springs and pulleys, stretching and building core muscle structures. Thanks to resistance springs, you can target deep stabilizer muscles beyond basic bodyweight exercises.</p>
      
      <h3>Wellness Experience in Arsuz</h3>
      <p>At THEYUMIVERSE, we designed our studio not just as a gym, but as a premium escape. Harmonized with the serene climate of Arsuz, our Scandinavian interior design, calm tones, and specialized trainers support your physical rejuvenation with every breath you take.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li><strong>Posture Correction:</strong> Alleviates spinal pressure for desk workers and instills healthy standing habits.</li>
        <li><strong>Core Strength:</strong> Empowers abdominal and lower back muscle groups to maximize overall balance.</li>
        <li><strong>Joint Flexibility:</strong> Stretches muscle tissues without placing direct load on joint capsules.</li>
      </ul>
      
      <p>If you want to join Ceren Yılmaz in our specialized reformer sessions and track your remaining classes from your panel, check our schedule page today.</p>
    `,
  },
  'iskenderunda-yoga-akisi-zihinsel-dinginlik': {
    category: 'yoga',
    tags: ['Yoga', 'İskenderun', 'Meditasyon'],
    author: 'Deniz Kaya',
    readingTime: 6,
    date: '2026-07-15',
    title_tr: 'İskenderun’da Yoga ile Zihinsel ve Ruhsal Arınma',
    title_en: 'Mental and Spiritual Purification with Yoga in Iskenderun',
    excerpt_tr: 'Günün yoğun temposundan sıyrılıp, nefes ve asanalar yardımıyla zihninizi sakinleştirin. Evrensel yoga pratiklerinin püf noktaları.',
    excerpt_en: 'Escape the busy schedule of daily life. Quiet your mind through breathing and yoga flow. Tips on universal yoga practices.',
    content_tr: `
      <p>Modern yaşam, zihnimizi sürekli bir uyarılma halinde tutar. <strong>İskenderun</strong> bölgesinin deniz esintisi eşliğinde yoga yapmak, zihindeki gürültüyü azaltmanın en doğal yollarından biridir.</p>
      
      <h3>Asana ve Nefes Uyumu</h3>
      <p>Yoga, sadece fiziksel bir esneme çalışması değildir. Her asana (poz), pranayama (nefes kontrolü) ile birleştiğinde sinir sistemini sakinleştirici bir etki yaratır. Vinyasa akışlarımızda, her hareket nefesin ritmini takip eder.</p>
      
      <h3>Stres Azaltma Prensipleri</h3>
      <p>Egzersiz esnasında salgılanan endorfin hormonunun yanı sıra, yoganın yavaş ve bilinçli doğası parasempatik sinir sistemini aktif hale getirir. Bu da tansiyonu düzenler, kortizol (stres hormonu) seviyesini düşürür ve uyku kalitesini artırır.</p>
      
      <p>Deniz Kaya rehberliğindeki yoga derslerimiz her seviyeye açıktır. Özellikle başlangıç seviyesindekiler için tasarlanmış özel blok ve kemer destekli pratiklerimizle stresi arkamızda bırakıyoruz.</p>
    `,
    content_en: `
      <p>Modern life keeps our minds in a state of constant stimulation. Practicing yoga combined with the sea breeze of <strong>Iskenderun</strong> is one of the most natural ways to quiet mental clutter.</p>
      
      <h3>Asana & Breath Synchronization</h3>
      <p>Yoga is not just dynamic physical stretching. When every posture (asana) is integrated with conscious breath control (pranayama), it triggers a relaxing response in our nervous system. In our Vinyasa flows, movements track the natural rhythm of your breath.</p>
      
      <h3>Principles of Stress Reduction</h3>
      <p>In addition to endorphins released during physical practice, the slow and mindful nature of yoga activates the parasympathetic nervous system. This regulates blood pressure, lowers cortisol (stress hormones), and improves deep sleep quality.</p>
      
      <p>Our yoga sessions guided by Deniz Kaya welcome all practitioners. We integrate props (blocks and straps) especially for beginners to make the practice safe, comfortable, and deeply relaxing.</p>
    `,
  },
  'nefes-egzersizleri-stres-yonetimi': {
    category: 'breathing',
    tags: ['Nefes', 'Wellness', 'Stres Yönetimi'],
    author: 'Deniz Kaya',
    readingTime: 4,
    date: '2026-07-18',
    title_tr: 'Doğru Nefes Alarak Günlük Stresinizi Kontrol Edin',
    title_en: 'Control Your Daily Stress with Correct Breathing Techniques',
    excerpt_tr: 'Doğru nefes egzersizleri ile anksiyete ve stresi dakikalar içinde azaltın. Pilates ve yogada nefes kontrolünün önemi.',
    excerpt_en: 'Reduce anxiety and stress in minutes with breathing exercises. Learn the importance of breath control in pilates & yoga.',
    content_tr: `
      <p>Nefes almak, yaşamımızın en temel fonksiyonu olmasına rağmen çoğumuz gün içinde sığ ve hızlı nefes alarak vücudumuzu kronik bir stres altında tutarız. Doğru nefes almayı öğrenmek, wellness yolculuğumuzun en kritik adımıdır.</p>
      <h3>Diyafram Nefesinin Önemi</h3>
      <p>Diyaframı aktif olarak kullanmak, akciğerlerin alt loblarındaki oksijen kapasitesini artırır ve vücuda güvende olduğu sinyalini gönderir. Bu da kalp ritmini yavaşlatır.</p>
    `,
    content_en: `
      <p>Breathing is the most essential function of life, yet many of us breathe shallowly and rapidly during the day, keeping the body in chronic fight-or-flight stress. Learning to breathe correctly is a critical step in wellness.</p>
      <h3>Diaphragmatic Breathing</h3>
      <p>Using the diaphragm actively increases oxygen capacity in the lower lung lobes, sending signals to the brain that the body is safe, slowing down heart rates.</p>
    `,
  },
  'saglikli-yasam-beslenme-onerileri': {
    category: 'nutrition',
    tags: ['Beslenme', 'Diyet', 'Detoks'],
    author: 'Ceren Yılmaz',
    readingTime: 5,
    date: '2026-07-19',
    title_tr: 'Aktif Egzersiz Yapanlar İçin Temel Beslenme Önerileri',
    title_en: 'Essential Nutrition Tips for Active Practitioners',
    excerpt_tr: 'Pilates ve yoga pratiklerinizi destekleyecek, Hatay Arsuz yöresinin taze otları ve zeytinyağı ile harmanlanan wellness beslenme tavsiyeleri.',
    excerpt_en: 'Nutrition recommendations that support your pilates and yoga practice, blending Arsuz local organic greens and olive oils.',
    content_tr: `
      <p>Beslenme, fiziksel egzersizlerin etkisini pekiştiren en önemli unsurdur. Arsuz bölgesindeki taze zeytinler, soğuk sıkım zeytinyağları ve mevsim yeşillikleri ile harika bir beslenme düzeni oluşturabilirsiniz.</p>
    `,
    content_en: `
      <p>Nutrition is the vital element reinforcing physical exercise. You can build a wonderful clean diet using cold-pressed olive oils, fresh olives, and seasonal greens from the Arsuz region.</p>
    `,
  },
} as any;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const post = BLOG_DATA[slug];
  
  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title_tr} | THEYUMIVERSE Blog`,
    description: post.excerpt_tr,
    openGraph: {
      type: 'article',
      title: post.title_tr,
      description: post.excerpt_tr,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogDetailPage(props: PageProps) {
  const { locale, slug } = await props.params;
  const dict = await getDictionary(locale as Locale);
  const post = BLOG_DATA[slug];

  if (!post) {
    notFound();
  }

  const title = locale === 'tr' ? post.title_tr : post.title_en;
  const content = locale === 'tr' ? post.content_tr : post.content_en;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'description': locale === 'tr' ? post.excerpt_tr : post.excerpt_en,
    'datePublished': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'THEYUMIVERSE',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://theyumiverse.com/images/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://theyumiverse.com/${locale}/blog/${slug}`,
    },
  };

  return (
    <article className="py-16 md:py-24 max-w-3xl mx-auto px-6 space-y-8">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back to Blog Button */}
      <div>
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-xs tracking-widest uppercase font-semibold text-charcoal-500 hover:text-sage-500 transition-premium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {locale === 'tr' ? 'Blog Listesine Dön' : 'Back to Blog'}
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-sand-200 pb-6">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-3 py-1 rounded-full inline-flex items-center">
          <Tag className="w-3 h-3 mr-1" />
          {post.category.replace('_', ' ')}
        </span>
        
        <h1 className="text-3xl md:text-4xl text-charcoal-900 font-light leading-tight">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-xs text-charcoal-500 pt-2">
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1.5 text-sage-500" />
            {post.author}
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            {post.readingTime} dk okuma
          </span>
        </div>
      </div>

      {/* Article Body */}
      <div
        className="prose prose-sand max-w-none text-xs md:text-sm text-charcoal-700 leading-relaxed space-y-6 font-light"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Tags Block */}
      <div className="pt-8 border-t border-sand-200 flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <span
            key={tag}
            className="text-[9px] uppercase tracking-widest bg-sand-100 border border-sand-200 text-charcoal-500 px-3 py-1 rounded-full font-semibold"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
