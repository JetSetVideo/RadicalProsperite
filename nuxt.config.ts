// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-02-18',
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  modules: ['@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  
  // Font configuration
  fonts: {
    families: [
      { name: 'Orbitron', provider: 'google', weights: [400, 500, 600, 700, 800, 900] },
      { name: 'Montserrat', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
  },
  
  // App metadata
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Radical Prospérité',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#003399' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  ui: {
    colorMode: {
      preference: 'dark'
    }
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    databaseSsl: process.env.DATABASE_SSL || 'false',
    sessionSecret: process.env.SESSION_SECRET || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',
    public: {
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  }
});
