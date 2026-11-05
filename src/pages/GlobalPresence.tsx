import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';

const regions = [
  {
    city: 'Dhaka',
    country: 'Bangladesh',
    status: 'Proposed Headquarters',
    email: 'dhaka@aurevantgroup.com',
    phone: '+880 2 5831 7642',
    image: '/src/assets/images/city_dhaka_1793877341121.jpg'
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    status: 'Proposed Regional Office',
    email: 'dubai@aurevantgroup.com',
    phone: '+971 4 583 1762',
    image: '/src/assets/images/city_dubai_1793877342090.jpg'
  },
  {
    city: 'London',
    country: 'United Kingdom',
    status: 'Proposed Regional Office',
    email: 'london@aurevantgroup.com',
    phone: '+44 20 7946 0123',
    image: '/src/assets/images/city_london_1793877342803.jpg'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    status: 'Proposed Regional Office',
    email: 'singapore@aurevantgroup.com',
    phone: '+65 6817 4293',
    image: '/src/assets/images/city_london_1793877342803.jpg' // Using London for Singapore as placeholder
  },
  {
    city: 'Berlin',
    country: 'Germany',
    status: 'Proposed Regional Office',
    email: 'berlin@aurevantgroup.com',
    phone: '+49 30 5831 7642',
    image: '/src/assets/images/expertise_architecture_1793877172956.jpg' // Using architecture for Berlin as placeholder
  }
];

export function GlobalPresence() {
  return (
    <div className="pt-20 sm:pt-24 bg-ivory">
      {/* Header with Transparent International Architectural Skyscraper Background */}
      <section className="relative min-h-[360px] sm:min-h-[420px] md:min-h-[480px] flex items-center overflow-hidden bg-obsidian">
        {/* Architectural Background Image with Transparency & Gradient Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/src/assets/images/header_global_skyscrapers_1793884499116.jpg"
            alt="International Financial District & Global Corporate Towers"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.42 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle multi-stop gradient scrim to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/60" />
        </div>

        <Container size="md" className="relative z-10 py-20 sm:py-28 text-center text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 sm:space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-px bg-champagne" />
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
                International Footprint
              </p>
              <span className="w-8 h-px bg-champagne" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-white drop-shadow-sm">
              Global Presence
            </h1>

            <p className="text-ivory/85 font-serif italic text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto px-4 font-light">
              “Regional Markets &amp; International Enquiries. AUREVANT GROUP operates with an international perspective, identifying opportunities and challenges across diverse built environments.”
            </p>
          </motion.div>
        </Container>
      </section>

      <Section spacing="lg" className="px-4 sm:px-6 py-16 sm:py-24">
        <Container>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
             {regions.map((region, idx) => (
               <motion.div
                 key={region.city}
                 initial={{ opacity: 0, y: 25 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-40px" }}
                 transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 whileHover={{ y: -6 }}
                 className="group space-y-6 bg-white p-5 sm:p-6 border border-stone-warm shadow-sm hover:border-champagne/60 transition-colors cursor-pointer"
               >
                 <div className="aspect-[16/10] overflow-hidden bg-stone-warm shadow-inner relative">
                   <img src={region.image} alt={region.city} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" loading="lazy" />
                   <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/10 transition-colors duration-500" />
                 </div>
                 <div className="space-y-4 sm:space-y-6">
                   <div className="space-y-2">
                     <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-champagne">{region.status}</span>
                     <h3 className="text-2xl sm:text-3xl font-serif text-obsidian">{region.city}, {region.country}</h3>
                   </div>
                   <div className="space-y-3 pt-4 border-t border-stone-warm">
                     <div className="flex items-center gap-3 text-xs sm:text-sm text-grey-muted">
                        <Mail size={16} className="text-champagne shrink-0" />
                        <a href={`mailto:${region.email}`} className="hover:text-obsidian transition-colors truncate">{region.email}</a>
                     </div>
                     <div className="flex items-center gap-3 text-xs sm:text-sm text-grey-muted">
                        <Phone size={16} className="text-champagne shrink-0" />
                        <a href={`tel:${region.phone.replace(/\s/g, '')}`} className="hover:text-obsidian transition-colors truncate">{region.phone}</a>
                     </div>
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </Container>
      </Section>
      
      <Section spacing="md" className="bg-white border-t border-stone-warm text-center py-16 sm:py-20 px-4 sm:px-6">
        <Container size="sm">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-serif italic text-obsidian">“Local Understanding. International Perspective.”</h2>
            <p className="text-grey-muted text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Until physical locations are verified, our presence is represented by regional market coverage and international engagement efforts. All contact details are for corporate inquiry purposes only.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
