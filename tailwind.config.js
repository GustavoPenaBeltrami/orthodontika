/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f6fb',
          100: '#efecf7',
          200: '#ddd6ee',
          300: '#c4b5de',
          400: '#a68bc9',
          500: '#8b66b3',
          600: '#744d96',
          700: '#5f3e7a',
          800: '#4f3464',
          900: '#3a2c57',
          950: '#2a1d3f',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        accent: {
          50: '#fef7f0',
          100: '#feedd8',
          200: '#fdd7b0',
          300: '#fbba7e',
          400: '#f8954a',
          500: '#f57224',
          600: '#df541e',
          700: '#c43e17',
          800: '#a03318',
          900: '#822d19',
        }
      }
    },
  },
  plugins: [],
}
