import React from 'react';

interface GlassBadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'emerald' | 'orange' | 'purple' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/90 shadow-sm shadow-blue-500/5',
    cyan: 'bg-sky-50 text-sky-700 border-sky-200/90 shadow-sm shadow-sky-500/5',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/90 shadow-sm shadow-emerald-500/5',
    orange: 'bg-orange-50 text-orange-700 border-orange-200/90 shadow-sm shadow-orange-500/5',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/90 shadow-sm shadow-purple-500/5',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 shadow-sm',
  }[variant];

  const dotColors = {
    blue: 'bg-blue-600',
    cyan: 'bg-sky-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-600',
    slate: 'bg-slate-500',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-md ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors} animate-pulse`} />}
      <span>{children}</span>
    </span>
  );
};
