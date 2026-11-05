import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Clock, Calendar, User } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';
import { mockArticles } from '@/src/data/mockArticles';
import { formatDate } from '@/src/lib/utils';

export function ArticleDetail() {
  const { slug } = useParams();
  const article = mockArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <Container className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-serif mb-6">Article Not Found</h1>
        <Link to="/journal" className="text-champagne hover:underline">Return to Journal</Link>
      </Container>
    );
  }

  return (
    <div className="pt-24 bg-white">
      {/* Article Header */}
      <header className="border-b border-stone-warm bg-ivory">
        <Container className="py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Link 
              to="/journal" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-grey-muted hover:text-obsidian transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to Journal
            </Link>
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-champagne">
                {article.categoryName || article.categoryId}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight text-obsidian">
                {article.title}
              </h1>
              <p className="text-xl md:text-2xl font-serif italic text-grey-muted leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-stone-warm/50 text-[10px] uppercase tracking-widest text-grey-muted">
              <div className="flex items-center gap-2">
                <User size={14} className="text-champagne" />
                <span className="font-bold text-obsidian">{article.authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-champagne" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-champagne" />
                <span>{article.readingTime} min read</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </header>

      {/* Hero Image */}
      <div className="w-full aspect-[21/9] overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <Section spacing="lg">
        <Container size="sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 relative">
            {/* Main Content */}
            <div 
              className="prose prose-stone prose-lg max-w-none 
                prose-headings:font-serif prose-headings:font-normal
                prose-blockquote:border-l-0 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-serif prose-blockquote:text-obsidian prose-blockquote:py-10 prose-blockquote:px-0
                prose-a:text-champagne prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Sidebar / Social Share */}
            <div className="lg:sticky lg:top-32 h-fit space-y-10">
               <div className="space-y-4">
                 <p className="text-[10px] uppercase tracking-[0.3em] text-grey-muted font-bold">Share Perspective</p>
                 <div className="flex lg:flex-col gap-4">
                   <button className="w-10 h-10 border border-stone-warm flex items-center justify-center hover:bg-obsidian hover:text-ivory transition-all">
                     <Share2 size={16} />
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related / Next Articles */}
      <Section spacing="lg" className="bg-ivory border-t border-stone-warm">
        <Container>
          <div className="mb-12 flex justify-between items-end">
             <h2 className="text-3xl font-serif">Related Perspectives</h2>
             <Link to="/journal" className="text-xs font-semibold uppercase tracking-widest text-champagne">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {mockArticles.filter(a => a.id !== article.id).slice(0, 2).map(related => (
              <Link key={related.id} to={`/journal/${related.slug}`} className="group space-y-6">
                <div className="aspect-[16/9] overflow-hidden bg-stone-warm">
                  <img src={related.heroImage} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="space-y-3">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-champagne">{related.categoryName}</span>
                   <h3 className="text-2xl font-serif group-hover:text-champagne transition-colors">{related.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
