import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Edit2, Eye, Trash2, ArrowLeft } from 'lucide-react';
import { auth, db } from '@/src/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Container } from '@/src/components/ui/Container';
import { cn, formatDate } from '@/src/lib/utils';

import { subscribeAdminAuth } from '@/src/lib/auth-helper';

export function AdminArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchArticles();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const q = query(collection(db, 'articles'), orderBy('publishedAt', 'desc'));
      const snap = await getDocs(q);
      setArticles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.warn('Using offline fallback articles view.');
      setArticles([
        {
          id: 'sample_art_1',
          title: 'The Architecture of Modern Urban Density',
          slug: 'architecture-modern-urban-density',
          categoryName: 'Architecture & Design',
          authorName: 'Nadia Karim',
          publishedAt: new Date(),
          excerpt: 'Examining how contemporary high-rise density intersects with public civic spaces.',
          heroImage: '/src/assets/images/expertise_architecture_1793877172956.jpg',
          status: 'published'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-stone-warm/20 pt-24 pb-20">
      <Container>
        <div className="space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stone-warm pb-8">
            <div className="space-y-4">
              <Link to="/admin" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-grey-muted hover:text-obsidian transition-colors">
                <ArrowLeft size={12} /> Dashboard
              </Link>
              <h1 className="text-4xl font-serif">Journal Management</h1>
              <p className="text-sm text-grey-muted uppercase tracking-widest">Create and edit editorial content</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne transition-colors">
              <Plus size={16} /> New Article
            </button>
          </header>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-warm" size={18} />
              <input 
                type="text" 
                placeholder="Search articles by title or author..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-stone-warm focus:border-obsidian outline-none text-sm"
              />
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 px-6 py-4 bg-white border border-stone-warm text-xs font-semibold uppercase tracking-widest hover:bg-ivory transition-colors">
                 <Filter size={16} /> Filter
               </button>
            </div>
          </div>

          {/* Articles Table/List */}
          <div className="bg-white border border-stone-warm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-ivory border-b border-stone-warm text-[10px] uppercase tracking-widest text-grey-muted font-bold">
                  <th className="px-8 py-6">Article Details</th>
                  <th className="px-8 py-6">Category</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Published</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-warm/30">
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <tr key={article.id} className="group hover:bg-ivory/50 transition-colors">
                      <td className="px-8 py-8">
                         <div className="flex items-center gap-4">
                           <div className="w-16 h-10 bg-stone-warm overflow-hidden shrink-0">
                             <img src={article.heroImage} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                             <p className="text-sm font-bold text-obsidian">{article.title}</p>
                             <p className="text-[10px] uppercase tracking-widest text-grey-muted mt-1">Author: {article.authorName}</p>
                           </div>
                         </div>
                      </td>
                      <td className="px-8 py-8">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-champagne">{article.categoryId}</span>
                      </td>
                      <td className="px-8 py-8">
                        <span className={cn(
                          "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border",
                          article.status === 'published' ? "bg-green-50 text-green-700 border-green-200" : "bg-stone-50 text-grey-muted border-stone-200"
                        )}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-xs text-grey-muted">
                        {article.publishedAt ? formatDate(article.publishedAt) : '—'}
                      </td>
                      <td className="px-8 py-8 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:text-obsidian text-grey-muted"><Edit2 size={16} /></button>
                          <button className="p-2 hover:text-obsidian text-grey-muted"><Eye size={16} /></button>
                          <button className="p-2 hover:text-red-500 text-grey-muted"><Trash2 size={16} /></button>
                        </div>
                        <button className="p-2 lg:hidden"><MoreVertical size={16} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-sm text-grey-muted italic">
                      No articles found. Initialise the journal by creating your first piece of editorial content.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
}
