import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
  features: string[];
}

const powerUps: PowerUp[] = [
  {
    id: 'speed',
    name: 'SPEED BOOST',
    description: 'Lightning-fast website optimization for maximum performance scores',
    icon: '⚡',
    color: 'primary',
    features: ['Core Web Vitals optimization', 'Code splitting & lazy loading', 'Image optimization', 'CDN configuration'],
  },
  {
    id: 'shield',
    name: 'SHIELD MODE',
    description: 'Secure and stable websites with enterprise-grade protection',
    icon: '🛡️',
    color: 'accent',
    features: ['SSL/HTTPS setup', 'Security headers', 'DDoS protection', 'Regular backups'],
  },
  {
    id: 'weapon',
    name: 'E-COMMERCE WEAPON',
    description: 'Powerful online stores that convert visitors into customers',
    icon: '🛒',
    color: 'secondary',
    features: ['Shopify / WooCommerce', 'Payment integration', 'Inventory management', 'Analytics tracking'],
  },
  {
    id: 'enhancer',
    name: 'UI ENHANCER',
    description: 'Stunning modern interfaces that captivate and engage users',
    icon: '✨',
    color: 'primary',
    features: ['Custom animations', 'Responsive design', 'Accessibility (A11y)', 'Dark/light themes'],
  },
  {
    id: 'multiplier',
    name: 'SEO MULTIPLIER',
    description: 'Search engine domination for organic traffic growth',
    icon: '📈',
    color: 'accent',
    features: ['Technical SEO audit', 'Schema markup', 'Content optimization', 'Performance tracking'],
  },
  {
    id: 'ai',
    name: 'AI INTEGRATION',
    description: 'Next-gen AI-powered features for intelligent experiences',
    icon: '🤖',
    color: 'secondary',
    features: ['Chatbots & assistants', 'Content generation', 'Personalization', 'Smart search'],
  },
];

export const PowerUpsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);

  return (
    <section
      id="powerups"
      className="min-h-screen py-24 px-6 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ ABILITIES ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            POWER UPS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your power-ups to enhance your digital presence
          </p>
        </motion.div>

        {/* Power-up cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {powerUps.map((powerUp, index) => (
            <motion.div
              key={powerUp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              onMouseEnter={() => setActivePowerUp(powerUp.id)}
              onMouseLeave={() => setActivePowerUp(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className={`
                  relative h-full p-6 border-2 bg-card/50 backdrop-blur-sm
                  transition-all duration-500 cursor-pointer
                  ${activePowerUp === powerUp.id
                    ? `border-${powerUp.color} glow-border`
                    : 'border-hud hover:border-hud'
                  }
                `}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                }}
              >
                {/* Activation effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activePowerUp === powerUp.id ? 1 : 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, hsl(var(--${powerUp.color}) / 0.15), transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: activePowerUp === powerUp.id ? [1, 1.2, 1] : 1,
                    rotate: activePowerUp === powerUp.id ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  {powerUp.icon}
                </motion.div>

                {/* Content */}
                <h3 className={`font-display text-xl font-bold mb-2 text-${powerUp.color}`}>
                  {powerUp.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  {powerUp.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2">
                  {powerUp.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={activePowerUp === powerUp.id ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 font-mono text-xs"
                    >
                      <span className={`text-${powerUp.color}`}>▸</span>
                      <span className="text-foreground/80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Status indicator */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    READY TO DEPLOY
                  </span>
                  <motion.div
                    animate={{
                      scale: activePowerUp === powerUp.id ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 1, repeat: activePowerUp === powerUp.id ? Infinity : 0 }}
                    className={`w-3 h-3 rounded-full bg-${powerUp.color}`}
                    style={{
                      boxShadow: activePowerUp === powerUp.id
                        ? `0 0 10px hsl(var(--${powerUp.color})), 0 0 20px hsl(var(--${powerUp.color}))`
                        : 'none',
                    }}
                  />
                </div>

                {/* Corner decorations */}
                <div className={`absolute top-0 right-5 w-0 h-0 border-t-[20px] border-t-${powerUp.color} border-l-[20px] border-l-transparent`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            COMBINE MULTIPLE POWER-UPS FOR MAXIMUM EFFECT
          </p>
        </motion.div>
      </div>
    </section>
  );
};
