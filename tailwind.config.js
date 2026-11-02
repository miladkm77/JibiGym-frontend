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
        background: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F8FAFC',
          active: '#FFFFFF',
          border: '#E2E8F0',
          glow: 'rgba(0, 102, 255, 0.04)'
        },
        brand: {
          blue: {
            DEFAULT: '#0066FF',   // Athletic electric blue
            hover: '#0052CC',
            light: '#EFF6FF',
            glow: 'rgba(0, 102, 255, 0.15)',
          },
          cyan: '#0284C7',        // Sky/cyan accent
          navy: '#0F172A',        // Strong athletic typography
          emerald: '#10B981',     // Success / stamina
          orange: '#F97316',      // Energy / high-intensity
        },
        glass: {
          100: 'rgba(255, 255, 255, 0.75)',
          200: 'rgba(255, 255, 255, 0.90)',
          300: '#FFFFFF',
          border: '#E2E8F0',
          highlight: 'rgba(0, 102, 255, 0.04)',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'glass-heavy': '24px',
      },
      boxShadow: {
        // Subtle Apple HIG shadow: feather-light
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'glass': '0 2px 8px -1px rgba(15, 23, 42, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'glass-card': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px 0 rgba(15, 23, 42, 0.02)',
        'glass-blue': '0 4px 14px -2px rgba(0, 102, 255, 0.18)',
        'floating-tab': '0 4px 16px -2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
