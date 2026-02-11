import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/CyberButton';
import galleryPs5 from '@/assets/gallery-ps5.jpg';
import galleryPc from '@/assets/gallery-pc.jpg';
import galleryVr from '@/assets/gallery-vr.jpg';
import galleryDolby from '@/assets/gallery-dolby.jpg';
import galleryRacing from '@/assets/gallery-racing.jpg';
import galleryChill from '@/assets/gallery-chill.jpg';
import { useState } from 'react';

const allImages = [
  { src: galleryPs5, title: 'PS5 ZONE', category: 'Console' },
  { src: galleryPc, title: 'PC BATTLE STATIONS', category: 'PC' },
  { src: galleryVr, title: 'VR ARENA', category: 'VR' },
  { src: galleryDolby, title: 'DOLBY ATMOS LOUNGE', category: 'Lounge' },
  { src: galleryRacing, title: 'RACING COCKPIT', category: 'Simulator' },
  { src: galleryChill, title: 'CHILL ZONE', category: 'Lounge' },
  // Duplicate with different labels for a fuller gallery feel
  { src: galleryPs5, title: 'PS5 MULTIPLAYER SETUP', category: 'Console' },
  { src: galleryPc, title: 'COMPETITIVE PC RIG', category: 'PC' },
  { src: galleryVr, title: 'VR IMMERSIVE SESSION', category: 'VR' },
  { src: galleryDolby, title: 'PRIVATE SCREENING', category: 'Lounge' },
  { src: galleryRacing, title: 'SIM RACING LEAGUE', category: 'Simulator' },
  { src: galleryChill, title: 'GAMING CAFE AREA', category: 'Lounge' },
];

const categories = ['All', 'Console', 'PC', 'VR', 'Lounge', 'Simulator'];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === 'All'
    ? allImages
    : allImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-hud">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            className="font-display text-sm text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-all"
          >
            &lt; BACK TO HOME
          </motion.button>
          <h1 className="font-display text-xl font-bold text-foreground">
            GAMER'S CREED <span className="text-primary">GALLERY</span>
          </h1>
          <div className="w-[120px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ FULL GALLERY ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">OUR</span>{' '}
            <span className="text-gradient neon-text">ARENA</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Browse all images from our gaming lounge. Follow us on Instagram for the latest updates.
          </p>

          {/* External links */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.a
              href="https://www.instagram.com/gamerscreed_dgl/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="font-display text-sm text-primary border border-primary/30 px-5 py-2.5 hover:bg-primary/10 transition-all"
            >
              VIEW ON INSTAGRAM
            </motion.a>
            <motion.a
              href="https://www.google.com/search?q=Gamers+Creed+Dindigul&tbm=isch"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="font-display text-sm text-secondary border border-secondary/30 px-5 py-2.5 hover:bg-secondary/10 transition-all"
            >
              VIEW ON GOOGLE
            </motion.a>
          </div>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                font-mono text-xs px-4 py-2 border transition-all
                ${activeCategory === cat
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-hud text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }
              `}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, index) => (
            <motion.div
              key={`${img.title}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setSelectedImage(index)}
              className="relative hud-frame overflow-hidden cursor-pointer group aspect-square"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-display text-xs font-bold text-foreground">{img.title}</p>
                <p className="font-mono text-[10px] text-primary">{img.category}</p>
              </div>
              <div className="absolute inset-0 scan-lines opacity-10 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="font-mono text-sm text-muted-foreground mb-6">
            WANT TO SEE MORE? CHECK OUT OUR SOCIAL MEDIA
          </p>
          <div className="flex justify-center gap-4">
            <CyberButton
              variant="primary"
              onClick={() => window.open('https://www.instagram.com/gamerscreed_dgl/', '_blank')}
            >
              INSTAGRAM
            </CyberButton>
            <CyberButton
              variant="secondary"
              onClick={() => window.open('https://www.google.com/maps/place/GAMERS+CREED/', '_blank')}
            >
              GOOGLE MAPS
            </CyberButton>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="w-full h-full object-contain rounded"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
              <p className="font-display text-lg font-bold text-foreground">
                {filteredImages[selectedImage].title}
              </p>
              <p className="font-mono text-xs text-primary">
                {filteredImages[selectedImage].category}
              </p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 font-display text-sm text-foreground border border-hud px-3 py-1 bg-background/80 hover:border-primary transition-all"
            >
              CLOSE
            </button>
            {/* Nav arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : filteredImages.length - 1));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-2xl text-foreground/70 hover:text-primary transition-colors p-2"
            >
              &lt;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev! < filteredImages.length - 1 ? prev! + 1 : 0));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-2xl text-foreground/70 hover:text-primary transition-colors p-2"
            >
              &gt;
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPage;
