import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress?: { current: number; max: number };
}

const achievements: Achievement[] = [
  {
    id: 'traffic',
    name: 'TRAFFIC BOOSTER',
    description: 'Increased client traffic by 500%+',
    icon: '📈',
    rarity: 'legendary',
    unlocked: true,
  },
  {
    id: 'conversion',
    name: 'CONVERSION MASTER',
    description: 'Achieved 10%+ conversion rate on e-commerce project',
    icon: '💰',
    rarity: 'epic',
    unlocked: true,
  },
  {
    id: 'performance',
    name: 'PERFORMANCE PRO',
    description: 'Scored 100 on all Lighthouse metrics',
    icon: '⚡',
    rarity: 'rare',
    unlocked: true,
  },
  {
    id: 'speed',
    name: 'SPEED DEMON',
    description: 'Delivered project 2 weeks ahead of schedule',
    icon: '🏎️',
    rarity: 'epic',
    unlocked: true,
  },
  {
    id: 'streak',
    name: 'WIN STREAK',
    description: '50 consecutive successful projects',
    icon: '🔥',
    rarity: 'legendary',
    unlocked: true,
  },
  {
    id: 'global',
    name: 'GLOBAL REACH',
    description: 'Clients in 25+ countries',
    icon: '🌍',
    rarity: 'epic',
    unlocked: true,
  },
  {
    id: 'innovator',
    name: 'INNOVATOR',
    description: 'First to implement cutting-edge technology',
    icon: '💡',
    rarity: 'rare',
    unlocked: true,
  },
  {
    id: 'mentor',
    name: 'MENTOR',
    description: 'Trained 20+ junior developers',
    icon: '🎓',
    rarity: 'common',
    unlocked: true,
  },
  {
    id: 'ai',
    name: 'AI PIONEER',
    description: 'Integrate AI into 10 projects',
    icon: '🤖',
    rarity: 'legendary',
    unlocked: false,
    progress: { current: 7, max: 10 },
  },
];

const rarityColors = {
  common: 'text-muted-foreground',
  rare: 'text-primary',
  epic: 'text-secondary',
  legendary: 'text-accent',
};

const rarityBg = {
  common: 'from-muted to-muted/50',
  rare: 'from-primary/30 to-primary/10',
  epic: 'from-secondary/30 to-secondary/10',
  legendary: 'from-accent/30 to-accent/10',
};

export const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [popupAchievement, setPopupAchievement] = useState<Achievement | null>(null);

  const triggerPopup = (achievement: Achievement) => {
    if (!achievement.unlocked) return;
    setPopupAchievement(achievement);
    setTimeout(() => setPopupAchievement(null), 3000);
  };

  return (
    <section
      id="achievements"
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
            [ UNLOCKED ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            ACHIEVEMENTS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Milestones and accolades earned through excellence
          </p>
        </motion.div>

        {/* Achievement unlock popup */}
        {popupAchievement && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`
              hud-frame p-4 flex items-center gap-4 
              bg-gradient-to-r ${rarityBg[popupAchievement.rarity]}
              border-2
            `}
              style={{
                borderColor: popupAchievement.rarity === 'legendary' 
                  ? 'hsl(var(--accent))' 
                  : popupAchievement.rarity === 'epic'
                  ? 'hsl(var(--secondary))'
                  : 'hsl(var(--primary))',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-4xl"
              >
                {popupAchievement.icon}
              </motion.span>
              <div>
                <p className="font-mono text-xs text-muted-foreground">ACHIEVEMENT UNLOCKED</p>
                <p className={`font-display text-lg font-bold ${rarityColors[popupAchievement.rarity]}`}>
                  {popupAchievement.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => triggerPopup(achievement)}
              className={`
                group cursor-pointer transition-all duration-300
                ${!achievement.unlocked ? 'opacity-50' : 'hover:scale-105'}
              `}
            >
              <div className={`
                relative p-6 border bg-gradient-to-br ${rarityBg[achievement.rarity]}
                ${achievement.unlocked ? 'border-hud hover:glow-border' : 'border-muted/30 grayscale'}
              `}>
                {/* Rarity indicator */}
                <div className="absolute top-2 right-2">
                  <span className={`font-mono text-[10px] uppercase ${rarityColors[achievement.rarity]}`}>
                    {achievement.rarity}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'blur-sm'}`}
                  whileHover={achievement.unlocked ? { rotate: [0, -10, 10, 0] } : {}}
                >
                  {achievement.unlocked ? achievement.icon : '🔒'}
                </motion.div>

                {/* Info */}
                <h4 className={`font-display text-sm font-bold mb-1 ${rarityColors[achievement.rarity]}`}>
                  {achievement.name}
                </h4>
                <p className="font-body text-xs text-muted-foreground">
                  {achievement.description}
                </p>

                {/* Progress bar for locked */}
                {!achievement.unlocked && achievement.progress && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary">
                        {achievement.progress.current}/{achievement.progress.max}
                      </span>
                    </div>
                    <div className="h-1 bg-muted/30 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(achievement.progress.current / achievement.progress.max) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Shine effect on hover for unlocked */}
                {achievement.unlocked && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, transparent 40%, hsl(var(--primary) / 0.2) 50%, transparent 60%)',
                    }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-accent">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </p>
            <p className="font-mono text-xs text-muted-foreground">ACHIEVEMENTS UNLOCKED</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-secondary">
              {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
            </p>
            <p className="font-mono text-xs text-muted-foreground">LEGENDARY</p>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-primary">
              {achievements.filter(a => a.rarity === 'epic' && a.unlocked).length}
            </p>
            <p className="font-mono text-xs text-muted-foreground">EPIC</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
