/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        sun: 'rgb(var(--sun) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 14px 40px rgba(24, 29, 35, 0.07)',
      },
      keyframes: {
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'card-in': {
          from: { opacity: '0', transform: 'translateX(18px) scale(.985)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up .35s ease-out both',
        'card-in': 'card-in .3s ease-out both',
      },
    },
  },
  plugins: [],
}
