import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Settings as SettingsIcon, ArrowLeft, Save, Globe, Database, Shield } from 'lucide-react';
import { auth } from '@/src/lib/firebase';
import { Container } from '@/src/components/ui/Container';

import { subscribeAdminAuth } from '@/src/lib/auth-helper';

export function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
              <h1 className="text-4xl font-serif">System Settings</h1>
              <p className="text-sm text-grey-muted uppercase tracking-widest">Global configuration and preferences</p>
            </div>
            <button className="flex items-center gap-3 px-10 py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne transition-colors">
              <Save size={16} /> Save Changes
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <SettingSection 
                title="Branding & Identity" 
                description="Configure the primary brand elements."
                icon={<Globe size={20} className="text-champagne" />}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Brand Name</label>
                    <input type="text" defaultValue="AUREVANT GROUP" className="w-full p-4 bg-white border border-stone-warm outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Tagline</label>
                    <input type="text" defaultValue="Built on Vision. Defined by Excellence." className="w-full p-4 bg-white border border-stone-warm outline-none text-sm" />
                  </div>
                </div>
              </SettingSection>

              <SettingSection 
                title="System Metadata" 
                description="SEO and search engine parameters."
                icon={<Shield size={20} className="text-champagne" />}
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Default Page Title</label>
                    <input type="text" defaultValue="AUREVANT GROUP – Built on Vision. Defined by Excellence." className="w-full p-4 bg-white border border-stone-warm outline-none text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Default Meta Description</label>
                    <textarea defaultValue="AUREVANT GROUP explores the ideas, disciplines, and decisions shaping the built environment." className="w-full p-4 bg-white border border-stone-warm outline-none text-sm h-32 resize-none" />
                  </div>
                </div>
              </SettingSection>
            </div>

            <div className="space-y-12">
              <div className="bg-obsidian text-ivory p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Database size={20} className="text-champagne" />
                  <h3 className="text-lg font-serif">Environment</h3>
                </div>
                <div className="space-y-4">
                   <div className="space-y-1">
                     <p className="text-[10px] uppercase tracking-widest text-ivory/40 font-bold">Database Instance</p>
                     <p className="text-xs font-mono">gen-lang-client-0265408991</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] uppercase tracking-widest text-ivory/40 font-bold">Server Version</p>
                     <p className="text-xs font-mono">2.4.0-CORE-STABLE</p>
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] uppercase tracking-widest text-ivory/40 font-bold">Node Identity</p>
                     <p className="text-xs font-mono">ASIA-SE-1-PROD</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function SettingSection({ title, description, icon, children }: { title: string, description: string, icon: any, children: any }) {
  return (
    <div className="bg-white border border-stone-warm p-10 space-y-10">
      <div className="flex items-start gap-6 border-b border-stone-warm pb-8">
        <div className="w-12 h-12 bg-ivory border border-stone-warm flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-serif">{title}</h2>
          <p className="text-xs text-grey-muted uppercase tracking-widest">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
