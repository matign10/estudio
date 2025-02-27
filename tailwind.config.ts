
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0A2240",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4A5568",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#2B6CB0",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F7FAFC",
          foreground: "#4A5568",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-down": "fade-down 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      boxShadow: {
        "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 30px -3px rgba(0, 0, 0, 0.08)",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
