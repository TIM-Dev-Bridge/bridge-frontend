module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        appBlue: "#18A0FB"
      },
      height: {
        appHeight0 : "0.5px",
        appPopupSectionHeight: "200px",
        appCalHeight: "calc(100% - 48px);"
      },
      minHeight: {
        appMinHeight: "0px"
      },
      fontSize: {
        xss: "0.65rem"
      },
      backgroundColor: {
        appBlur: "rgba(59, 130, 246, 0.5);"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
