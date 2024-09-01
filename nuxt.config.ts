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
  ],
  eslint: {
    config: {
      stylistic: true,
    },
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    wordpressAccessToken: process.env.NUXT_WP_REST_API_ACCESS_TOKEN,
    resendAPIToken: process.env.NUXT_MAIL_RESEND_API_KEY,
    mailSender: process.env.NUXT_MAIL_SENDER,
    mailTarget: process.env.NUXT_MAIL_TARGET,
    // Keys within public, will be also exposed to the client-side
    public: {
      wpRestApiBaseUrl: process.env.NUXT_WP_REST_API_BASE_URL,
    },
  },
})
