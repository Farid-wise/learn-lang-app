import type { RouterOptions } from "vue-router";

export const routes = [
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
        component: () => import("../pages/Dictionaries.vue"),
    },

    {
        path: "/pass-test",
        meta: {
            title: "Тестирование",
            requiresAuth: true,
            requiresDict: true,
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

    {
        path: "/dictionary/:slug",
        name: "dictionary",
        meta: {
            title: "Словарь",
            requiresAuth: true,
            requiresDict: true,
        },
        component: () => import("../pages/Dictionary.vue"),
    },
] as RouterOptions['routes']