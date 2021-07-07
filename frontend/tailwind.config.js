module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#080808",
        },
        white: {
          DEFAULT: "#eeeeee",
        },
      },
      screens: {
        "3xl": "1800px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
