import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#1F2937",
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
        slideIn: "slideIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
});
