/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f43f5e",
          dark: "#c2185b",
        },
        accent: {
          DEFAULT: "#f97316",
          dark: "#e8620f",
        },
        peach: "#fda4af",
        ivory: "#fffbf7",
        ink: "#2d0f1e",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "Sora", "sans-serif"],
      },
      backgroundImage: {
        "premium-gradient": "linear-gradient(135deg, #f43f5e 0%, #c2185b 45%, #f97316 100%)",
        "soft-radial-1": "radial-gradient(ellipse 75% 60% at 20% 30%, rgba(244,63,94,.14) 0%, transparent 60%)",
        "soft-radial-2": "radial-gradient(ellipse 65% 65% at 80% 70%, rgba(249,115,22,.11) 0%, transparent 60%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fadeUp 0.7s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
