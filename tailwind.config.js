/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          text: 'var(--accent-text)',
        },
        'on-accent': 'var(--on-accent)',
        'headline-1': 'var(--headline-1)',
        'headline-2': 'var(--headline-2)',
        gold: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-hover)',
        }
      },
      fontFamily: {
        displayHero: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Orbitron', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        theme: 'var(--shadow)',
      },
      clipPath: {
        slant: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)',
        'slant-reverse': 'polygon(0 0, 90% 0, 100% 100%, 10% 100%)'
      }
    },
  },
  plugins: [],
}
