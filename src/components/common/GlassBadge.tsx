import React from 'react';

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'orange' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    orange: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    slate: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  }[variant];

  const dotColors = {
    emerald: 'bg-emerald-400',
    cyan: 'bg-cyan-400',
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
    slate: 'bg-slate-400',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border backdrop-blur-md ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors} animate-pulse`} />}
      <span>{children}</span>
    </span>
  );
};
