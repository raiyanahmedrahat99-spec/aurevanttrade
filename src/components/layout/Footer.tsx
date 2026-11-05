import { Link } from 'react-router-dom';
import { Logo } from '@/src/components/ui/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-ivory pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight flex items-center gap-3">
              <Logo className="w-8 h-8 shrink-0" variant="light" />
              <span>AUREVANT GROUP</span>
            </Link>
            <p className="text-sm text-ivory/60 font-serif italic">
              Built on Vision. Defined by Excellence.
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed">
              AUREVANT GROUP is an international corporate profile and editorial platform focused on the built environment, from architecture to urban futures.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-champagne">Main Navigation</h4>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li><Link to="/" className="hover:text-ivory transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-ivory transition-colors">About Us</Link></li>
              <li><Link to="/leadership" className="hover:text-ivory transition-colors">Our Leadership</Link></li>
              <li><Link to="/expertise" className="hover:text-ivory transition-colors">Our Expertise</Link></li>
              <li><Link to="/journal" className="hover:text-ivory transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-ivory transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-champagne">Expertise</h4>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li><Link to="/expertise/architecture" className="hover:text-ivory transition-colors">Architecture & Design</Link></li>
              <li><Link to="/expertise/property" className="hover:text-ivory transition-colors">Property & Markets</Link></li>
              <li><Link to="/expertise/engineering" className="hover:text-ivory transition-colors">Engineering & Construction</Link></li>
              <li><Link to="/expertise/sustainability" className="hover:text-ivory transition-colors">Sustainable Development</Link></li>
              <li><Link to="/expertise/urban" className="hover:text-ivory transition-colors">Urban Planning</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6 text-champagne">Connect</h4>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-ivory/40 mb-2">General Enquiries</p>
                <a href="mailto:info@aurevantgroup.com" className="text-sm hover:text-champagne transition-colors">info@aurevantgroup.com</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ivory/40 mb-2">Editorial Desk</p>
                <a href="mailto:journal@aurevantgroup.com" className="text-sm hover:text-champagne transition-colors">journal@aurevantgroup.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-ivory transition-colors">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-ivory transition-colors">Terms of Use</Link>
            <Link to="/editorial" className="hover:text-ivory transition-colors">Editorial Policy</Link>
          </div>
          <p>© {currentYear} AUREVANT GROUP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
