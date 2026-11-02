import React from 'react';

export interface SegmentOption<T extends string | number> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      className={`relative p-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between ${className}`}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative flex-1 py-2 px-3 text-xs md:text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer z-10 ${
              isSelected
                ? 'text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 active:text-white'
            }`}
          >
            {isSelected && (
              <span className="absolute inset-0 bg-white/15 backdrop-blur-lg border border-white/20 rounded-xl shadow-glass -z-10 animate-fade-in" />
            )}
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            <span className="truncate">{option.label}</span>
            {option.badge !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-300'
                }`}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
