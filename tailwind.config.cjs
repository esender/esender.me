/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        warm: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#e8e4df",
          300: "#d4cec6",
          400: "#a39e94",
          500: "#737068",
          600: "#5c5952",
          700: "#3d3b37",
          800: "#2d2926",
          900: "#1a1a1a",
        },
        accent: {
          DEFAULT: "#c47d5c",
          hover: "#a86648",
          light: "#d4a088",
          muted: "#e8c4b5",
        },
      },
    },
  },
  plugins: [],
};
