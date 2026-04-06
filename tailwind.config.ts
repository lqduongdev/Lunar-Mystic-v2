import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme
        "dark-bg": "#0D0A1A",
        "dark-bg-card": "#160F2A",
        "dark-bg-input": "#1A1230",
        "dark-border": "#3D2060",
        "dark-border-active": "#8B3DFF",
        "dark-text-primary": "#FFFFFF",
        "dark-text-secondary": "#C8A0E0",
        "dark-text-label": "#FF2D9B",
        "dark-text-caption": "#8B6AAE",
        // Light theme
        "light-bg": "#FAF5FF",
        "light-bg-card": "#FFFFFF",
        "light-border": "#DCC6F0",
        "light-border-active": "#A855F7",
        "light-text-primary": "#2D1B4E",
        "light-text-secondary": "#6B3FA0",
        "light-text-label": "#7C3AED",
        // Shared accents
        "accent-pink": "#FF2D9B",
        "accent-purple": "#8B3DFF",
        "error-red": "#FF4444",
        "moon-icon": "#CC44FF",
        "star-icon": "#FF2D9B",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["system-ui", "sans-serif"],
      },
      backgroundImage: {
        "btn-gradient": "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
        "dark-gradient": "radial-gradient(circle at center, #1A0A2E 0%, #050510 100%)",
        "light-gradient": "linear-gradient(180deg, #FFFFFF 0%, #F0D6FF 100%)",
        "card-gradient": "linear-gradient(135deg, #FF2D9B 0%, #8B3DFF 100%)",
      },
      borderRadius: {
        "pill": "50px",
        "card": "16px",
      },
      height: {
        "btn": "56px",
        "pill": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
