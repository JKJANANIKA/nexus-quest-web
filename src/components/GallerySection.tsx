import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const galleryItems = [
  {
    title: 'PS5 ZONE',
    description: '4K HDR gaming stations with the latest titles',
    icon: '',
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    title: 'PC BATTLE STATIONS',
    description: 'High-end rigs with RTX graphics and ultra-wide displays',
    icon: '',
    gradient: 'from-secondary/20 to-accent/20',
  },
  {
    title: 'VR ARENA',
    description: 'PSVR2 experience with full room-scale tracking',
    icon: '',
    gradient: 'from-accent/20 to-primary/20',
  },
  {
    title: 'DOLBY ATMOS LOUNGE',
    description: 'Private room with cinema-grade surround sound',
    icon: '',
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    title: 'RACING COCKPIT',
    description: 'Logitech G923 full setup with pedals and shifter',
    icon: '',
    gradient: 'from-secondary/20 to-primary/20',
  },
  {
    title: 'CHILL ZONE',
    description: 'Relax between sessions with snacks and drinks',
    icon: '',
    gradient: 'from-accent/20 to-secondary/20',
  },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <section id="gallery" className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ EXPLORE THE ARENA ]
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">INSIDE</span>
            <br />
            <span className="text-gradient neon-text">GAMER'S CREED</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A walkthrough of our premium gaming setup in Dindigul.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
              className={`
                relative hud-frame overflow-hidden cursor-pointer group
                aspect-[4/3] flex flex-col justify-end p-6
                transition-all duration-500
                ${activeItem === index ? 'glow-border' : ''}
              `}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30`} />
              
              {/* Large icon as background */}
              <motion.div
                animate={activeItem === index ? { scale: 1.3, rotate: 10 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl opacity-20 select-none"
              >
                {item.icon}
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={activeItem === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  className="font-body text-sm text-muted-foreground overflow-hidden"
                >
                  {item.description}
                </motion.p>
              </div>

              {/* Scan lines */}
              <div className="absolute inset-0 scan-lines opacity-30 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            SEE MORE ON OUR INSTAGRAM
          </p>
          <motion.a
            href="https://www.instagram.com/gamerscreed_dgl/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 font-display text-sm text-primary border border-primary/30 px-6 py-3 
              hover:bg-primary/10 hover:glow-border transition-all"
          >
            @gamerscreed_dgl
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
