// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    '~/assets/css/index.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
  // nitro: {
  //   plugins: ['~/server/db/index.ts'],
  // },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
    ],
  },
})
