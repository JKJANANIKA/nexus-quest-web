import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  bossType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    company: 'TechVentures Inc.',
    role: 'CEO',
    content: 'Absolutely phenomenal work. Our website performance increased by 300% and conversions doubled. The attention to detail and technical expertise is unmatched.',
    avatar: '👩‍💼',
    rating: 5,
    bossType: 'TECH OVERLORD',
  },
  {
    id: 't2',
    name: 'Marcus Johnson',
    company: 'E-Commerce Giants',
    role: 'Founder',
    content: 'From concept to launch in record time. The e-commerce platform exceeded all expectations and our revenue has skyrocketed since the redesign.',
    avatar: '👨‍💻',
    rating: 5,
    bossType: 'COMMERCE KING',
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    company: 'StartupScale',
    role: 'CTO',
    content: 'The technical architecture is bulletproof. Scalable, maintainable, and beautifully coded. A true master of the craft.',
    avatar: '👩‍🔬',
    rating: 5,
    bossType: 'CODE EMPRESS',
  },
  {
    id: 't4',
    name: 'David Park',
    company: 'Creative Studios',
    role: 'Creative Director',
    content: 'The UI/UX work is stunning. Every interaction feels premium, every animation is purposeful. Our clients are blown away.',
    avatar: '🎨',
    rating: 5,
    bossType: 'DESIGN DRAGON',
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [defeatedBosses, setDefeatedBosses] = useState<string[]>([]);
  const [currentBoss, setCurrentBoss] = useState<Testimonial | null>(null);

  const defeatBoss = (testimonial: Testimonial) => {
    if (defeatedBosses.includes(testimonial.id)) return;
    setCurrentBoss(testimonial);
    setTimeout(() => {
      setDefeatedBosses([...defeatedBosses, testimonial.id]);
      setCurrentBoss(null);
    }, 2000);
  };

  return (
    <section
      id="testimonials"
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
            [ CLIENT BATTLES ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            BOSS REVIEWS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every satisfied client is a boss defeated. Click to reveal their verdict.
          </p>
        </motion.div>

        {/* Boss defeat animation */}
        {currentBoss && (
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
                transition={{ duration: 1 }}
                className="text-8xl block mb-4"
              >
                {currentBoss.avatar}
              </motion.span>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display text-3xl font-bold text-accent mb-2"
              >
                BOSS DEFEATED!
              </motion.p>
              <p className="font-mono text-lg text-primary">{currentBoss.bossType}</p>
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: currentBoss.rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-2xl"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => {
            const isDefeated = defeatedBosses.includes(testimonial.id);
            
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.1 }}
                onClick={() => defeatBoss(testimonial)}
                className={`
                  group cursor-pointer transition-all duration-500
                  ${isDefeated ? 'opacity-100' : 'hover:scale-[1.02]'}
                `}
              >
                <div className={`
                  hud-frame p-6 h-full relative overflow-hidden
                  ${isDefeated ? 'border-accent glow-border' : ''}
                `}>
                  {/* Boss type badge */}
                  <div className="absolute top-0 right-0 p-2">
                    <span className={`
                      font-mono text-[10px] px-2 py-1
                      ${isDefeated ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'}
                    `}>
                      {isDefeated ? '✓ DEFEATED' : 'BOSS BATTLE'}
                    </span>
                  </div>

                  {/* Avatar and info */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      animate={!isDefeated ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: isDefeated ? 0 : Infinity }}
                      className="text-5xl"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-display text-sm text-secondary mb-1">
                        {testimonial.bossType}
                      </p>
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="font-mono text-xs text-muted-foreground">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Content - revealed after defeat */}
                  <div className={`
                    relative transition-all duration-500
                    ${isDefeated ? 'opacity-100' : 'opacity-50 blur-sm'}
                  `}>
                    <p className="font-body text-sm text-foreground/90 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mt-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.span
                          key={i}
                          initial={isDefeated ? { scale: 0 } : {}}
                          animate={isDefeated ? { scale: 1 } : {}}
                          transition={{ delay: i * 0.1 }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Click to reveal overlay */}
                  {!isDefeated && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-[2px]">
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="font-display text-sm text-primary"
                      >
                        [ CLICK TO BATTLE ]
                      </motion.p>
                    </div>
                  )}

                  {/* Health bar (before defeat) */}
                  {!isDefeated && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-destructive/30">
                      <motion.div
                        animate={{ width: ['100%', '80%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-full bg-destructive"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Boss counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="font-display text-2xl font-bold text-gradient">
            {defeatedBosses.length} / {testimonials.length}
          </p>
          <p className="font-mono text-sm text-muted-foreground">BOSSES DEFEATED</p>
        </motion.div>
      </div>
    </section>
  );
};
