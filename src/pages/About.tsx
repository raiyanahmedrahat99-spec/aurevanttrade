import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Loader2 } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';
import { exportCorporateProfilePDF } from '@/src/lib/pdf-export';

const values = [
  { name: 'Integrity', description: 'Communicate clearly and responsibly.' },
  { name: 'Clarity', description: 'Make complex subjects easier to understand.' },
  { name: 'Quality', description: 'Apply care to every published article and interaction.' },
  { name: 'Curiosity', description: 'Explore emerging ideas and changing industry practices.' },
  { name: 'Responsibility', description: 'Recognise the environmental and social impact of the built environment.' },
  { name: 'Collaboration', description: 'Welcome informed discussion and diverse perspectives.' },
];

export function About() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await exportCorporateProfilePDF('AUREVANT_GROUP_Corporate_Profile');
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-24" id="corporate-profile">
      {/* Hero */}
      <Section spacing="md" className="bg-[#EBE6DF] relative overflow-hidden">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-champagne">
              Corporate Overview &amp; Foundations
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-obsidian tracking-tight">
              A Commitment to Clarity
            </h1>
            <p className="text-lg sm:text-xl font-serif italic text-grey-muted leading-relaxed max-w-xl mx-auto">
              “We believe that informed decisions begin with clear information.”
            </p>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block pt-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne hover:text-obsidian transition-colors disabled:opacity-60 cursor-pointer shadow-md group"
              >
                {isDownloading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-champagne" />
                    <span>Generating 9-Page Profile PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                    <span>Download Corporate Profile (9-Page Executive PDF)</span>
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Story */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne">Our Story</h2>
              <div className="space-y-6 text-lg leading-relaxed text-[#20211F]/80">
                <p>
                  AUREVANT GROUP is a developing corporate and editorial platform focused on the built environment. Our interests span architecture, property, engineering, construction, and sustainable urban development.
                </p>
                <p>
                  We believe that informed decisions begin with clear information. Our aim is to make complex industry topics easier to understand through considered writing, useful analysis, and a consistent commitment to clarity.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif">Our Mission</h3>
                <p className="text-grey-muted text-sm leading-relaxed">
                  To make knowledge about the built environment more accessible through thoughtful analysis, responsible publishing, and an international perspective.
                </p>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-serif">Our Vision</h3>
                <p className="text-grey-muted text-sm leading-relaxed">
                  To develop AUREVANT GROUP into a respected name for insight, communication, and collaboration across the built-environment sector.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section spacing="lg" className="bg-white">
        <Container>
          <div className="text-center mb-16 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-champagne">Corporate Ethics &amp; Philosophy</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-obsidian">Built on Principles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="space-y-4 p-8 bg-ivory border border-stone-warm/60 group hover:border-champagne/60 transition-colors shadow-sm"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-champagne">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-serif text-obsidian group-hover:text-champagne transition-colors">
                  {value.name}
                </h3>
                <p className="text-grey-muted text-sm leading-relaxed">{value.description}</p>
                <div className="h-0.5 w-0 group-hover:w-16 bg-champagne transition-all duration-400 ease-out" />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Image Strip */}
      <div className="h-96 w-full relative">
        <img
          src="/src/assets/images/expertise_urban_1793877340632.jpg"
          alt="Urban landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#20211F]/30" />
      </div>
    </div>
  );
}
