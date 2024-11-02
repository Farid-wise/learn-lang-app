import {langAppApi} from "@/api/LangAppApi";
import {useAppStore} from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import type {LangAppAPIType} from "@/types/app-api.types";
import {storeToRefs} from "pinia";
import {
    createRouter,
    createWebHistory,
    type NavigationGuardNext,
    type RouteLocationNormalizedGeneric,
    type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

async function routeGuard(
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext
) {
    const {userId} = storeToRefs(useAuthStore());

    if (userId.value && to.name === "signIn") {
        next({name: "home"});
    }
    
    if(to.meta.requiresAuth && !userId.value){
        next({name: "signIn"});
    }
   
    

  

    if (to.meta.requiresDict && to.path === "/dictionaries") {
        const modules = await langAppApi.get<LangAppAPIType>({source: "localstorage"});
        if (modules?.modules.some((module) => module.dic.length)) {
            next();
        } else {
            next({name: "home"});
        }
       
    }
    else {
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
                requiresAuth: true,
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
                requiresAuth: true,
            },
            name: "pass-test",
            component: () => import("../pages/PassTest.vue"),
        },
        {
            path: "/create-module",
            meta: {
                title: "Создать модуль",
                requiresAuth: true,
            },
            name: "create-module",
            component: () => import("../pages/CreateModule.vue"),
        },

        {
            path: "/module/:slug",
            meta: {
                title: "Модуль",
                requiresAuth: true,
            },
            name: "module",
            component: () => import("../pages/Module.vue"),
        },
        {
            path: "/settings",
            meta: {
                title: "Настройки",
                requiresAuth: true,
            },
            name: "settings",
            component: () => import("../pages/Settings.vue"),
        },
        {
            path: "/profile/:id",
            meta: {
                title: "Профиль",
                requiresAuth: true,
            },
            name: "profile",
            component: () => import("../pages/Profile.vue"),
        },

        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            redirect: "/home",
        },

        {
            path: "/signin",
            meta: {
                title: "Вход",
            },
            name: "signIn",
            component: () => import("../pages/SignIn.vue"),
        },
    ],
});

router.beforeEach(routeGuard);

export default router;
