import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';

const expertiseContent: Record<string, { title: string, fullCopy: string, image: string }> = {
  architecture: {
    title: 'Architecture & Design',
    fullCopy: 'Architecture is not merely the creation of space, but the engineering of human experience. At AUREVANT GROUP, we analyze contemporary trends that bridge the gap between aesthetic form and practical function. From the resurgence of biomimetic design to the critical role of material science in reducing carbon footprints, our advisory perspective examines how structural decisions dictate the longevity and utility of the built environment. We investigate the intersection of technology and artistry, highlighting projects that challenge existing paradigms while ensuring regulatory compliance and structural integrity. Furthermore, we explore how spatial configuration influences occupant well-being and productivity, creating environments that are both functional and emotionally resonant.',
    image: '/src/assets/images/expertise_architecture_1793877172956.jpg',
  },
  property: {
    title: 'Property & Markets',
    fullCopy: 'The property market is the most tangible indicator of economic and social health. Our advisory perspective delves into the cyclical nature of real estate, focusing on investment strategies, market resilience, and the demographic shifts redefining urban desirability. We analyze data-driven indicators that influence asset performance, providing clarity on how regulatory changes, interest rate fluctuations, and workspace shifts demand a new approach to portfolio management. Whether for commercial ventures or institutional development, understanding market forces is the cornerstone of sustainable growth. We also provide insights into emerging asset classes and the future of property as a service.',
    image: '/src/assets/images/expertise_property_1793877340956.jpg',
  },
  engineering: {
    title: 'Engineering & Construction',
    fullCopy: 'Precision, safety, and efficiency define the backbone of modern construction. Engineering is the silent force enabling the built environment to persist through time. We focus on advanced construction methodologies, digital twinning in project management, and the imperative of site-specific safety protocols. Our engineering advisory explores how technological integration—such as automated monitoring systems and advanced material testing—can mitigate risk in complex structural projects while optimizing project timelines and cost-benefit ratios. Additionally, we address the critical importance of lifecycle maintenance and adaptive reuse in extending the lifespan of infrastructure assets.',
    image: '/src/assets/images/expertise_engineering_1793877176099.jpg',
  },
  sustainability: {
    title: 'Sustainable Development',
    fullCopy: 'Sustainability is no longer an optional overlay; it is the fundamental constraint of contemporary development. Our advisory perspective investigates high-performance design, circular material economies, and the integration of renewable energy systems in existing and new structures. We analyze how climate-positive design strategies contribute to long-term asset value, regulatory readiness, and the reduction of operational carbon. Our insights are grounded in the belief that true sustainability demands a holistic balance between economic viability and environmental stewardship. We also delve into the role of policy in driving green transitions and the metrics of measuring real-world ecological impact.',
    image: '/src/assets/images/expertise_sustainability_1793877175100.jpg',
  },
  urban: {
    title: 'Urban Planning',
    fullCopy: 'Cities are complex living organisms shaped by the relationship between policy, infrastructure, and human behavior. Urban planning advisory focuses on the evolution of transport networks, the creation of inclusive public realms, and strategies for managing high-density growth. We explore the socio-spatial impact of urban interventions, advocating for data-informed planning that promotes accessibility, community health, and economic mobility. Our perspective looks at how the fabric of our cities must adapt to the accelerating demand for smarter, safer, and more connected urban environments. We also examine the integration of digital technology in urban governance to create more responsive, equitable, and sustainable metropolitan regions.',
    image: '/src/assets/images/expertise_urban_1793877340632.jpg',
  },
};

export function ExpertiseDetail() {
  const { id } = useParams<{ id: string }>();
  const data = id ? expertiseContent[id] : null;

  if (!data) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-serif">Perspective not found.</h1>
        <Link to="/expertise" className="text-champagne underline">Return to Expertise</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-ivory min-h-screen">
      <Section spacing="md">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Link to="/expertise" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-grey-muted hover:text-obsidian transition-colors">
              <ArrowLeft size={12} /> Back to Expertise
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif text-obsidian">{data.title}</h1>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="aspect-[21/9] overflow-hidden bg-stone-warm shadow-md">
              <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            </div>
            <div className="prose prose-obsidian max-w-none">
              <p className="text-lg md:text-xl leading-relaxed font-serif text-obsidian/90">
                {data.fullCopy}
              </p>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
