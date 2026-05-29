import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f4f0eb",
        mist: "#1b1d1c",
        brand: "#f5a000",
        success: "#52e3a5",
        warning: "#ffc06f",
        danger: "#ff9d9d",
        obsidian: "#0b0d0d",
        graphite: "#151716",
        copper: "#8a653e",
        sand: "#e8d6bf"
      }
    }
  },
  plugins: []
} satisfies Config;
