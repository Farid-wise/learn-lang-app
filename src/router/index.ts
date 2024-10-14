import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: () => import('../pages/Dictionary.vue')
    },
    {
      path: '/pass-test',
      name: 'pass-test',
      component: () => import('../pages/PassTest.vue')
    },
    {
      path: '/create-module',
      name: 'create-module',
      component: () => import('../pages/CreateModule.vue')
    },


    
  ]
})

export default router
