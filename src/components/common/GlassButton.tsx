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
  variant = 'primary',
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
      'bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white shadow-lg shadow-blue-500/25 border border-blue-400/30',
    secondary:
      'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white shadow-md shadow-sky-500/20 border border-sky-400/30',
    glass:
      'bg-white/90 hover:bg-white active:bg-slate-50 text-slate-700 hover:text-blue-600 border border-slate-200/90 hover:border-blue-300 shadow-sm',
    danger:
      'bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 border border-red-200 shadow-sm',
    ghost:
      'bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 active:bg-blue-100/60 border-transparent',
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
