import React from 'react';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'glass',
  size = 'md',
  fullWidth = false,
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2 font-medium',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-black shadow-lg shadow-emerald-500/25 border border-emerald-400/50',
    secondary:
      'bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-black shadow-lg shadow-cyan-500/25 border border-cyan-400/50',
    glass:
      'liquid-glass text-white hover:bg-white/10 active:bg-white/15 border-white/15 hover:border-white/30',
    danger:
      'bg-red-500/20 text-red-200 hover:bg-red-500/30 active:bg-red-500/40 border border-red-500/30 shadow-lg shadow-red-500/10',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 border-transparent',
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={`liquid-button inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};
