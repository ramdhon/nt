import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Nidal Toman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  target: 'server',

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/i18n.js',
    { src: '~~/node_modules/vue-rellax/lib/nuxt-plugin', ssr: false },
    { src: '@/plugins/vue-awesome-swiper', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  router: {
    middleware: 'i18n',
  },

  serverMiddleware: [
    '~/api/mail.js',
    { path: '/api/ping', handler: '~/api/hello.js' },
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    ['nuxt-gmaps', { key: process.env.NUXT_ENV_GMAP_APIKEY }],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'fa',
      font: {
        family: 'Lato',
      },
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          // primary: colors.blue.darken2,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3,
        },
        light: {
          primary: '#6C756B', // dark green
          primary2: '#F06C9B', // pink
          primary3: '#D2AF69', // gold
          primary4: '#18110C', // black
          darkBackground: '#EAE8E4', // gray
          lightBackground: '#F6F5F3', // light gray
          lightPrimary3: '#DCD6C9', // lightGold
          background: '#FFFFFF', // white
          text: colors.blueGrey.darken3,
          logo: '#D5A35A', // gold logo
          border: '#C4C4C4', // darker gray
          titleColor: '#474747', // black title
          footerTitle: '#494949', // black cool
          footerSub: '#868585', // light black
          // alternatives
          tmpprimary: '#6C756B', // dark green
          tmpprimary2: '#B279A7', // violet
          tmpprimary3: '#CCA43B', // gold
          tmpprimary4: '#FCEBFF', // light pink
          color1: '#D5A35A', // lighter gold
          color2: '#F2E6E1', // pink skin
          color3: '#A2706F', // brown
          color4: '#4A2040', // purple
          color5: '#331832', // darker purple
          color6: '#FFF8EE', // yellow skin
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
}
