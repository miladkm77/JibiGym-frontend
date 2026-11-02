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
        background: '#F6F8FB',
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.85)',
          hover: 'rgba(255, 255, 255, 0.95)',
          active: '#FFFFFF',
          border: 'rgba(226, 232, 240, 0.8)',
          glow: 'rgba(0, 102, 255, 0.05)'
        },
        brand: {
          blue: {
            DEFAULT: '#0066FF',   // Athletic electric blue
            hover: '#0052CC',
            light: '#EBF3FF',
            glow: 'rgba(0, 102, 255, 0.25)',
          },
          cyan: '#0284C7',        // Sky/cyan accent
          navy: '#0F172A',        // Strong athletic typography
          emerald: '#10B981',     // Success / stamina
          orange: '#F97316',      // Energy / high-intensity
        },
        glass: {
          100: 'rgba(255, 255, 255, 0.70)',
          200: 'rgba(255, 255, 255, 0.85)',
          300: 'rgba(255, 255, 255, 0.95)',
          border: 'rgba(255, 255, 255, 0.9)',
          highlight: 'rgba(0, 102, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '4px',
        'glass': '20px',
        'glass-heavy': '30px',
      },
      boxShadow: {
        'glass': '0 8px 30px -4px rgba(0, 102, 255, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        'glass-blue': '0 10px 30px -5px rgba(0, 102, 255, 0.25), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-card': '0 10px 25px -3px rgba(15, 23, 42, 0.05), 0 4px 10px -2px rgba(15, 23, 42, 0.03), inset 0 1px 0 0 #FFFFFF',
        'floating-tab': '0 10px 35px -5px rgba(0, 102, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.95)',
      },
    },
  },
  plugins: [],
}
