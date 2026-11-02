/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090B0E',
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.04)',
          hover: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.10)',
          glow: 'rgba(255, 255, 255, 0.03)'
        },
        brand: {
          lime: '#10B981',       // Energy lime / success
          cyan: '#06B6D4',       // Clean cyan / recovery
          neon: '#22C55E',       // Neon green
          orange: '#F97316',     // High intensity / strength
          purple: '#A855F7',     // Premium accent
        },
        glass: {
          100: 'rgba(255, 255, 255, 0.04)',
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.14)',
          border: 'rgba(255, 255, 255, 0.12)',
          highlight: 'rgba(255, 255, 255, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        'glass-heavy': '32px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'glass-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'floating-tab': '0 -4px 30px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
}
