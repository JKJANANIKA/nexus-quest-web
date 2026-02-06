import { motion } from 'framer-motion';
import { ParticleGrid } from './ParticleGrid';
import { CyberButton } from './CyberButton';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleGrid />

      {/* Scan line overlay */}
      <div className="scan-lines absolute inset-0 pointer-events-none z-10" />

      {/* Main content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Loading bar animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="mx-auto mb-8 max-w-md"
        >
          <div className="h-1 bg-muted overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 font-mono text-xs text-muted-foreground tracking-widest"
          >
            INITIALIZING SYSTEM...
          </motion.p>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.p
            className="font-display text-sm md:text-base text-primary tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            [ SYSTEM ONLINE ]
          </motion.p>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">LEVEL UP YOUR</span>
            <br />
            <span className="text-gradient neon-text">BRAND</span>
            <br />
            <span className="text-foreground">WITH HIGH-PERFORMANCE</span>
            <br />
            <motion.span
              className="text-gradient-cyan-purple"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              WEBSITES
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Building fast, scalable, and conversion-focused digital experiences
            that transform your online presence into a competitive advantage.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CyberButton
            variant="primary"
            size="lg"
            glowing
            onClick={() => onNavigate('contact')}
          >
            <span className="mr-2">▶</span>
            START MISSION
          </CyberButton>

          <CyberButton
            variant="secondary"
            size="lg"
            onClick={() => onNavigate('missions')}
          >
            <span className="mr-2">📁</span>
            VIEW MISSIONS
          </CyberButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              SCROLL TO EXPLORE
            </span>
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner HUD elements */}
      <div className="absolute top-8 left-8 font-mono text-xs text-primary/50 z-20">
        <div className="border-l-2 border-t-2 border-primary/30 p-3">
          <p>SYS.STATUS: ACTIVE</p>
          <p>VERSION: 2.0.24</p>
        </div>
      </div>

      <div className="absolute top-8 right-8 font-mono text-xs text-primary/50 z-20 text-right">
        <div className="border-r-2 border-t-2 border-primary/30 p-3">
          <p>UPTIME: 99.9%</p>
          <p>PING: 12ms</p>
        </div>
      </div>
    </section>
  );
};
