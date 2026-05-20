import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        medha: {
          black: "#000000",
          accent: "#e94e3c",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
