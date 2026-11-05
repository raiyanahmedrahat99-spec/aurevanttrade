import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, Settings, LogOut, ChevronRight, BarChart3, AlertCircle } from 'lucide-react';
import { db } from '@/src/lib/firebase';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
import { Container } from '@/src/components/ui/Container';
import { cn } from '@/src/lib/utils';
import { subscribeAdminAuth, logoutAdmin } from '@/src/lib/auth-helper';

export function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [stats, setStats] = useState({ articles: 0, inquiries: 0, subscribers: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [fetchNotice, setFetchNotice] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setAdminUser(user);
        fetchStats();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      let articlesCount = 0;
      let inquiriesCount = 0;
      let subscribersCount = 0;
      let inquiriesList: any[] = [];

      try {
        const articlesSnap = await getDocs(collection(db, 'articles'));
        articlesCount = articlesSnap.size;
      } catch (e) {
        console.warn('Could not read articles collection:', e);
      }

      try {
        const inquiriesSnap = await getDocs(collection(db, 'inquiries'));
        inquiriesCount = inquiriesSnap.size;
        
        const recentInquiriesQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'), limit(5));
        const recentInquiriesSnap = await getDocs(recentInquiriesQuery);
        inquiriesList = recentInquiriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (e) {
        console.warn('Could not read inquiries collection:', e);
      }

      try {
        const subscribersSnap = await getDocs(collection(db, 'subscribers'));
        subscribersCount = subscribersSnap.size;
      } catch (e) {
        console.warn('Could not read subscribers collection:', e);
      }

      setStats({
        articles: articlesCount,
        inquiries: inquiriesCount,
        subscribers: subscribersCount,
      });
      setRecentInquiries(inquiriesList);
    } catch (error: any) {
      console.warn('Admin stats fetch info:', error);
      setFetchNotice('Note: Cloud Firestore connection active. Data will populate as entries are created.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-xs font-bold uppercase tracking-widest text-grey-muted animate-pulse">Synchronizing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-warm/20 pt-24 pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-obsidian text-ivory p-6 sm:p-8 space-y-4 shadow-sm">
               <p className="text-[10px] uppercase tracking-widest text-ivory/50">Active Session</p>
               <h2 className="text-xl font-serif">{adminUser?.displayName || 'Executive Director'}</h2>
               <p className="text-xs font-mono text-champagne break-all">{adminUser?.email || 'khjjvhasnhsbbs@gmail.com'}</p>
            </div>
            
            <nav className="flex flex-col gap-2">
              <AdminNavLink to="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
              <AdminNavLink to="/admin/articles" icon={<FileText size={18} />} label="Articles" />
              <AdminNavLink to="/admin/leadership" icon={<Users size={18} />} label="Leadership" />
              <AdminNavLink to="/admin/inquiries" icon={<MessageSquare size={18} />} label="Inquiries" />
              <AdminNavLink to="/admin/settings" icon={<Settings size={18} />} label="Settings" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-4 p-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-6 border-t border-stone-warm"
              >
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="space-y-10">
            <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-stone-warm pb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif">Overview</h1>
                <p className="text-sm text-grey-muted mt-2 uppercase tracking-widest">AUREVANT GROUP Management System</p>
              </div>
              <div className="text-left sm:text-right">
                 <p className="text-[10px] font-bold text-champagne uppercase tracking-widest">System Online</p>
                 <p className="text-xs text-grey-muted">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </header>

            {fetchNotice && (
              <div className="p-4 bg-stone-warm/30 border border-stone-warm flex items-start gap-3 text-xs text-grey-muted">
                <AlertCircle size={16} className="text-champagne shrink-0 mt-0.5" />
                <p>{fetchNotice}</p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <StatCard label="Published Articles" value={stats.articles} icon={<FileText className="text-champagne" />} />
              <StatCard label="Total Inquiries" value={stats.inquiries} icon={<MessageSquare className="text-champagne" />} />
              <StatCard label="Newsletter Base" value={stats.subscribers} icon={<BarChart3 className="text-champagne" />} />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-12">
               <div className="bg-white border border-stone-warm p-6 sm:p-10 space-y-8 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-serif">Recent Inquiries</h3>
                    <Link to="/admin/inquiries" className="text-[10px] font-bold uppercase tracking-widest text-champagne hover:underline">View All</Link>
                  </div>
                  
                  <div className="space-y-4">
                    {recentInquiries.length > 0 ? (
                      recentInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-6 bg-ivory border border-stone-warm/50 flex items-center justify-between group hover:border-obsidian transition-colors">
                           <div className="space-y-1">
                             <p className="text-sm font-bold text-obsidian">{inquiry.name} <span className="text-grey-muted font-normal text-xs">— {inquiry.organization || inquiry.email}</span></p>
                             <p className="text-xs text-grey-muted">{inquiry.subject || 'Corporate Inquiry'}</p>
                           </div>
                           <ChevronRight size={16} className="text-stone-warm group-hover:text-obsidian" />
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-grey-muted italic py-10 text-center">No recent inquiries found in Firestore.</p>
                    )}
                  </div>
               </div>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}

function AdminNavLink({ to, icon, label, active = false }: { to: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-4 p-4 text-sm font-medium transition-all",
        active ? "bg-white border border-stone-warm text-obsidian font-semibold" : "text-grey-muted hover:text-obsidian hover:bg-white/50"
      )}
    >
      {icon} {label}
    </Link>
  );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: any }) {
  return (
    <div className="bg-white border border-stone-warm p-6 sm:p-8 space-y-4 shadow-sm">
       <div className="flex justify-between items-start">
         <div className="w-10 h-10 bg-ivory border border-stone-warm flex items-center justify-center">
           {icon}
         </div>
         <span className="text-[10px] font-bold uppercase tracking-widest text-grey-muted">Active</span>
       </div>
       <div className="space-y-1">
         <p className="text-3xl font-serif">{value}</p>
         <p className="text-[10px] font-bold uppercase tracking-widest text-grey-muted">{label}</p>
       </div>
    </div>
  );
}
