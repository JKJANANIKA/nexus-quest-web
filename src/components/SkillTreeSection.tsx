import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  unlocked: boolean;
  connections: string[];
  position: { x: number; y: number };
  branch: 'frontend' | 'backend' | 'design' | 'devops';
}

const skills: Skill[] = [
  // Core
  { id: 'core', name: 'Web Dev Core', description: 'Foundation of all web development skills', icon: '🌐', level: 10, unlocked: true, connections: ['react', 'node', 'design-core'], position: { x: 50, y: 50 }, branch: 'frontend' },
  
  // Frontend branch
  { id: 'react', name: 'React.js', description: 'Component-based UI development with React ecosystem', icon: '⚛️', level: 9, unlocked: true, connections: ['nextjs', 'typescript'], position: { x: 25, y: 30 }, branch: 'frontend' },
  { id: 'nextjs', name: 'Next.js', description: 'Full-stack React framework with SSR/SSG', icon: '▲', level: 8, unlocked: true, connections: ['performance'], position: { x: 10, y: 15 }, branch: 'frontend' },
  { id: 'typescript', name: 'TypeScript', description: 'Type-safe JavaScript for scalable applications', icon: '📘', level: 9, unlocked: true, connections: ['testing'], position: { x: 40, y: 15 }, branch: 'frontend' },
  
  // Backend branch
  { id: 'node', name: 'Node.js', description: 'Server-side JavaScript runtime', icon: '🟢', level: 8, unlocked: true, connections: ['database', 'api'], position: { x: 75, y: 30 }, branch: 'backend' },
  { id: 'database', name: 'Databases', description: 'SQL, PostgreSQL, MongoDB expertise', icon: '🗄️', level: 7, unlocked: true, connections: ['security'], position: { x: 90, y: 15 }, branch: 'backend' },
  { id: 'api', name: 'API Design', description: 'RESTful and GraphQL API architecture', icon: '🔌', level: 8, unlocked: true, connections: ['security'], position: { x: 60, y: 15 }, branch: 'backend' },
  
  // Design branch
  { id: 'design-core', name: 'UI/UX Design', description: 'User-centered design principles', icon: '🎨', level: 8, unlocked: true, connections: ['figma', 'animation'], position: { x: 50, y: 70 }, branch: 'design' },
  { id: 'figma', name: 'Figma', description: 'Design tool mastery and prototyping', icon: '🖼️', level: 7, unlocked: true, connections: [], position: { x: 30, y: 85 }, branch: 'design' },
  { id: 'animation', name: 'Motion Design', description: 'CSS/JS animations and micro-interactions', icon: '✨', level: 8, unlocked: true, connections: [], position: { x: 70, y: 85 }, branch: 'design' },
  
  // DevOps (locked for effect)
  { id: 'performance', name: 'Performance', description: 'Web vitals optimization and speed', icon: '⚡', level: 9, unlocked: true, connections: [], position: { x: 15, y: 50 }, branch: 'devops' },
  { id: 'testing', name: 'Testing', description: 'Unit, integration, and E2E testing', icon: '🧪', level: 7, unlocked: true, connections: [], position: { x: 35, y: 50 }, branch: 'devops' },
  { id: 'security', name: 'Security', description: 'Web security best practices', icon: '🔒', level: 6, unlocked: false, connections: [], position: { x: 85, y: 50 }, branch: 'devops' },
];

const branchColors = {
  frontend: 'primary',
  backend: 'accent',
  design: 'secondary',
  devops: 'neon-pink',
};

export const SkillTreeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm text-primary tracking-widest mb-2">
            [ ABILITY TREE ]
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient mb-4">
            SKILL TREE
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hover over skills to reveal abilities. Click to inspect.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {Object.entries(branchColors).map(([branch, color]) => (
            <div key={branch} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${color}`} />
              <span className="font-mono text-xs text-muted-foreground uppercase">
                {branch}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skill tree visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative hud-frame p-8 min-h-[500px]"
        >
          {/* Connection lines - SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {skills.map((skill) =>
              skill.connections.map((connId) => {
                const target = skills.find((s) => s.id === connId);
                if (!target) return null;
                return (
                  <motion.line
                    key={`${skill.id}-${connId}`}
                    x1={`${skill.position.x}%`}
                    y1={`${skill.position.y}%`}
                    x2={`${target.position.x}%`}
                    y2={`${target.position.y}%`}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                );
              })
            )}
          </svg>

          {/* Skill nodes */}
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${skill.position.x}%`,
                top: `${skill.position.y}%`,
              }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setSelectedSkill(skill)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative w-14 h-14 md:w-16 md:h-16 rounded-full cursor-pointer
                  flex items-center justify-center text-2xl
                  border-2 transition-all duration-300
                  ${skill.unlocked
                    ? `border-${branchColors[skill.branch]} bg-${branchColors[skill.branch]}/20`
                    : 'border-muted bg-muted/20 grayscale'
                  }
                  ${hoveredSkill?.id === skill.id ? 'animate-pulse-glow' : ''}
                `}
              >
                <span className={skill.unlocked ? '' : 'opacity-50'}>
                  {skill.icon}
                </span>
                
                {/* Level indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-hud flex items-center justify-center">
                  <span className="font-mono text-xs text-primary">
                    {skill.level}
                  </span>
                </div>

                {/* Glow effect for unlocked */}
                {skill.unlocked && (
                  <div
                    className="absolute inset-0 rounded-full opacity-50 blur-md -z-10"
                    style={{
                      background: `radial-gradient(circle, hsl(var(--${branchColors[skill.branch]}) / 0.5), transparent)`,
                    }}
                  />
                )}
              </motion.div>

              {/* Skill name */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredSkill?.id === skill.id ? 1 : 0.7 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 font-mono text-xs text-center whitespace-nowrap"
              >
                {skill.name}
              </motion.p>
            </motion.div>
          ))}

          {/* Skill info panel */}
          {(hoveredSkill || selectedSkill) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 hud-frame p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{(hoveredSkill || selectedSkill)?.icon}</span>
                <div className="flex-1">
                  <h4 className="font-display text-lg font-bold text-foreground">
                    {(hoveredSkill || selectedSkill)?.name}
                  </h4>
                  <p className="font-mono text-xs text-primary mb-2">
                    Level {(hoveredSkill || selectedSkill)?.level} / 10
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {(hoveredSkill || selectedSkill)?.description}
                  </p>
                  
                  {/* Skill progress bar */}
                  <div className="mt-3 h-2 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((hoveredSkill || selectedSkill)?.level || 0) * 10}%` }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: 'Total Skills', value: skills.length },
            { label: 'Unlocked', value: skills.filter(s => s.unlocked).length },
            { label: 'Avg Level', value: (skills.reduce((a, s) => a + s.level, 0) / skills.length).toFixed(1) },
            { label: 'Mastered', value: skills.filter(s => s.level >= 9).length },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 border border-hud bg-card/30">
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
