/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lob: ["Lobster", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lnd_blue: "#E7FAFE",
        grey_fill: "#DBE2E5",
        fade_txt: "#8E8F93",
        linear_fade_green: "#708246",
        'soft-green': '#6CC63F',
         'card-gradient-start': '#E0F4E6', // A very light, almost white-green for the bottom of the card gradient
        'card-gradient-end': '#FFFFFF',   // Pure white for the top of the card gradient
        'card-shadow': 'rgba(0, 0, 0, 0.08)'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
       boxShadow: { // Define custom shadows if you need precise control beyond default
        'card-lift': '0px 10px 15px -3px var(--tw-shadow-color)', // Standard soft shadow
      }
    },
  },
  plugins: [],
};
