import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';

const expertiseAreas = [
  {
    id: 'architecture',
    title: 'Architecture & Design',
    copy: 'Explore design thinking, building functionality, material selection, spatial quality, and contemporary architectural trends.',
    image: '/src/assets/images/expertise_architecture_1793877172956.jpg',
  },
  {
    id: 'property',
    title: 'Property & Markets',
    copy: 'Publish educational content about market factors, property research, development trends, and the forces influencing property values.',
    image: '/src/assets/images/expertise_property_1793877340956.jpg',
  },
  {
    id: 'engineering',
    title: 'Engineering & Construction',
    copy: 'Cover engineering principles, project coordination, construction quality, materials, safety awareness, and technical developments.',
    image: '/src/assets/images/expertise_engineering_1793877176099.jpg',
  },
  {
    id: 'sustainability',
    title: 'Sustainable Development',
    copy: 'Discuss energy efficiency, resource-conscious design, climate-aware development, and sustainable building practices.',
    image: '/src/assets/images/expertise_sustainability_1793877175100.jpg',
  },
  {
    id: 'urban',
    title: 'Urban Planning',
    copy: 'Explore transport, public spaces, housing, infrastructure, accessibility, and the relationship between cities and communities.',
    image: '/src/assets/images/expertise_urban_1793877340632.jpg',
  },
];

export function Expertise() {
  return (
    <div className="pt-24">
      <Section spacing="md" className="bg-stone-warm/10">
        <Container size="md">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif">Our Expertise</h1>
            <p className="text-grey-muted font-serif italic text-lg">
              “Specialised perspectives on the disciplines shaping our world.”
            </p>
          </div>
        </Container>
      </Section>

      <Container className="py-20">
        <div className="space-y-32">
          {expertiseAreas.map((area, idx) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center group ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] bg-stone-warm overflow-hidden shadow-lg relative">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 border border-obsidian/10 pointer-events-none group-hover:border-champagne/40 transition-colors duration-500" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-champagne">0{idx + 1}</span>
                  <div className="h-px w-10 bg-champagne" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-obsidian">{area.title}</h2>
                <p className="text-base sm:text-lg text-grey-muted leading-relaxed font-serif italic">
                  “{area.copy}”
                </p>
                <p className="text-sm text-grey-muted leading-relaxed max-w-prose">
                  AUREVANT GROUP provides considered insights into this field, exploring emerging trends and fundamental principles that define excellence in the built environment.
                </p>
                <div className="pt-2">
                  <Link
                    to={`/expertise/${area.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-champagne hover:text-obsidian transition-colors pb-1 border-b border-champagne"
                  >
                    <span>Read Advisory Perspective</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <Section spacing="lg" className="bg-obsidian text-ivory text-center">
        <Container size="sm">
          <div className="space-y-10">
            <h2 className="text-3xl font-serif italic">“We welcome informed discussion and diverse perspectives.”</h2>
            <p className="text-ivory/60 text-sm tracking-widest uppercase">Collaborate with AUREVANT</p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
