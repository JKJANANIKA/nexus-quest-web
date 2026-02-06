import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { label: 'LEVEL', value: '7', subtext: 'Years of Experience', color: 'primary' },
  { label: 'XP', value: '150+', subtext: 'Projects Completed', color: 'accent' },
  { label: 'RANK', value: 'S', subtext: 'Web Development Specialist', color: 'secondary' },
];

const attributes = [
  { name: 'FRONTEND MASTERY', value: 95, color: 'from-primary to-cyan-400' },
  { name: 'BACKEND PROWESS', value: 85, color: 'from-secondary to-purple-400' },
  { name: 'UI/UX DESIGN', value: 90, color: 'from-accent to-green-400' },
  { name: 'PERFORMANCE OPT', value: 92, color: 'from-neon-pink to-pink-400' },
  { name: 'PROBLEM SOLVING', value: 88, color: 'from-yellow-400 to-orange-500' },
];

export const CharacterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="character"
      className="min-h-screen py-24 px-6 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ PLAYER PROFILE ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            CHARACTER STATS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A seasoned web developer specializing in creating high-performance digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Character card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hud-frame p-6 md:p-8"
          >
            {/* Avatar area */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className="relative w-32 h-32 mb-4"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow" />
                <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                  <span className="text-5xl">👨‍💻</span>
                </div>
                {/* Orbiting element */}
                <motion.div
                  className="absolute w-4 h-4 bg-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ top: '50%', left: '50%', transformOrigin: '-50px 0' }}
                />
              </motion.div>
              
              <h3 className="font-display text-2xl font-bold text-foreground">
                DEV_MASTER
              </h3>
              <p className="font-mono text-sm text-primary">
                @webdev.studio
              </p>
            </div>

            {/* Main stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 border border-hud bg-card/50"
                >
                  <p className="font-mono text-xs text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className={`font-display text-3xl font-bold text-${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {stat.subtext}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <div className="p-4 border border-hud/50 bg-muted/20">
              <p className="font-mono text-xs text-primary mb-2">// BIO</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Passionate about crafting pixel-perfect, high-performance web experiences. 
                Specializing in modern frameworks, scalable architecture, and conversion-optimized designs.
                Every project is a new level to conquer.
              </p>
            </div>
          </motion.div>

          {/* Attribute bars */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="hud-corners p-6">
              <h4 className="font-display text-lg font-bold text-foreground mb-6">
                ATTRIBUTE POINTS
              </h4>
              
              {attributes.map((attr, index) => (
                <div key={attr.name} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-sm text-foreground">
                      {attr.name}
                    </span>
                    <span className="font-display text-sm text-primary">
                      {attr.value}/100
                    </span>
                  </div>
                  <div className="h-3 bg-muted/30 border border-hud overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${attr.value}%` } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${attr.color}`}
                      style={{
                        boxShadow: '0 0 10px currentColor',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Equipment slots */}
            <div className="grid grid-cols-4 gap-3">
              {['💻', '⌨️', '🖱️', '☕'].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, borderColor: 'hsl(var(--primary))' }}
                  className="aspect-square border border-hud bg-card/30 flex items-center justify-center text-2xl cursor-pointer transition-colors"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
