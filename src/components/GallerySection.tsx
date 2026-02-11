import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import galleryPs5 from '@/assets/gallery-ps5.jpg';
import galleryPc from '@/assets/gallery-pc.jpg';
import galleryVr from '@/assets/gallery-vr.jpg';
import galleryDolby from '@/assets/gallery-dolby.jpg';
import galleryRacing from '@/assets/gallery-racing.jpg';
import galleryChill from '@/assets/gallery-chill.jpg';

const galleryItems = [
  {
    title: 'PS5 ZONE',
    description: '4K HDR gaming stations with the latest titles',
    image: galleryPs5,
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    title: 'PC BATTLE STATIONS',
    description: 'High-end rigs with RTX graphics and ultra-wide displays',
    image: galleryPc,
    gradient: 'from-secondary/20 to-accent/20',
  },
  {
    title: 'VR ARENA',
    description: 'PSVR2 experience with full room-scale tracking',
    image: galleryVr,
    gradient: 'from-accent/20 to-primary/20',
  },
  {
    title: 'DOLBY ATMOS LOUNGE',
    description: 'Private room with cinema-grade surround sound',
    image: galleryDolby,
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    title: 'RACING COCKPIT',
    description: 'Logitech G923 full setup with pedals and shifter',
    image: galleryRacing,
    gradient: 'from-secondary/20 to-primary/20',
  },
  {
    title: 'CHILL ZONE',
    description: 'Relax between sessions with snacks and drinks',
    image: galleryChill,
    gradient: 'from-accent/20 to-secondary/20',
  },
];

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const navigate = useNavigate();

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
            A walkthrough of our premium gaming setup in Dindigul. Click any image to see the full gallery.
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
              onClick={() => navigate('/gallery')}
              className={`
                relative hud-frame overflow-hidden cursor-pointer group
                aspect-[4/3] flex flex-col justify-end
                transition-all duration-500
                ${activeItem === index ? 'glow-border' : ''}
              `}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={activeItem === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  className="font-body text-sm text-muted-foreground overflow-hidden"
                >
                  {item.description}
                </motion.p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={activeItem === index ? { opacity: 1 } : { opacity: 0 }}
                  className="font-mono text-xs text-primary mt-2 block"
                >
                  CLICK TO VIEW ALL &gt;
                </motion.span>
              </div>

              {/* Scan lines */}
              <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none" />
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
