import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CyberButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

export const CyberButton = ({
  children,
  variant = 'primary',
  size = 'md',
  glowing = false,
  className = '',
  ...props
}: CyberButtonProps) => {
  const baseStyles = `
    relative font-display font-bold uppercase tracking-widest
    transition-all duration-300 overflow-hidden
    border-2 backdrop-blur-sm
  `;

  const variantStyles = {
    primary: 'border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-foreground',
    secondary: 'border-secondary bg-secondary/10 text-secondary hover:bg-secondary/20',
    accent: 'border-accent bg-accent/10 text-accent hover:bg-accent/20',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };

  const glowStyles = {
    primary: '0 0 20px hsl(180 100% 50% / 0.5), 0 0 40px hsl(180 100% 50% / 0.3)',
    secondary: '0 0 20px hsl(270 100% 65% / 0.5), 0 0 40px hsl(270 100% 65% / 0.3)',
    accent: '0 0 20px hsl(150 100% 50% / 0.5), 0 0 40px hsl(150 100% 50% / 0.3)',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
        boxShadow: glowing ? glowStyles[variant] : undefined,
      }}
      {...props}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background: `linear-gradient(135deg, transparent 0%, hsl(var(--${variant}) / 0.3) 100%)`,
        }}
      />
      
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ y: '-100%' }}
        whileHover={{ y: '100%' }}
        transition={{ duration: 0.5, ease: 'linear' }}
        style={{
          background: 'linear-gradient(transparent, hsl(var(--primary) / 0.2), transparent)',
          height: '50%',
        }}
      />
    </motion.button>
  );
};
