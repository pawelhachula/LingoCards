/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDarkest: '#070913',
        bgMain: '#0c0f1d',
        bgCard: 'rgba(20, 24, 43, 0.7)',
        bgInput: 'rgba(10, 12, 22, 0.6)',
      }
    },
  },
  plugins: [],
}
