/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        primary: {
          1: "black",
          2: "#52D5BA",
          3: "#0890FE",
          4: "#3629B7",
          5: "#1E1671",
          6: "#FFAF2A",
          7: "#FB6B18",
          8: "#FF4267",
          DEFAULT: "blue",
        },
        error: {
          DEFAULT: "#ff2828",
        },
        success: {
          DEFAULT: "#3ae53a",
        },
        warning: {
          DEFAULT: "#ffd914",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
