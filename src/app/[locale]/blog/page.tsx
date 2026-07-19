'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { getDictionary, Locale } from '@/lib/dictionary';
import { motion } from 'framer-motion';
import { Search, Tag, BookOpen, User, Clock, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const MOCK_BLOGS = [
  {
    slug: 'arsuzda-reformer-pilates-faydalari',
    category: 'reformer_pilates',
    tags: ['Reformer Pilates', 'Arsuz', 'Sıkılaşma'],
    author: 'Ceren Yılmaz',
    readingTime: 5,
    date: '2026-07-10',
    title_tr: 'Arsuz’da Reformer Pilates: Bedensel Dönüşümün Anahtarı',
    title_en: 'Reformer Pilates in Arsuz: Key to Physical Transformation',
    excerpt_tr: 'Reformer pilatesin omurga sağlığı, duruş bozuklukları ve esneklik üzerindeki faydalarını ve stüdyomuzdaki ayrıcalıkları keşfedin.',
    excerpt_en: 'Discover the benefits of reformer pilates on spinal health, posture correction, and flexibility inside our luxury studio.',
  },
  {
    slug: 'iskenderunda-yoga-akisi-zihinsel-dinginlik',
    category: 'yoga',
    tags: ['Yoga', 'İskenderun', 'Meditasyon'],
    author: 'Deniz Kaya',
    readingTime: 6,
    date: '2026-07-15',
    title_tr: 'İskenderun’da Yoga ile Zihinsel ve Ruhsal Arınma',
    title_en: 'Mental and Spiritual Purification with Yoga in Iskenderun',
    excerpt_tr: 'Günün yoğun temposundan sıyrılıp, nefes ve asanalar yardımıyla zihninizi sakinleştirin. Evrensel yoga pratiklerinin püf noktaları.',
    excerpt_en: 'Escape the busy schedule of daily life. Quiet your mind through breathing and yoga flow. Tips on universal yoga practices.',
  },
  {
    slug: 'nefes-egzersizleri-stres-yonetimi',
    category: 'breathing',
    tags: ['Nefes', 'Wellness', 'Stres Yönetimi'],
    author: 'Deniz Kaya',
    readingTime: 4,
    date: '2026-07-18',
    title_tr: 'Doğru Nefes Alarak Günlük Stresinizi Kontrol Edin',
    title_en: 'Control Your Daily Stress with Correct Breathing Techniques',
    excerpt_tr: 'Doğru nefes egzersizleri ile anksiyete ve stresi dakikalar içinde azaltın. Pilates ve yogada nefes kontrolünün önemi.',
    excerpt_en: 'Reduce anxiety and stress in minutes with breathing exercises. Learn the importance of breath control in pilates & yoga.',
  },
  {
    slug: 'saglikli-yasam-beslenme-onerileri',
    category: 'nutrition',
    tags: ['Beslenme', 'Diyet', 'Detoks'],
    author: 'Ceren Yılmaz',
    readingTime: 5,
    date: '2026-07-19',
    title_tr: 'Aktif Egzersiz Yapanlar İçin Temel Beslenme Önerileri',
    title_en: 'Essential Nutrition Tips for Active Practitioners',
    excerpt_tr: 'Pilates ve yoga pratiklerinizi destekleyecek, Hatay Arsuz yöresinin taze otları ve zeytinyağı ile harmanlanan wellness beslenme tavsiyeleri.',
    excerpt_en: 'Nutrition recommendations that support your pilates and yoga practice, blending Arsuz local organic greens and olive oils.',
  },
];

export default function BlogListPage(props: PageProps) {
  const params = use(props.params);
  const locale = (params.locale as Locale) || 'tr';
  const [dict, setDict] = useState<any>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = [
    { id: 'all', label_tr: 'Tümü', label_en: 'All' },
    { id: 'yoga', label_tr: 'Yoga', label_en: 'Yoga' },
    { id: 'reformer_pilates', label_tr: 'Reformer Pilates', label_en: 'Reformer Pilates' },
    { id: 'breathing', label_tr: 'Nefes', label_en: 'Breathing' },
    { id: 'nutrition', label_tr: 'Beslenme', label_en: 'Nutrition' },
  ];

  // Filtering blogs
  const filteredBlogs = useMemo(() => {
    return MOCK_BLOGS.filter((post) => {
      const title = locale === 'tr' ? post.title_tr : post.title_en;
      const excerpt = locale === 'tr' ? post.excerpt_tr : post.excerpt_en;
      
      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, locale]);

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': locale === 'tr' ? 'THEYUMIVERSE Wellness Blog' : 'THEYUMIVERSE Wellness Blog',
    'description': locale === 'tr' ? 'Yoga, pilates ve sağlıklı yaşam makaleleri.' : 'Yoga, pilates and wellness articles.',
    'publisher': {
      '@type': 'Organization',
      'name': 'THEYUMIVERSE',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://theyumiverse.com/images/logo.png',
      },
    },
    'blogPost': filteredBlogs.map((post) => ({
      '@type': 'BlogPosting',
      'headline': locale === 'tr' ? post.title_tr : post.title_en,
      'alternativeHeadline': locale === 'tr' ? post.excerpt_tr : post.excerpt_en,
      'genre': post.category,
      'wordcount': post.readingTime * 150,
      'datePublished': post.date,
      'author': {
        '@type': 'Person',
        'name': post.author,
      },
      'url': `https://theyumiverse.com/${locale}/blog/${post.slug}`,
    })),
  };

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 space-y-12">
      {/* Dynamic Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] tracking-widest uppercase text-sage-500 font-bold block">
          {dict.nav.blog}
        </span>
        <h1 className="text-4xl font-light text-charcoal-900 tracking-tight">
          {dict.blog_page.title}
        </h1>
        <p className="text-xs opacity-75 leading-relaxed font-light">
          {dict.blog_page.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/40 p-5 rounded-3xl border border-white/50 backdrop-blur-md">
        {/* Categories Toolbar */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-[10px] uppercase tracking-widest font-semibold px-4 py-2.5 rounded-full border transition-premium cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-900 text-white border-charcoal-900 shadow-sm'
                  : 'bg-sand-50/80 border-sand-200 text-charcoal-900 hover:bg-sand-100'
              }`}
            >
              {locale === 'tr' ? cat.label_tr : cat.label_en}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder={dict.blog_page.search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-white border border-sand-200 rounded-full pl-10 pr-4 py-2.5 outline-none focus:border-sage-500 transition-premium"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
        </div>
      </div>

      {/* Article List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-sand-200 p-8 rounded-3xl space-y-6 flex flex-col justify-between hover:shadow-md transition-premium"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-sage-700 bg-sage-50 border border-sage-100 px-3 py-1 rounded-full flex items-center">
                    <Tag className="w-3 h-3 mr-1 animate-pulse" />
                    {post.category === 'reformer_pilates' ? 'Reformer Pilates' : (post.category === 'yoga' ? 'Yoga' : (post.category === 'breathing' ? 'Nefes' : 'Beslenme'))}
                  </span>
                </div>

                <h2 className="text-xl font-light text-charcoal-900 leading-tight">
                  <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-sage-500 transition-premium">
                    {locale === 'tr' ? post.title_tr : post.title_en}
                  </Link>
                </h2>

                <p className="text-xs text-charcoal-700 leading-relaxed font-light line-clamp-3">
                  {locale === 'tr' ? post.excerpt_tr : post.excerpt_en}
                </p>
              </div>

              <div className="pt-6 border-t border-sand-100 flex flex-wrap gap-4 justify-between items-center text-[10px] text-charcoal-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-sage-500" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {post.readingTime} dk
                  </span>
                </div>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-sage-700 hover:text-charcoal-900 font-semibold uppercase tracking-widest flex items-center"
                >
                  {dict.common.read_more}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </motion.article>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center text-xs tracking-wider text-charcoal-500 italic opacity-60 bg-white/20 rounded-3xl border border-dashed border-sand-200">
            {locale === 'tr' ? 'Aradığınız kriterlerde makale bulunamadı.' : 'No articles match your criteria.'}
          </div>
        )}
      </div>
    </div>
  );
}
