import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'HOME', icon: '🏠' },
  { id: 'experiences', label: 'EXPERIENCES', icon: '🎮' },
  { id: 'pricing', label: 'PRICING', icon: '💰' },
  { id: 'gallery', label: 'GALLERY', icon: '📸' },
  { id: 'booking', label: 'BOOK NOW', icon: '🎯' },
];

interface GameNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const GameNav = ({ activeSection, onNavigate }: GameNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="hud-frame p-2 ml-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 font-display text-sm tracking-wider
                  transition-all duration-300 group
                  ${activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
                  }
                `}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-0 h-full w-1 bg-primary"
                    style={{
                      boxShadow: '0 0 10px hsl(180 100% 50%), 0 0 20px hsl(180 100% 50%)',
                    }}
                  />
                )}
                
                <span className="text-lg">{item.icon}</span>
                
                <AnimatePresence>
                  {(hoveredItem === item.id || activeSection === item.id) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, hsl(180 100% 50% / 0.1), transparent)',
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden hud-frame p-3"
      >
        <div className="flex flex-col gap-1.5 w-6">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            className="h-0.5 bg-primary w-full"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="h-0.5 bg-primary w-full"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            className="h-0.5 bg-primary w-full"
          />
        </div>
      </motion.button>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden backdrop-cyber"
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 bg-card border-l border-hud p-8 pt-20"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center gap-4 px-4 py-4 font-display text-lg tracking-wider
                      transition-all duration-300 border border-transparent
                      ${activeSection === item.id
                        ? 'text-primary border-primary bg-primary/10 glow-border'
                        : 'text-foreground/70 hover:text-foreground hover:border-primary/30'
                      }
                    `}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
