// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  modules: ['@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt'],
  plugins: ['~/plugins/fontawesome.client.js'],
  css: ['~/assets/css/main.css'],
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
