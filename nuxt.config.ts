export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    '~/assets/index.css',

    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-toastification/dist/index.css',
  ],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',

      'vue-toastification',
    ],
  },
  app: {
    head: {
      title: 'Todotion',
      meta: [{ name: 'description', content: 'Todotion, the to-do app' }],
    },
  },
})
