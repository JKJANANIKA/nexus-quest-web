import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CyberButton } from './CyberButton';

const pricingPlans = [
  {
    name: 'QUICK MATCH',
    duration: '1 Hour',
    icon: '',
    prices: [
      { platform: 'PS5 / PC', price: '₹80' },
      { platform: 'VR (PSVR2)', price: '₹120' },
      { platform: 'Racing Sim', price: '₹100' },
    ],
    features: ['Any available station', 'Game library access', 'Standard seating'],
    popular: false,
  },
  {
    name: 'RANKED SESSION',
    duration: '3 Hours',
    icon: '',
    prices: [
      { platform: 'PS5 / PC', price: '₹200' },
      { platform: 'VR (PSVR2)', price: '₹300' },
      { platform: 'Racing Sim', price: '₹250' },
    ],
    features: ['Reserved station', 'Game library access', 'Complimentary drink', 'Priority seating'],
    popular: true,
  },
  {
    name: 'MARATHON',
    duration: '5+ Hours',
    icon: '',
    prices: [
      { platform: 'PS5 / PC', price: '₹300' },
      { platform: 'VR (PSVR2)', price: '₹450' },
      { platform: 'Racing Sim', price: '₹400' },
    ],
    features: ['Guaranteed station', 'Full game library', 'Snacks & drinks included', 'Dolby Atmos lounge access'],
    popular: false,
  },
  {
    name: 'PRIVATE LOUNGE',
    duration: 'Per Hour',
    icon: '',
    prices: [
      { platform: 'Dolby Atmos Room', price: '₹500' },
      { platform: 'Group (4 players)', price: '₹1500' },
    ],
    features: ['Private room', 'Dolby Atmos surround', 'Premium seating', 'All platforms available', 'Dedicated host'],
    popular: false,
  },
];

interface PricingSectionProps {
  onNavigate: (id: string) => void;
}

export const PricingSection = ({ onNavigate }: PricingSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ SELECT YOUR PLAN ]
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">CHOOSE YOUR</span>
            <br />
            <span className="text-gradient neon-text">LOADOUT</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From quick sessions to marathon gaming, we've got the perfect plan for every player.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`
                relative hud-frame p-6 flex flex-col transition-all duration-500
                ${plan.popular ? 'border-primary glow-border' : ''}
                ${hoveredPlan === index ? 'glow-border' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[10px] bg-primary text-primary-foreground px-3 py-1 tracking-widest">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-3xl mb-3">{plan.icon}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="font-mono text-xs text-primary mb-4">{plan.duration}</p>

              {/* Prices */}
              <div className="space-y-2 mb-6">
                {plan.prices.map((p) => (
                  <div key={p.platform} className="flex justify-between items-center">
                    <span className="font-mono text-xs text-muted-foreground">{p.platform}</span>
                    <span className="font-display text-lg font-bold text-foreground">{p.price}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="text-primary text-xs">▸</span>
                    <span className="font-mono text-xs text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <CyberButton
                variant={plan.popular ? 'primary' : 'secondary'}
                size="sm"
                glowing={plan.popular}
                onClick={() => onNavigate('booking')}
                className="w-full"
              >
                BOOK NOW
              </CyberButton>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-mono text-xs text-muted-foreground/50 mt-8"
        >
          * Prices are approximate and may vary. Contact us for group bookings and special events.
        </motion.p>
      </div>
    </section>
  );
};
