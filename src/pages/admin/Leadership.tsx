import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, ArrowLeft, Users } from 'lucide-react';
import { auth, db } from '@/src/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Container } from '@/src/components/ui/Container';

import { subscribeAdminAuth } from '@/src/lib/auth-helper';

export function AdminLeadership() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchProfiles();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchProfiles = async () => {
    try {
      const q = query(collection(db, 'leadership'), orderBy('order', 'asc'));
      const snap = await getDocs(q);
      setProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.warn('Using offline fallback leadership profiles view.');
      setProfiles([
        {
          id: 'lead_1',
          name: 'Mahir Rahman',
          title: 'Chairman of the Board',
          email: 'mahir.rahman@aurevantgroup.com',
          bio: 'Focused on long-term direction, responsible governance, and the development of a clear organisational vision.',
          image: '/src/assets/images/portrait_chairman_mahir_1793879140897.jpg',
          order: 1
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
              <h1 className="text-4xl font-serif">Leadership Management</h1>
              <p className="text-sm text-grey-muted uppercase tracking-widest">Manage corporate profiles and governance</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne transition-colors">
              <Plus size={16} /> Add Profile
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <div key={profile.id} className="bg-white border border-stone-warm p-6 space-y-4">
                  <div className="aspect-[3/4] bg-stone-warm overflow-hidden">
                    {profile.imageUrl ? (
                      <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-obsidian/10 font-serif text-4xl">
                        {profile.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">{profile.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-champagne">{profile.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-stone-warm p-20 text-center space-y-4">
                 <div className="w-16 h-16 bg-ivory text-grey-muted flex items-center justify-center mx-auto mb-6">
                   <Users size={32} />
                 </div>
                 <h3 className="text-2xl font-serif italic text-grey-muted">No Profiles Found</h3>
                 <p className="text-sm text-grey-muted uppercase tracking-widest">Initialise the directory by adding leadership profiles.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
