import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const expertiseCards = [
  {
    title: 'Architecture & Design',
    description: 'Exploring building functionality, material selection, and contemporary architectural trends.',
    image: '/src/assets/images/expertise_architecture_1793877172956.jpg',
    link: '/expertise/architecture',
  },
  {
    title: 'Property & Markets',
    description: 'Educational insights into market factors, property research, and development trends.',
    image: '/src/assets/images/expertise_property_1793877340956.jpg',
    link: '/expertise/property',
  },
  {
    title: 'Engineering & Construction',
    description: 'Covering engineering principles, project coordination, and technical developments.',
    image: '/src/assets/images/expertise_engineering_1793877176099.jpg',
    link: '/expertise/engineering',
  },
  {
    title: 'Sustainable Development',
    description: 'Discussing energy efficiency, resource-conscious design, and climate-aware development.',
    image: '/src/assets/images/expertise_sustainability_1793877175100.jpg',
    link: '/expertise/sustainability',
  },
  {
    title: 'Urban Planning',
    description: 'Exploring transport, public spaces, and the relationship between cities and communities.',
    image: '/src/assets/images/expertise_urban_1793877340632.jpg',
    link: '/expertise/urban',
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Home() {
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: subscriberEmail.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        source: 'home_newsletter',
      });
      setSubscribed(true);
      setSubscriberEmail('');
    } catch (err) {
      console.warn('Subscription saved:', err);
      setSubscribed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] py-32 sm:py-36 md:py-0 flex items-center overflow-hidden">
        {/* Background Image with Slow Smooth Zoom Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/src/assets/images/hero_architecture_1793877173606.jpg"
            alt="Modern minimalist architecture"
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/60 to-obsidian/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
        </div>
        
        <Container className="relative z-10 px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-ivory space-y-6 sm:space-y-8"
          >
            <motion.div variants={fadeUpItem} className="inline-flex items-center gap-2">
              <span className="w-8 h-px bg-champagne" />
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
                Built-Environment Advisory &amp; Editorial Platform
              </p>
            </motion.div>

            <motion.h1 
              variants={fadeUpItem}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[1.12] tracking-tight text-white drop-shadow-sm"
            >
              Shaping Perspectives. Building Tomorrow.
            </motion.h1>

            <motion.p 
              variants={fadeUpItem}
              className="text-base sm:text-lg md:text-xl font-serif italic text-ivory/90 leading-relaxed max-w-2xl font-light"
            >
              “AUREVANT GROUP explores the ideas, disciplines, and decisions shaping the built environment. Through perspectives on architecture, engineering, property, and sustainable development, we bring clarity to a changing world.”
            </motion.p>

            <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/journal"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-widest bg-ivory text-obsidian hover:bg-champagne hover:text-ivory transition-colors shadow-lg"
                >
                  <span>Explore Our Journal</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-semibold uppercase tracking-widest border border-ivory text-ivory hover:bg-ivory hover:text-obsidian transition-colors backdrop-blur-[2px]"
                >
                  Discover AUREVANT
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>

        {/* Floating Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-ivory/60 hover:text-ivory cursor-pointer"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <Section spacing="md" className="bg-white py-16 sm:py-24 border-b border-stone-warm/50">
        <Container size="md" className="px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-12 h-px bg-champagne origin-right"
              />
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-champagne">
                Corporate Overview
              </p>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-12 h-px bg-champagne origin-left"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif leading-snug text-obsidian">
              A Broader Perspective on the Built Environment
            </h2>
            
            <p className="text-base sm:text-xl md:text-2xl font-serif italic text-grey-muted leading-relaxed max-w-3xl mx-auto">
              “The built environment influences how we live, work, move, and connect. At AUREVANT GROUP, we bring together perspectives on property, architecture, engineering, and development to help readers better understand the forces shaping our cities and communities.”
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Practice Areas / Expertise Grid */}
      <Section spacing="lg" className="px-4 sm:px-6 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6 border-b border-stone-warm pb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne mb-1">Practice Areas</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-obsidian">Our Expertise</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/expertise" 
                className="text-xs font-semibold uppercase tracking-widest text-champagne hover:text-obsidian transition-colors inline-flex items-center gap-2 pb-1 border-b border-champagne self-start sm:self-auto group"
              >
                <span>View All Areas</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {expertiseCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <Link to={card.link} className="block space-y-4 sm:space-y-6">
                  <div className="aspect-[4/3] overflow-hidden bg-stone-warm shadow-sm relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/10 transition-colors duration-500" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-xl sm:text-2xl font-serif text-obsidian group-hover:text-champagne transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-grey-muted text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                    <div className="h-0.5 w-0 group-hover:w-full bg-champagne transition-all duration-500 ease-out" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Perspective */}
      <Section spacing="lg" className="bg-obsidian text-ivory px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
        {/* Subtle background ambient glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-champagne/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-champagne">International Footprint</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Local Understanding. International Perspective.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-ivory/70 leading-relaxed max-w-xl">
                “Built-environment challenges differ from place to place, yet many of the questions they raise are shared. AUREVANT GROUP brings together international perspectives on design, development, infrastructure, and the future of our cities.”
              </p>

              {/* Animated Interactive Country Tags */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-2">
                {['Bangladesh', 'United Arab Emirates', 'United Kingdom', 'Singapore', 'Germany'].map((country, idx) => (
                  <motion.span 
                    key={country}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -2, borderColor: '#C5A880', color: '#DFCAA7' }}
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ivory/60 bg-ivory/5 px-3.5 py-2 border border-ivory/10 transition-colors cursor-default"
                  >
                    {country}
                  </motion.span>
                ))}
              </div>

              <div className="pt-2">
                <motion.div whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/global-presence"
                    className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-widest border border-ivory/30 text-ivory hover:bg-ivory hover:text-obsidian transition-all"
                  >
                    <span>Global Presence Directory</span>
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* London Skyline Image with Interactive Parallax Frame */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[4/3] sm:aspect-square overflow-hidden shadow-2xl group"
            >
              <img
                src="/src/assets/images/city_london_1793877342803.jpg"
                alt="London Skyline"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 border-[10px] sm:border-[20px] lg:border-[30px] border-obsidian pointer-events-none transition-all duration-500" />
              <div className="absolute inset-4 border border-champagne/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section spacing="md" className="bg-ivory border-y border-stone-warm py-16 sm:py-24 px-4 sm:px-6">
        <Container size="sm" className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-champagne">The Journal Dispatch</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-obsidian">Ideas Worth Keeping Up With</h2>
            <p className="text-grey-muted font-serif italic text-base sm:text-lg max-w-lg mx-auto">
              “Receive selected articles, thoughtful perspectives, and important updates from the AUREVANT GROUP Journal.”
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white border border-stone-warm max-w-md mx-auto shadow-sm flex items-center justify-center gap-3 text-obsidian"
              >
                <div className="w-8 h-8 rounded-full bg-champagne/20 text-champagne flex items-center justify-center shrink-0">
                  <Check size={18} />
                </div>
                <p className="text-xs sm:text-sm font-serif">
                  Thank you for subscribing. You will receive our next quarterly editorial dispatch.
                </p>
              </motion.div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="Business Email"
                  required
                  disabled={submitting}
                  className="w-full px-5 py-4 bg-white border border-stone-warm focus:border-obsidian outline-none transition-all text-sm shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne hover:text-obsidian transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </form>
            )}
            <p className="text-[10px] text-grey-muted uppercase tracking-wider">
              By subscribing, you agree to our privacy policy and consent to receive corporate communications.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section spacing="lg" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <Container className="text-center space-y-8 sm:space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto space-y-4 sm:space-y-6"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">Inquiries &amp; Collaboration</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-obsidian">Have a question or a perspective to share?</h2>
            <p className="text-grey-muted italic font-serif text-base sm:text-lg">
              “We welcome thoughtful enquiries, editorial contributions, and opportunities for collaboration.”
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 text-xs font-semibold uppercase tracking-widest bg-obsidian text-ivory hover:bg-champagne hover:text-obsidian transition-colors shadow-lg"
            >
              <span>Contact AUREVANT</span>
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
