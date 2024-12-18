/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js pages (if you're using Next.js)
    './components/**/*.{js,ts,jsx,tsx}', // For your components
    './app/**/*.{js,ts,jsx,tsx}', // If you're using the app directory in Next.js 13+
  ],
  theme: {
    extend: {
      fontFamily: {
        title:['Inter']
      },
    },
  },
  plugins: [],
}
