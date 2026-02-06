import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CyberButton } from './CyberButton';

interface Mission {
  id: string;
  title: string;
  objective: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  tools: string[];
  outcome: string;
  image: string;
  status: 'completed' | 'active';
}

const missions: Mission[] = [
  {
    id: 'm1',
    title: 'E-COMMERCE DOMINANCE',
    objective: 'Build a high-converting online store with custom checkout',
    difficulty: 'Hard',
    tools: ['Next.js', 'Shopify API', 'Stripe', 'Tailwind'],
    outcome: '+340% conversion rate, $2M+ annual revenue',
    image: '🛍️',
    status: 'completed',
  },
  {
    id: 'm2',
    title: 'SAAS PLATFORM LAUNCH',
    objective: 'Create a scalable SaaS dashboard with real-time analytics',
    difficulty: 'Legendary',
    tools: ['React', 'Node.js', 'PostgreSQL', 'WebSockets'],
    outcome: '10K+ active users, 99.9% uptime',
    image: '📊',
    status: 'completed',
  },
  {
    id: 'm3',
    title: 'BRAND TRANSFORMATION',
    objective: 'Complete website redesign for Fortune 500 company',
    difficulty: 'Hard',
    tools: ['Figma', 'React', 'GSAP', 'Contentful'],
    outcome: '+85% engagement, 40% faster load times',
    image: '🏢',
    status: 'completed',
  },
  {
    id: 'm4',
    title: 'STARTUP ACCELERATION',
    objective: 'MVP development from concept to launch in 8 weeks',
    difficulty: 'Medium',
    tools: ['TypeScript', 'Supabase', 'Vercel', 'Framer Motion'],
    outcome: 'Secured $500K seed funding',
    image: '🚀',
    status: 'completed',
  },
  {
    id: 'm5',
    title: 'AI INTEGRATION',
    objective: 'Implement AI-powered search and recommendations',
    difficulty: 'Legendary',
    tools: ['OpenAI', 'Pinecone', 'Python', 'React'],
    outcome: '+200% user engagement, smarter UX',
    image: '🤖',
    status: 'active',
  },
  {
    id: 'm6',
    title: 'PERFORMANCE RESCUE',
    objective: 'Optimize legacy app from 6s to under 1s load time',
    difficulty: 'Medium',
    tools: ['Lighthouse', 'Webpack', 'CDN', 'Caching'],
    outcome: '95+ performance score, 3x faster',
    image: '⚡',
    status: 'completed',
  },
];

const difficultyColors = {
  Easy: 'accent',
  Medium: 'primary',
  Hard: 'secondary',
  Legendary: 'neon-pink',
};

export const MissionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <section
      id="missions"
      className="min-h-screen py-24 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ PORTFOLIO ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            COMPLETED MISSIONS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each mission represents a successful project delivered with excellence
          </p>
        </motion.div>

        {/* Missions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => setSelectedMission(mission)}
              className="group cursor-pointer"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="hud-frame p-6 h-full transition-all duration-300 hover:glow-border"
              >
                {/* Mission status */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`
                    font-mono text-xs px-2 py-1 
                    ${mission.status === 'completed' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-primary/20 text-primary animate-pulse'
                    }
                  `}>
                    {mission.status === 'completed' ? '✓ COMPLETED' : '◉ ACTIVE'}
                  </span>
                  <span className={`font-mono text-xs text-${difficultyColors[mission.difficulty]}`}>
                    {mission.difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Mission icon */}
                <motion.div
                  className="text-5xl mb-4 transition-transform group-hover:scale-110"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {mission.image}
                </motion.div>

                {/* Mission info */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {mission.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {mission.objective}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mission.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-2 py-1 border border-hud bg-muted/20"
                    >
                      {tool}
                    </span>
                  ))}
                  {mission.tools.length > 3 && (
                    <span className="font-mono text-xs px-2 py-1 text-muted-foreground">
                      +{mission.tools.length - 3}
                    </span>
                  )}
                </div>

                {/* Outcome */}
                <div className="pt-4 border-t border-hud">
                  <p className="font-mono text-xs text-primary">
                    ▸ {mission.outcome}
                  </p>
                </div>

                {/* Hover indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mission detail modal */}
        {selectedMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-background/80"
            onClick={() => setSelectedMission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="hud-frame p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="text-6xl">{selectedMission.image}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {selectedMission.title}
                  </h3>
                  <span className={`font-mono text-xs text-${difficultyColors[selectedMission.difficulty]}`}>
                    {selectedMission.difficulty.toUpperCase()} DIFFICULTY
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-mono text-xs text-primary mb-1">MISSION OBJECTIVE</p>
                  <p className="font-body text-foreground">{selectedMission.objective}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-primary mb-1">TOOLS DEPLOYED</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMission.tools.map((tool) => (
                      <span key={tool} className="font-mono text-sm px-3 py-1 border border-primary bg-primary/10">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-accent mb-1">MISSION OUTCOME</p>
                  <p className="font-body text-accent">{selectedMission.outcome}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CyberButton variant="primary" onClick={() => setSelectedMission(null)}>
                  CLOSE BRIEFING
                </CyberButton>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Missions Completed', value: '150+' },
            { label: 'Happy Clients', value: '100+' },
            { label: 'Countries Served', value: '25+' },
            { label: 'Success Rate', value: '99%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 border border-hud bg-card/30">
              <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
