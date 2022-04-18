const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "warm-gray": colors.stone,
        teal: colors.teal,
        primary: {
          50: "#e4e8ee",
          100: "#bbc6d7",
          200: "#90a1bb",
          300: "#667ea0",
          400: "#44638e",
          500: "#1d4a7e",
          600: "#154376",
          700: "#0a3a6b",
          800: "#03315f",
          900: "#002147"
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ],
}
