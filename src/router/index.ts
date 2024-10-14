import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      meta: {
        title: 'Home'
      },
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      meta: {
        title: 'Dictionary'
      },
      component: () => import('../pages/Dictionary.vue')
    },
    {
      path: '/pass-test',
      meta: {
        title: 'Pass Test'
      },
      name: 'pass-test',
      component: () => import('../pages/PassTest.vue')
    },
    {

      path: '/create-module',
      meta: {
        title: 'Create Module'
      },
      name: 'create-module',
      component: () => import('../pages/CreateModule.vue'),
    
    },

    {
      path: '/module/:slug',
      meta: {
        title: 'Module'
      },
      name: 'module',
      component: () => import('../pages/Module.vue')
    }


    
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
