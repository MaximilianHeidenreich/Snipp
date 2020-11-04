import { version } from './package.json';
export default {

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Snipp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: '@/assets/css/buefy-overrides.scss', lang: 'sass' }
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Buefy
  buefy: { css: false },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  // Babel configurtation
  babel: {
    babelrc: true, cacheDirectory: undefined, presets: ["@nuxt/babel-preset-app"]
},

  // Env configuration
  env: {
    appVersion: version,
    
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5000'
  }
}
