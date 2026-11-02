import React from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full text-right">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={`liquid-glass-input w-full px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 transition-all ${
            icon ? 'pr-10' : ''
          } ${error ? 'border-red-500/50 focus:border-red-400' : ''} ${className}`}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
};
