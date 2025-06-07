import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#14b8a6", // Teal-500 or your custom teal
        "primary-foreground": "#ffffff", // white text on teal
      },
      fontFamily: {
        matter: ["Matter-Regular", "sans-serif"],
        "matter-bold": ["Matter-Bold", "sans-serif"],
        "matter-light": ["Matter-Light", "sans-serif"],
        "matter-medium": ["Matter-Medium", "sans-serif"],
        "matter-heavy": ["Matter-Heavy", "sans-serif"],
      },
      
    },
  },
  plugins: [],
} satisfies Config;

export default config;
