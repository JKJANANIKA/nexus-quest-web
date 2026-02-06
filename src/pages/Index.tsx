import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameNav } from '@/components/GameNav';
import { HeroSection } from '@/components/HeroSection';
import { CharacterSection } from '@/components/CharacterSection';
import { SkillTreeSection } from '@/components/SkillTreeSection';
import { PowerUpsSection } from '@/components/PowerUpsSection';
import { MissionsSection } from '@/components/MissionsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { XPProgressBar } from '@/components/XPProgressBar';

const sections = [
  'hero',
  'character',
  'skills',
  'powerups',
  'missions',
  'achievements',
  'testimonials',
  'contact',
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / documentHeight) * 100;
      setProgress(Math.min(scrollProgress, 100));

      // Find active section
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to section
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            {/* Cyber logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="relative mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 border-2 border-primary rounded-lg"
                style={{
                  boxShadow: '0 0 20px hsl(var(--primary)), inset 0 0 20px hsl(var(--primary) / 0.2)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 border border-secondary rounded"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary">DEV</span>
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="w-64 mb-4">
              <div className="h-1 bg-muted overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
            </div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="font-mono text-sm text-primary tracking-widest"
              >
                INITIALIZING SYSTEM...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-mono text-xs text-muted-foreground mt-2"
              >
                Loading assets • Preparing experience
              </motion.p>
            </motion.div>

            {/* Scan lines */}
            <div className="absolute inset-0 scan-lines pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative min-h-screen bg-background">
        {/* Game Navigation */}
        <GameNav activeSection={activeSection} onNavigate={navigateToSection} />

        {/* Sections */}
        <main>
          <HeroSection onNavigate={navigateToSection} />
          <CharacterSection />
          <SkillTreeSection />
          <PowerUpsSection />
          <MissionsSection />
          <AchievementsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* XP Progress Bar */}
        <XPProgressBar progress={progress} currentSection={activeSection} />

        {/* Footer */}
        <footer className="relative pb-20 pt-12 px-6 border-t border-hud">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-6"
            >
              <span className="font-display text-2xl font-bold text-gradient">
                DEV_MASTER
              </span>
              <p className="font-mono text-xs text-muted-foreground mt-2">
                CRAFTING DIGITAL EXPERIENCES SINCE 2017
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map((tech) => (
                <span key={tech} className="font-mono text-xs text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>

            <p className="font-mono text-xs text-muted-foreground/50">
              © 2024 Jananika. All rights reserved. Game on.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
