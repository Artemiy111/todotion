export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxt/devtools'],

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
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

      meta: [
        {
          name: 'description',
          content: 'Todotion, приложение для заметок',
        },
        { name: 'author', content: 'Naboishikov Artemiy' },

        { property: 'og:site:name', content: 'Todotion' },
        { property: 'og:title', content: 'Todotion' },
        { property: 'og:description', content: 'Todotion, приложение для заметок' },
        { property: 'og:image', content: '/og.jpg' },
        { property: 'og:type', content: 'website' },
      ],

      htmlAttrs: {
        lang: 'ru-RU',
        prefix: 'og: https://ogp.me/ns#',
      },
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
