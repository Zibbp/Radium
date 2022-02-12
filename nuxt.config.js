export default {
  ssr: true,
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Radium",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  publicRuntimeConfig: {
    initialSourceType: process.env.INITIAL_SOURCE_TYPE,
    initialSourceUrl: process.env.INITIAL_SOURCE_URL,
    io: {
      // will be available in this.$config.io
      sockets: [
        {
          name: "main",
          url: process.env.BASE_URL || "http://localhost:3000",
          default: true,
        },
      ],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxt/postcss8"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "~/io",
    "nuxt-socket-io",
    "vue-toastification/nuxt",
  ],
  toast: {
    position: "bottom-center",
    timeout: 3000,
    closeOnClick: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  io: {
    sockets: [{ name: "config", url: "http://localhost:3000", default: false }],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  },
};
