import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dark-color-gradient":
          "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)",
        "light-color-gradient":
          "linear-gradient(180deg,#e9effa 0%,rgba(233, 239, 250, 0.5) 100%)",
      },
      colors: {
        "dark-main-bg": "#20212c",
        "dark-secondary-bg": "#2b2c37",
        "dark-light-lines": "#3e3f4e",

        "dark-color-placeholder": "rgba(255, 255, 255, 0.25)",

        "light-main-bg": "#f4f7fd",
        "light-lines": "#e4ebfa",

        "lighter-purple": "rgba(99, 95, 199, 0.1)",
        "lighter-purple-hover": "rgba(99, 95, 199, 0.25)",
        "light-color-placeholder": "rgba(0, 1, 18, 0.25)",

        "color-medium-gray": "#828fa3",
        "color-white": "#fff",
        "color-purple": "#635fc7",
        "color-light-purple": "#726edb",
        "color-red": "#ea5555",
        "color-light-red": "#ff9898",
        "color-black": "#000112",
      },
      screens: {
        "ms": "500px"
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
