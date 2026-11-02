import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'surface' | 'glow';
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  interactive = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'highlight':
        return 'liquid-glass-highlight';
      case 'surface':
        return 'bg-white/[0.03] backdrop-blur-md border border-white/5';
      case 'glow':
        return 'liquid-glass shadow-glass-glow border-emerald-500/30';
      default:
        return 'liquid-glass-card';
    }
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-300 relative overflow-hidden ${getVariantStyles()} ${
        interactive ? 'cursor-pointer hover:border-white/25 hover:translate-y-[-2px] active:translate-y-[0px] active:scale-[0.99]' : ''
      } ${className}`}
      {...props}
    >
      {/* Specular rim highlight gradient at top edge */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
