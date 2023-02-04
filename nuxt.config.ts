export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  build: {
    transpile: [
      '@nuxtjs/google-fonts',

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

  css: [
    '~/assets/index.css',

    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue-toastification/dist/index.css',
  ],

  googleFonts: {
    download: true,
    overwriting: false,
    inject: true,

    families: {
      Ubuntu: {
        wght: [400, 500, 700],
      },
    },
  },
})
