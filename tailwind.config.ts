import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        verso: {
          // Background Colors
          "bg-main": "#F5F3F0",
          "bg-card": "#FAF9F7",

          // Text Colors
          "text-primary": "#2D2A26",
          "text-body": "#3D3A36",
          "text-secondary": "#75716B",
          "text-tertiary": "#9B9690",

          // Accent Colors
          "accent-primary": "#800020",
          "accent-hover": "#660033",
          "accent-secondary": "#9CAF88",

          // Structural Colors
          "border": "#E5E3DF",
          "highlight": "#D1C4B8",
        },
        // Flat color aliases for Header and other components
        "cream": "#FCFBF9",
        "charcoal": "#2D2A26",
        "burgundy": "#800020",
        "sage": "#9CAF88",
        "lightGray": "#E5E3DF",
        "dusty": "#D1C4B8",
        "fffdd0": "#FFFDD0",
      },
      fontFamily: {
        serif: ["Georgia", "Garamond", "serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      lineHeight: {
        relaxed: "1.7",
        "story": "1.8",
      },
      spacing: {
        "breathing": "48px",
        "breathing-lg": "64px",
      },
      borderRadius: {
        "soft": "8px",
        "softer": "12px",
        "pill": "9999px",
      },
      boxShadow: {
        "soft": "0 2px 8px rgba(0, 0, 0, 0.06)",
        "medium": "0 4px 16px rgba(0, 0, 0, 0.08)",
        "book": "inset -8px 0 16px -8px rgba(0, 0, 0, 0.05), inset 8px 0 16px -8px rgba(0, 0, 0, 0.05)",
      },
      maxWidth: {
        "reading": "750px",
      },
    },
  },
  plugins: [],
};

export default config;
