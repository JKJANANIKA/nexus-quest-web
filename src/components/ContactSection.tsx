import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { CyberButton } from './CyberButton';

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 relative overflow-hidden"
    >
      {/* Background effects */}
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
        {/* Section header */}
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
            <span className="text-6xl">💀</span>
          </motion.div>
          
          <p className="font-mono text-sm text-destructive tracking-widest mb-2 animate-pulse">
            [ FINAL BOSS ENCOUNTER ]
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">START YOUR</span>
            <br />
            <span className="text-gradient neon-text">PROJECT</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to level up? Submit your mission briefing below.
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
              MISSION ACCEPTED!
            </h3>
            <p className="font-body text-lg text-muted-foreground mb-6">
              Your briefing has been received. Expect a response within 24 hours.
            </p>
            <div className="flex justify-center gap-2">
              {['⭐', '⭐', '⭐', '⭐', '⭐'].map((star, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-2xl"
                >
                  {star}
                </motion.span>
              ))}
            </div>
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
              {/* Name */}
              <div>
                <label className="block font-mono text-xs text-primary mb-2">
                  OPERATIVE NAME *
                </label>
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

              {/* Email */}
              <div>
                <label className="block font-mono text-xs text-primary mb-2">
                  COMM CHANNEL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                    transition-all placeholder:text-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block font-mono text-xs text-primary mb-2">
                  MISSION TYPE *
                </label>
                <select
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                    transition-all"
                >
                  <option value="">Select mission type</option>
                  <option value="website">New Website</option>
                  <option value="ecommerce">E-Commerce Store</option>
                  <option value="webapp">Web Application</option>
                  <option value="redesign">Website Redesign</option>
                  <option value="optimization">Performance Optimization</option>
                  <option value="other">Other Mission</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block font-mono text-xs text-primary mb-2">
                  RESOURCE ALLOCATION
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                    focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                    transition-all"
                >
                  <option value="">Select budget range</option>
                  <option value="5k">$5,000 - $10,000</option>
                  <option value="10k">$10,000 - $25,000</option>
                  <option value="25k">$25,000 - $50,000</option>
                  <option value="50k">$50,000+</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <label className="block font-mono text-xs text-primary mb-2">
                MISSION BRIEFING *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-input border border-hud px-4 py-3 font-body text-foreground 
                  focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                  transition-all placeholder:text-muted-foreground resize-none"
                placeholder="Describe your mission objectives, timeline, and any specific requirements..."
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground">
                * Required fields
              </p>
              
              <CyberButton
                type="submit"
                variant="primary"
                size="lg"
                glowing
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⚡
                    </motion.span>
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    🚀 LAUNCH PROJECT
                  </>
                )}
              </CyberButton>
            </div>
          </motion.form>
        )}

        {/* Alternative contact methods */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            OR CONNECT THROUGH OTHER CHANNELS
          </p>
          <div className="flex justify-center gap-4">
            {[
              { icon: '💼', label: 'LinkedIn', href: '#' },
              { icon: '🐙', label: 'GitHub', href: '#' },
              { icon: '🐦', label: 'Twitter', href: '#' },
              { icon: '📧', label: 'Email', href: 'mailto:hello@example.com' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 p-4 border border-hud bg-card/30 
                  hover:border-primary hover:glow-border transition-all"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-mono text-xs text-muted-foreground">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
