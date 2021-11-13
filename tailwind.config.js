module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appBlue: "#18A0FB"
      },
      fontSize: {
        xss: "0.65rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
