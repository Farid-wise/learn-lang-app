import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

function routeGuard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) {
  const { appModules } = storeToRefs(useAppStore());

  if (
    to.meta.requiresAuth &&
    to.meta.requiresDict &&
    to.path === "/dictionaries"
  ) {
    if (!appModules.value.modules.some((module) => module.dic.length)) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    next();
  }

  document.title = to.meta.title as string;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/home",
      meta: {
        title: "Главная",
      },
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/dictionaries",
      name: "dictionaries",
      meta: {
        title: "Словари",
        requiresAuth: true,
        requiresDict: true,
      },
      component: () => import("../pages/Dictionary.vue"),
    },
    {
      path: "/pass-test",
      meta: {
        title: "Тестирование",
      },
      name: "pass-test",
      component: () => import("../pages/PassTest.vue"),
    },
    {
      path: "/create-module",
      meta: {
        title: "Создать модуль",
      },
      name: "create-module",
      component: () => import("../pages/CreateModule.vue"),
    },

    {
      path: "/module/:slug",
      meta: {
        title: "Модуль",
      },
      name: "module",
      component: () => import("../pages/Module.vue"),
    },
    {
      path: "/settings",
      meta: {
        title: "Настройки",
      },
      name: "settings",
      component: () => import("../pages/Settings.vue"),
    },

    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/home",
    },
  ],
});

router.beforeEach(routeGuard);

export default router;
