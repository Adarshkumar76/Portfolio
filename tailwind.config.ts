import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030014",
        foreground: "#f3f4f6",
        cosmic: {
          dark: "#030014",
          surface: "#0b0728",
          card: "rgba(15, 11, 46, 0.65)",
          border: "rgba(139, 92, 246, 0.25)",
          accent: "#7042f8",
          purple: "#8b5cf6",
          cyan: "#00f5ff",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "cosmic-gradient": "radial-gradient(circle at 50% 0%, rgba(112, 66, 248, 0.25) 0%, rgba(3, 0, 20, 0.8) 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "glow-radial": "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.35), transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(112, 66, 248, 0.4)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 245, 255, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
