/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ["Pretendard"],
        SBAggro: ["SBAggro"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px", // breakpoint
      xl: "1280px",
    },
  },
  plugins: [],
};
