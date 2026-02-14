/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quanverification: {
          brand: '#15173D',
          'dark-brand': '#0D0E25',
          'light-brand': '#F0F1F6',
          gray: '#F4F4F4',
        }
      }
    },
  },
  plugins: [],
}
