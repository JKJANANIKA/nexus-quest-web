import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CyberButton } from './CyberButton';

export const BookingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    platform: '',
    players: '',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const whatsappLink = `https://wa.me/917010519965?text=${encodeURIComponent(
    `Hi Gamer's Creed! I'd like to book a session.\nName: ${formData.name}\nPlatform: ${formData.platform}\nPlayers: ${formData.players}\nDate: ${formData.date}\nTime: ${formData.time}\n${formData.message ? `Note: ${formData.message}` : ''}`
  )}`;

  return (
    <section id="booking" className="min-h-screen py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
          filter: 'blur(100px)',
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <span className="text-6xl">🎮</span>
          </motion.div>

          <p className="font-mono text-sm text-primary tracking-widest mb-2 animate-pulse">
            [ BOOK YOUR SESSION ]
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">READY TO</span>
            <br />
            <span className="text-gradient neon-text">PLAY?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Reserve your gaming station and get ready for an epic session.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hud-frame p-12 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 1 }}
              className="text-7xl mb-6"
            >
              🏆
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-accent mb-4">
              SESSION BOOKED!
            </h3>
            <p className="font-body text-lg text-muted-foreground mb-6">
              We'll confirm your booking shortly. See you at the arena!
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              Or reach us directly: <a href="tel:+917010519965" className="text-primary">+91 70105 19965</a>
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="hud-frame p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-mono text-xs text-primary mb-2">PLAYER NAME *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                    transition-all placeholder:text-muted-foreground"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-primary mb-2">PHONE NUMBER *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                    transition-all placeholder:text-muted-foreground"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-primary mb-2">PLATFORM *</label>
                <select
                  required
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="">Select platform</option>
                  <option value="ps5">PS5</option>
                  <option value="pc">PC Gaming</option>
                  <option value="vr">VR (PSVR2)</option>
                  <option value="sim">Racing Simulator</option>
                  <option value="lounge">Dolby Atmos Lounge</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-primary mb-2">PLAYERS</label>
                <select
                  value={formData.players}
                  onChange={(e) => setFormData({ ...formData, players: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="">How many players?</option>
                  <option value="1">Solo</option>
                  <option value="2">Duo</option>
                  <option value="3-4">Squad (3-4)</option>
                  <option value="5+">Party (5+)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-primary mb-2">DATE *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-primary mb-2">PREFERRED TIME</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                >
                  <option value="">Select time slot</option>
                  <option value="10:30">10:30 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-mono text-xs text-primary mb-2">SPECIAL REQUESTS</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                  focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                  transition-all placeholder:text-muted-foreground resize-none"
                placeholder="Any specific games, birthday setup, tournament request..."
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground">* Required fields</p>
              <div className="flex gap-3">
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 font-display text-sm border border-accent text-accent px-5 py-3
                    hover:bg-accent/10 transition-all tracking-wider"
                >
                  💬 WHATSAPP
                </motion.a>
                <CyberButton type="submit" variant="primary" size="lg" glowing disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⚡
                      </motion.span>
                      BOOKING...
                    </>
                  ) : (
                    <>🎮 BOOK SESSION</>
                  )}
                </CyberButton>
              </div>
            </div>
          </motion.form>
        )}

        {/* Store info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: '📍', label: 'LOCATION', value: '34, Siluvathur Rd, Elli Nagar, Dindigul', href: 'https://maps.google.com/?q=Gamers+Creed+Dindigul' },
            { icon: '📞', label: 'CALL US', value: '+91 70105 19965', href: 'tel:+917010519965' },
            { icon: '⏰', label: 'HOURS', value: '10:30 AM – 9:30 PM Daily', href: undefined },
          ].map((info) => (
            <motion.a
              key={info.label}
              href={info.href}
              target={info.href?.startsWith('http') ? '_blank' : undefined}
              rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.02 }}
              className="hud-frame p-4 text-center hover:glow-border transition-all block"
            >
              <span className="text-2xl block mb-2">{info.icon}</span>
              <p className="font-mono text-[10px] text-primary tracking-widest mb-1">{info.label}</p>
              <p className="font-body text-sm text-muted-foreground">{info.value}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
