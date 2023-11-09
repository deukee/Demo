// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    'tdesign-vue-next/es/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  piniaPersistedstate: {
    storage: 'sessionStorage'
  },
  typescript: {
    typeCheck: true
  }
})
