import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      meta: {
        title: 'Главная'
      },
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      meta: {
        title: 'Словарь'
      },
      component: () => import('../pages/Dictionary.vue')
    },
    {
      path: '/pass-test',
      meta: {
        title: 'Тестирование'
      },
      name: 'pass-test',
      component: () => import('../pages/PassTest.vue')
    },
    {

      path: '/create-module',
      meta: {
        title: 'Создать модуль'
      },
      name: 'create-module',
      component: () => import('../pages/CreateModule.vue'),
    
    },

    {
      path: '/module/:slug',
      meta: {
        title: 'Модуль'
      },
      name: 'module',
      component: () => import('../pages/Module.vue')
    },
    {
      path: '/settings',
      meta: {
        title: 'Настройки'
      },
      name: 'settings',
      component: () => import('../pages/Settings.vue')
    }


    
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
