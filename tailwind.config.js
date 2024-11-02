/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./*.html"],
  theme: {
    extend: {
      colors: {
        "custom-dark-gray": "#262626",
        "custom-white": "#F2F2F2",
        "custom-green-pool": "#038C7F",
        "custom-magenta": "#8C4660",
        "custom-bubblegum-pink": "#D94A7E",
      }
    },
  },
  plugins: [],
}

