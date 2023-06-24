/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        circle: {
          '0%': { strokeDashoffset: 0 },
          '100%': { strokeDashoffset: 157 },
        },
      },
      animation: {
        '15s-circle-timer': 'circle 15s linear forwards',
      },
    },
  },
  plugins: [],
};
