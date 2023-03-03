export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    modules: [
        "@nuxtjs/tailwindcss"
    ], 
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        // The private keys which are only available server-side
        openaiApiKey: process.env.OPENAI_API_KEY,
        // Keys within public are also exposed client-side
        public: {
            apiBase: '/api'
        }
    }
})

