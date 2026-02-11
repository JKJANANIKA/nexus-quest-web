import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const experiences = [
  {
    icon: '',
    title: 'PS5 GAMING',
    tag: 'CONSOLE',
    description: 'Experience next-gen gaming on PlayStation 5 with a massive library of AAA titles, 4K HDR visuals, and DualSense haptic feedback.',
    features: ['4K HDR Display', '120fps Support', 'DualSense Controllers', '100+ Games Library'],
    color: 'hsl(var(--primary))',
  },
  {
    icon: '',
    title: 'PC GAMING',
    tag: 'HIGH-END',
    description: 'High-performance gaming PCs with top-tier GPUs, ultra-wide monitors, and mechanical keyboards for the ultimate competitive edge.',
    features: ['RTX Graphics', 'High Refresh Monitors', 'Mechanical Keyboards', 'Competitive Titles'],
    color: 'hsl(var(--secondary))',
  },
  {
    icon: '',
    title: 'VR EXPERIENCE',
    tag: 'PSVR2',
    description: 'Dive into virtual reality with PlayStation VR2. Eye-tracking, haptic feedback, and 4K HDR for truly immersive gaming.',
    features: ['PSVR2 Headset', 'Eye Tracking', '4K HDR Per Eye', 'Haptic Feedback'],
    color: 'hsl(var(--accent))',
  },
  {
    icon: '',
    title: 'DOLBY ATMOS LOUNGE',
    tag: 'PREMIUM',
    description: 'Private lounge with Dolby Atmos surround sound. Feel every explosion, whisper, and footstep in cinematic 3D audio.',
    features: ['Private Room', 'Dolby Atmos', 'Premium Seating', 'Immersive Audio'],
    color: 'hsl(var(--primary))',
  },
  {
    icon: '',
    title: 'RACING SIMULATOR',
    tag: 'G923',
    description: 'Logitech G923 racing wheel with force feedback, pedals, and shifter. Feel every turn on tracks from F1 to rally stages.',
    features: ['Logitech G923', 'Force Feedback', 'Pedals & Shifter', 'Multiple Racing Games'],
    color: 'hsl(var(--secondary))',
  },
];

export const ExperiencesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeExp, setActiveExp] = useState<number | null>(null);

  return (
    <section id="experiences" className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ SELECT YOUR EXPERIENCE ]
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">CHOOSE YOUR</span>
            <br />
            <span className="text-gradient neon-text">ARENA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Five premium gaming experiences under one roof. Pick your weapon of choice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              onMouseEnter={() => setActiveExp(index)}
              onMouseLeave={() => setActiveExp(null)}
              className={`
                relative hud-frame p-6 cursor-pointer transition-all duration-500
                ${activeExp === index ? 'glow-border' : ''}
                ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[10px] text-primary/70 border border-primary/30 px-2 py-1">
                  {exp.tag}
                </span>
              </div>

              {/* Icon */}
              <motion.div
                animate={activeExp === index ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
                className="text-4xl mb-4"
              >
                {exp.icon}
              </motion.div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {exp.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">
                {exp.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {exp.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: exp.color }}
                    />
                    <span className="font-mono text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: activeExp === index ? 0.1 : 0,
                  background: `radial-gradient(circle at center, ${exp.color}, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
