// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@clerk/nuxt',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  devServer: {
    port: 3019,
  },
  css: [
    '~/assets/css/main.css',
  ],
  components: [
    '~/components',
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components/editor',
      pathPrefix: false,
    },
  ],
  clerk: {
    skipServerMiddleware: true,
  },
})
