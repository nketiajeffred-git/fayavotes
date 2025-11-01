import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E31E24',
          dark: '#B71C1C',
          light: '#FF5252',
        },
        navy: {
          DEFAULT: '#1E1B4B',
          light: '#312E81',
          dark: '#0F0D2E',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFF59D',
          dark: '#F9A825',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
