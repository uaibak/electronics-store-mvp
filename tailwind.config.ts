import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#111827",
        primary: "#0F172A",
        accent: "#2563EB",
        cta: "#F59E0B",
        border: "#E2E8F0",
        muted: "#64748B"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px -22px rgba(15, 23, 42, 0.3)"
      }
    }
  },
  plugins: []
};

export default config;
