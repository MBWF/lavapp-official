/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        futura: ['"Futura Std", sans-serif'],
        robotoSlab: ['"Roboto Slab", sans-serif'],
        poppins: ['"Poppins", sans-serif'],
        objektiv: ['"Objektiv Mk1", sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#5887FF",
          secundary: "#102E4A",
          info: "#715AFF",
          warning: "#FFD275",
          error: "#FB4B4E",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
