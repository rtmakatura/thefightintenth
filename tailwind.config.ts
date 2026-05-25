import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#EDEDF0",
        tan: "#95959E",
        "dark-bg": "#141418",
        "rich-mid": "#28282E",
        accent: "#4894D0",
        "accent-dark": "#3070A8",
        "text-pri": "#141416",
        "text-sec": "#52525C",
        "text-light": "#EDEDF0",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Source Sans 3"', '"Segoe UI"', "sans-serif"],
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.12)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 20s ease-in-out infinite alternate",
        "fade-up": "fade-up 1.2s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
