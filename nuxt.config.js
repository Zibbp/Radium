module.exports = {
  publicRuntimeConfig: {
    HLS_URL:
      process.env.HLS_URL ||
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    BASE_URL: process.env.BACKEND_URL || "http://localhost:3000",
    ADMIN_TOKEN: process.env.ADMIN_TOKEN
  },
  privateRuntimeConfig: {
    ADMIN_TOKEN: process.env.ADMIN_TOKEN
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["plyr/dist/plyr.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vue-plyr"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  telemetry: false
};
