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
        apiSecret: '123',
        // Keys within public are also exposed client-side
        public: {
            apiBase: '/api'
        }
    }
})

