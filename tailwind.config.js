module.exports = {
  mode: "jit",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: "#171717",
          800: "#262626",
          700: "#404040",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
