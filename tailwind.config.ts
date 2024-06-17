import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "copilot-kit-primary-color": "#2DD4BF", // Define tu color primario
        "copilot-kit-contrast-color": "#FFFFFF", // Define tu color de contraste
        "copilot-kit-separator-color": "#E0E0E0", // Define tu color de separador
      },
    },
  },
  plugins: [],
};
export default config;
