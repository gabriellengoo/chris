export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CHISARA AGOR',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon7.ico' }
    ],
    script: [
      {
        hid: 'mcjs',
        id: 'mcjs',
        src: 'https://chimpstatic.com/mcjs-connected/js/users/46ff04e97eb3776315d43168e/2f02a337cb8211acd3c48ca51.js',
        async: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/grid.css',
    '@/assets/css/images.css',
    '@/assets/css/transitions.css',
    '@/assets/css/typography.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@plugins/masonry', mode: 'client' },
    { src: '@plugins/lazy', mode: 'client' },
    { src: '@plugins/slider', mode: 'client' },
    '~/plugins/preview.client.js',
  ],
  gsap: {},

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-gsap-module',
    '@nuxtjs/sanity/module',
    '@nuxt/image'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  sanity: {
    projectId: 'rxcle18h',
    apiVersion: '2023-09-05',
    useCdn: false, 
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules\/@studio-freight\/lenis/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }); 
    },
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  image: {
    sanity: {
      projectId: 'rxcle18h',
      dataset: 'production',
      useCdn: false, 
    },
  },
}