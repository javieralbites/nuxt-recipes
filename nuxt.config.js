import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - frontend',
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth:{
    strategies: {
      local: {
        token: {
          property: 'jwt',
          global: true,
          // required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/local', method: 'post' },
          logout: false,
          user: { url: 'users/me', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/user'
    }
  },
  axios:{
    // baseURL: 'http://localhost:1337/'
    baseURL: 'https://javier-recetas.herokuapp.com/'
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://javier-recetas.herokuapp.com/graphql',
      }
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#6aa94a',
          accent: '#2f5236',
          secondary: '#30402e',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // router:{
  //   middleware: "initData"
  // }
}
