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
        'logoBlue': '#96d3fe',
        'logoSlate': '#183140',
        'logoGrey': '#B7C3CC'
      }
    },
  },
  plugins: [],
};
export default config;
