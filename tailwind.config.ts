import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0E17",
        surface: "#111827",
        elevated: "#1A2236",
        border: "#232B3D",
        signal: "#4FD1C5",
        pulse: "#F0A868",
        ink: "#E8ECF4",
        muted: "#7C879E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
