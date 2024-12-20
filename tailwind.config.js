/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js pages (if you're using Next.js)
    './components/**/*.{js,ts,jsx,tsx}', // For your components
    './app/**/*.{js,ts,jsx,tsx}', // If you're using the app directory in Next.js 13+
    './app/globals.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        title:['Varela Round']
      },
      colors: {
        appBg: '#D7DDE1',
        appFg: '#F9FBFC',
        appSecondary: '#d1f4f4'
      }
    },
  },
  plugins: [],
}
