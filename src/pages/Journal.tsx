import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';
import { mockArticles } from '@/src/data/mockArticles';
import { formatDate } from '@/src/lib/utils';
import { cn } from '@/src/lib/utils';

const categories = [
  { id: 'all', name: 'All Perspectives' },
  { id: 'property', name: 'Property & Markets' },
  { id: 'architecture', name: 'Architecture & Design' },
  { id: 'engineering', name: 'Engineering & Construction' },
  { id: 'sustainability', name: 'Sustainable Development' },
  { id: 'urban', name: 'Urban Planning' },
];

export function Journal() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = activeCategory === 'all'
    ? mockArticles
    : mockArticles.filter(a => a.categoryId === activeCategory);

  return (
    <div className="pt-24 bg-ivory min-h-screen">
      <Section spacing="md" className="border-b border-stone-warm">
        <Container>
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif">Journal</h1>
            <p className="text-xl font-serif italic text-grey-muted leading-relaxed max-w-2xl">
              “Perspectives on the disciplines shaping the built environment.”
            </p>
          </div>
        </Container>
      </Section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-ivory/80 backdrop-blur-md border-b border-stone-warm">
        <Container>
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all",
                  activeCategory === cat.id
                    ? "bg-obsidian text-ivory"
                    : "text-grey-muted hover:text-obsidian"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col cursor-pointer"
              >
                <Link to={`/journal/${article.slug}`} className="space-y-6 flex-grow">
                  <div className="aspect-[16/10] overflow-hidden bg-stone-warm relative shadow-sm">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-ivory/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-obsidian border border-stone-warm shadow-sm">
                         {article.categoryName || article.categoryId}
                       </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-serif leading-snug group-hover:text-champagne transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-grey-muted leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
                <div className="mt-8 pt-6 border-t border-stone-warm flex items-center justify-between text-[10px] uppercase tracking-widest text-grey-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-obsidian">{article.authorName}</span>
                    <span className="opacity-40">/</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <span>{article.readingTime} min read</span>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
