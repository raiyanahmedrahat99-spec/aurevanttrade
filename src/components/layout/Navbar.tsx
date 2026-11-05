import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { Logo } from '@/src/components/ui/Logo';
import { ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Journal', href: '/journal' },
  { name: 'Global Presence', href: '/global-presence' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Is transparent light text mode (e.g. at the top of the Home page over the dark hero image)
  const isDarkHero = location.pathname === '/' && !scrolled;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 py-4',
        isDarkHero
          ? 'bg-transparent text-white'
          : scrolled
          ? 'bg-ivory/70 backdrop-blur-md border-b border-stone-warm/30 shadow-xs text-obsidian'
          : 'bg-transparent text-obsidian'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand */}
        <Link 
          to="/" 
          className={cn(
            "text-xl md:text-2xl font-serif font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-3 group transition-colors",
            isDarkHero ? "text-white" : "text-obsidian"
          )}
        >
          <motion.div whileHover={{ rotate: 8, scale: 1.06 }} transition={{ duration: 0.3 }}>
            <Logo 
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" 
              variant={isDarkHero ? 'light' : 'dark'} 
            />
          </motion.div>
          <span className="tracking-tight">AUREVANT GROUP</span>
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'transition-colors whitespace-nowrap shrink-0 relative py-1 text-xs tracking-wider uppercase font-semibold',
                isDarkHero
                  ? location.pathname === link.href 
                    ? 'text-white font-bold' 
                    : 'text-white/80 hover:text-white'
                  : location.pathname === link.href 
                    ? 'text-obsidian font-bold' 
                    : 'text-grey-muted hover:text-obsidian'
              )}
            >
              {link.name}
              {location.pathname === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-champagne"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Zone 3: Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest whitespace-nowrap shrink-0 shadow-sm transition-all",
                isDarkHero
                  ? "bg-white/10 hover:bg-white hover:text-obsidian text-white border border-white/30 backdrop-blur-sm"
                  : "bg-obsidian hover:bg-champagne hover:text-obsidian text-ivory"
              )}
            >
              <span>Contact Us</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
          
          {/* Animated 3-Line Hamburger Navbar Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={cn(
              "lg:hidden w-11 h-11 rounded-full border flex flex-col items-center justify-center gap-1.5 p-2.5 shadow-sm transition-all cursor-pointer relative z-50 focus:outline-none backdrop-blur-sm",
              isDarkHero
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-stone-warm bg-white/70 text-obsidian hover:bg-white hover:border-obsidian/30"
            )}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {/* Top Line */}
            <motion.span
              animate={isOpen 
                ? { rotate: 45, y: 8, backgroundColor: isDarkHero ? '#FFFFFF' : '#141414' } 
                : { rotate: 0, y: 0, backgroundColor: isDarkHero ? '#FFFFFF' : '#141414' }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-5 h-[2px] rounded-full block origin-center"
            />
            {/* Middle Line */}
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, backgroundColor: '#C5A880' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-5 h-[2px] rounded-full block origin-center"
            />
            {/* Bottom Line */}
            <motion.span
              animate={isOpen 
                ? { rotate: -45, y: -8, backgroundColor: isDarkHero ? '#FFFFFF' : '#141414' } 
                : { rotate: 0, y: 0, backgroundColor: isDarkHero ? '#FFFFFF' : '#141414' }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-5 h-[2px] rounded-full block origin-center"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-[73px] bg-obsidian/40 backdrop-blur-[3px] z-40"
            />

            {/* Slide & Fade Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-ivory/95 backdrop-blur-md border-b border-stone-warm shadow-2xl overflow-hidden z-50 text-obsidian"
            >
              <div className="flex flex-col p-6 sm:p-8 space-y-3 max-w-lg mx-auto">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne mb-2">
                  Navigation
                </p>

                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center justify-between text-base sm:text-lg font-serif py-2.5 border-b border-stone-warm/40 group transition-all',
                        location.pathname === link.href ? 'text-obsidian font-bold pl-2 border-champagne' : 'text-grey-muted hover:text-obsidian hover:pl-2'
                      )}
                    >
                      <span className="group-hover:text-champagne transition-colors">
                        {link.name}
                      </span>
                      <ArrowRight 
                        size={15} 
                        className={cn(
                          'transition-transform duration-300 text-champagne',
                          location.pathname === link.href ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        )} 
                      />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.12, duration: 0.4 }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="w-full py-4 text-center text-xs font-semibold uppercase tracking-widest text-ivory bg-obsidian hover:bg-champagne hover:text-obsidian transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Contact AUREVANT</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
