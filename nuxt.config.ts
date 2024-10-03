// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  typescript: {
    shim: false,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxthub/core',
  ],
  nitro: {
    unenv: {
      external: ['node:crypto'],
    },
  },
  hub: {
    database: true,
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
        quotes: 'single',
      },
    },
  },
  icon: {
    serverBundle: 'remote',
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui',
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      sessionCookieName: '',
    },
    discordClientId: '',
    discordClientSecret: '',
    githubClientId: '',
    githubClientSecret: '',
    origin: '',
    hash: {
      scrypt: {
        cost: 16384,
        blockSize: 8,
        parallelization: 1,
        saltSize: 16,
        maxMemory: 32 * 1024 * 1024,
        keyLength: 64,
      },
    },
  },

  compatibilityDate: '2024-08-19',
})
