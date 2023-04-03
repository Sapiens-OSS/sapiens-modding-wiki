import path from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],
    content: {
        sources: {
            content: {
                driver: 'fs',
                base: path.join(__dirname, "docs"),
            },
        },
        highlight: {
            preload: [
                'lua',
            ]
        },
        documentDriven: true,
    },
    nitro: { prerender: { routes: ['/sitemap.xml'] } }
})