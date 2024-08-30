// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  routeRules: {
    '/': {
      prerender: true,
    },
    '/home': {
      redirect: '/',
    },
    '/**/**': {
      swr: 3600,
    },
  },
  css: [
    'scss-reset/_reset.scss',
    'normalize.css/normalize.css',
    '~/assets/css/main.css',
    '~/assets/scss/main.scss',
  ],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@pinia/nuxt',
    ['nuxt-mail', {
      message: {
        to: process.env.NUXT_MAIL_TARGET,
      },
      smtp: {
        host: process.env.NUXT_MAIL_SMPT,
        port: process.env.NUXT_MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.NUXT_MAIL_USERNAME,
          pass: process.env.NUXT_MAIL_PASSWORD,
        },
      },
    }]],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    wordpressAccessToken: process.env.NUXT_WP_REST_API_ACCESS_TOKEN,
    // Keys within public, will be also exposed to the client-side
    public: {
      wpRestApiBaseUrl: process.env.NUXT_WP_REST_API_BASE_URL,
    },
  },
})
