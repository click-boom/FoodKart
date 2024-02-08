/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { montserrat: ["Montserrat"], noto: ["Noto+Sans"] },
      colors: { off: "#262C3A", main: "#FFD700" },
    },
  },
  plugins: [],
};
