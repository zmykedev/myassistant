import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Asegúrate de incluir src/pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Asegúrate de incluir src/components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
