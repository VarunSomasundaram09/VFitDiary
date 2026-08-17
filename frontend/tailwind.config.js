/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          50: "#EEF0FF",
          100: "#E0E3FF",
          200: "#C4C8FF",
          300: "#9DA1FF",
          400: "#7B75FA",
          500: "#4F46E5",
          600: "#3F35D1",
          700: "#332BAB",
          800: "#2A2489",
          900: "#241F6E",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          50: "#F5F0FF",
          100: "#EBE0FE",
          200: "#D6C2FD",
          300: "#B692FA",
          400: "#9A64F4",
          500: "#7C3AED",
          600: "#6A2AD6",
          700: "#5720AE",
          800: "#481C8C",
          900: "#3C1971",
        },
        success: { DEFAULT: "#22C55E" },
        danger: { DEFAULT: "#EF4444" },
        warning: { DEFAULT: "#F59E0B" },
        surface: {
          dark: "#0F172A",
          card: "#1E293B",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgb(15 23 42 / 0.08)",
        card: "0 8px 30px -8px rgb(15 23 42 / 0.12)",
        glow: "0 0 40px -8px rgb(79 70 229 / 0.45)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgb(248 250 252 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(248 250 252 / 0.05) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "cell-pop": {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "cell-pop": "cell-pop 0.4s ease-out both",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
