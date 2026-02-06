import { motion } from 'framer-motion';

interface XPProgressBarProps {
  progress: number;
  currentSection: string;
}

export const XPProgressBar = ({ progress, currentSection }: XPProgressBarProps) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-40 p-4 backdrop-cyber border-t border-hud"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs text-primary tracking-widest">
              MISSION PROGRESS
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {currentSection.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-accent">
              {Math.round(progress)}%
            </span>
            <span className="font-display text-xs text-muted-foreground">
              XP
            </span>
          </div>
        </div>
        
        <div className="xp-bar">
          <motion.div
            className="xp-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Level indicators */}
        <div className="relative mt-1 flex justify-between text-[10px] font-mono text-muted-foreground/50">
          <span>LVL 1</span>
          <span className="absolute left-1/4 -translate-x-1/2">LVL 2</span>
          <span className="absolute left-1/2 -translate-x-1/2">LVL 3</span>
          <span className="absolute left-3/4 -translate-x-1/2">LVL 4</span>
          <span>LVL 5</span>
        </div>
      </div>
    </motion.div>
  );
};
