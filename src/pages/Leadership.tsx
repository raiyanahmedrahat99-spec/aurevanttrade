import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';

const boardMembers = [
  { 
    name: 'Mahir Rahman', 
    title: 'Chairman of the Board', 
    email: 'mahir.rahman@aurevantgroup.com', 
    bio: 'Focused on long-term direction, responsible governance, and the development of a clear organisational vision.',
    image: '/src/assets/images/portrait_chairman_mahir_1793879140897.jpg'
  },
  { 
    name: 'Arif Hasan Chowdhury', 
    title: 'Managing Director', 
    email: 'arif.chowdhury@aurevantgroup.com', 
    bio: 'Interested in organisational strategy, operational development, and building effective professional relationships.',
    image: '/src/assets/images/portrait_director_arif_1793879142035.jpg'
  },
  { 
    name: 'Samira Nawar', 
    title: 'Finance Director', 
    email: 'samira.nawar@aurevantgroup.com', 
    bio: 'Focused on financial planning, accountability, and disciplined resource management.',
    image: '/src/assets/images/portrait_director_samira_1793879142851.jpg'
  },
  { 
    name: 'Engr. Tanvir Mahmud', 
    title: 'Director of Engineering', 
    email: 'tanvir.mahmud@aurevantgroup.com', 
    bio: 'Interested in engineering standards, technical coordination, and practical approaches to construction quality.',
    image: '/src/assets/images/portrait_eng_tanvir_1793879165522.jpg'
  },
  { 
    name: 'Alexander Bennett', 
    title: 'International Strategy Director', 
    email: 'alexander.bennett@aurevantgroup.com', 
    bio: 'Focused on international strategy, market understanding, and cross-border collaboration.',
    image: '/src/assets/images/portrait_dir_alexander_1793879166034.jpg'
  },
  { 
    name: 'Omar Al-Farsi', 
    title: 'Director of Regional Partnerships', 
    email: 'omar.alfarsi@aurevantgroup.com', 
    bio: 'Interested in building professional partnerships and encouraging constructive regional cooperation.',
    image: '/src/assets/images/portrait_dir_omar_1793879166647.jpg'
  },
  { 
    name: 'Evelyn Chen', 
    title: 'Director of Strategy & Sustainability', 
    email: 'evelyn.chen@aurevantgroup.com', 
    bio: 'Focused on sustainability, strategic thinking, and the long-term impact of development.',
    image: '/src/assets/images/portrait_dir_evelyn_1793879166831.jpg'
  },
  { 
    name: 'Lukas Schneider', 
    title: 'Director of Technical Standards', 
    email: 'lukas.schneider@aurevantgroup.com', 
    bio: 'Interested in technical consistency, engineering processes, and quality-focused practices.',
    image: '/src/assets/images/portrait_dir_lukas_1793879167045.jpg'
  },
];

const executiveManagement = [
  { 
    name: 'Nadia Karim', 
    title: 'Chief Executive Officer', 
    email: 'nadia.karim@aurevantgroup.com', 
    bio: 'Responsible for the proposed executive direction, organisational priorities, and coordination of the company’s strategic objectives.',
    image: '/src/assets/images/portrait_ceo_nadia_1793879141465.jpg'
  },
  { 
    name: 'Farhan Kabir', 
    title: 'Chief Operating Officer', 
    email: 'farhan.kabir@aurevantgroup.com', 
    bio: 'Focused on operational coordination, internal processes, and consistent service standards.',
    image: '/src/assets/images/portrait_coo_farhan_1793879529051.jpg'
  },
  { 
    name: 'Imran Sayeed', 
    title: 'Chief Financial Officer', 
    email: 'imran.sayeed@aurevantgroup.com', 
    bio: 'Focused on financial oversight, budgeting, and transparent financial processes.',
    image: '/src/assets/images/portrait_cfo_imran_1793879530286.jpg'
  },
  { 
    name: 'Sophia Williams', 
    title: 'Head of Communications', 
    email: 'sophia.williams@aurevantgroup.com', 
    bio: 'Focused on clear corporate communication, editorial consistency, and professional engagement.',
    image: '/src/assets/images/portrait_comms_sophia_1793879531903.jpg'
  },
  { 
    name: 'Daniel Weber', 
    title: 'Head of International Projects', 
    email: 'daniel.weber@aurevantgroup.com', 
    bio: 'Focused on project coordination, international collaboration, and structured planning.',
    image: '/src/assets/images/portrait_projects_daniel_1793879530345.jpg'
  },
];

function ProfileCard({ member, index = 0 }: { member: any; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="space-y-4 sm:space-y-5 group cursor-pointer"
    >
      <div className="aspect-[3/4] bg-stone-warm relative overflow-hidden shadow-sm">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Subtle hover gradient and gold frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute inset-0 border border-obsidian/10 group-hover:border-champagne/40 transition-colors duration-500 pointer-events-none" />
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-serif text-obsidian group-hover:text-champagne transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-champagne">
              {member.title}
            </p>
          </div>
          <motion.a 
            href={`mailto:${member.email}`} 
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full border border-stone-warm flex items-center justify-center text-grey-muted hover:text-obsidian hover:border-obsidian transition-colors shrink-0 shadow-sm"
            title={`Email ${member.name}`}
            aria-label={`Email ${member.name}`}
          >
            <Mail size={14} />
          </motion.a>
        </div>
        <p className="text-xs sm:text-sm text-grey-muted leading-relaxed italic font-serif">
          “{member.bio}”
        </p>
        <div className="h-0.5 w-0 group-hover:w-full bg-champagne transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

export function Leadership() {
  return (
    <div className="pt-20 sm:pt-24 bg-ivory">
      {/* Header with Transparent Architectural Skyscraper Background */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center overflow-hidden bg-obsidian">
        {/* Architectural Background Image with Transparency Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img
            src="/src/assets/images/header_leadership_building_1793879143243.jpg"
            alt="AUREVANT Corporate Headquarters"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/40" />
        </div>

        <Container size="md" className="relative z-10 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
              Corporate Governance & Direction
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory tracking-tight">
              Our Leadership
            </h1>
            <p className="text-ivory/70 font-serif italic text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              “The governance of AUREVANT GROUP is guided by a commitment to long-term stability, technical excellence, and international collaboration.”
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Board of Directors */}
      <Section spacing="lg" className="px-2 sm:px-0">
        <Container>
          <div className="mb-10 sm:mb-14 border-b border-stone-warm pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne mb-1">Fiduciary Oversight</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-obsidian">Board of Directors</h2>
            </div>
            <p className="text-xs text-grey-muted uppercase tracking-widest">8 Appointed Members</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-12 sm:gap-y-16">
            {boardMembers.map((member, idx) => (
              <ProfileCard key={member.name} member={member} index={idx} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Executive Management */}
      <Section spacing="lg" className="bg-white border-t border-stone-warm px-2 sm:px-0">
        <Container>
          <div className="mb-10 sm:mb-14 border-b border-stone-warm pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne mb-1">Operational Execution</p>
              <h2 className="text-2xl sm:text-3xl font-serif text-obsidian">Executive Management</h2>
            </div>
            <p className="text-xs text-grey-muted uppercase tracking-widest">Executive Directorate</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-6 sm:gap-x-8 gap-y-12 sm:gap-y-16">
            {executiveManagement.map((member, idx) => (
              <ProfileCard key={member.name} member={member} index={idx} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

