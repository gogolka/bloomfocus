import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'warm-white': '#FEFCFA',
        lavender: '#E8DEFF',
        'lavender-mid': '#D4C5F9',
        'lavender-deep': '#B8A4E8',
        'lavender-dark': '#7B5FCC',
        peach: '#FFD6C4',
        'peach-mid': '#FFBFA8',
        'peach-dark': '#E8956A',
        sage: '#D4E8D4',
        'sage-mid': '#B8D4B8',
        'sage-dark': '#5BA85B',
        blush: '#FFE8E8',
        sky: '#D4EEFF',
        'text-dark': '#2D2926',
        'text-mid': '#6B5F58',
        'text-soft': '#9B8F88',
        border: 'rgba(45,41,38,0.08)',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
