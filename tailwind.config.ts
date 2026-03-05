import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ATLAS_EO Luxury Color Palette - NO EXTRA COLORS
        "navy-primary": "#0B1F3A",
        "gold-accent": "#C6A85B",
        "bg-off-white": "#F4F1EA",
        "text-charcoal": "#111111",
        // Utility variants
        "navy-dark": "#0a1726",
        "navy-light": "#1a3a52",
        "gold-dark": "#a68a47",
        "gold-light": "#d4b876",
      },
      fontFamily: {
        // Luxury serif for headings
        serif: [
          "Georgia",
          "Garamond",
          "serif",
        ],
        // Modern clean sans-serif for body
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Premium typography scale
        xs: ["12px", { lineHeight: "16px", letterSpacing: "0.5px" }],
        sm: ["14px", { lineHeight: "20px", letterSpacing: "0.3px" }],
        base: ["16px", { lineHeight: "24px", letterSpacing: "0.2px" }],
        lg: ["18px", { lineHeight: "28px", letterSpacing: "0.2px" }],
        xl: ["20px", { lineHeight: "28px", letterSpacing: "0.1px" }],
        "2xl": ["24px", { lineHeight: "32px", letterSpacing: "0.1px" }],
        "3xl": ["30px", { lineHeight: "36px", letterSpacing: "-0.5px" }],
        "4xl": ["36px", { lineHeight: "44px", letterSpacing: "-0.5px" }],
        "5xl": ["48px", { lineHeight: "56px", letterSpacing: "-1px" }],
      },
      letterSpacing: {
        luxury: "0.15em", // For ALL CAPS headings
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      spacing: {
        // Luxury white space scale
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
      },
      borderRadius: {
        // Minimal modern luxury - mostly straight edges, subtle rounding
        none: "0",
        sm: "2px",
        base: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      opacity: {
        5: "0.05",
        10: "0.1",
        15: "0.15",
        20: "0.2",
        25: "0.25",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        45: "0.45",
        50: "0.5",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        90: "0.9",
        95: "0.95",
      },
      transitionDuration: {
        // Subtle, elegant transitions
        150: "150ms",
        200: "200ms",
        250: "250ms",
        300: "300ms",
        350: "350ms",
        400: "400ms",
      },
      backdropBlur: {
        xs: "4px",
        sm: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
