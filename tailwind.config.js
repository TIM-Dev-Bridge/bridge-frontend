module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appBlue: "#18A0FB"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
