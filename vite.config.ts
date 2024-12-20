
//@ts-ignore

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import {VitePWA} from 'vite-plugin-pwa'





const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  outDir: 'dist',
  manifest: {
    name: 'LangApp',
    start_url: '/',
    screenshots: [
      
    ],
    short_name: 'LangApp',
    description: 'App for learning languages',
    theme_color: '#ffffff',
    icons: [
      {src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png'},
      {src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png'},
    ]
  }
})
export default defineConfig({
  plugins: [
    vue({
      features: {
        propsDestructure: true,
      }
    }),
    vueJsx(),
    vueDevTools(),
    Components({resolvers: [PrimeVueResolver()]}),
    vitePWA
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
