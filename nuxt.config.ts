import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ["@prisma/nuxt"],
  
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ],
       meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ["v-gsap-nuxt",
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
 

});