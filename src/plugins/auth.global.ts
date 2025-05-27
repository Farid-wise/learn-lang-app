import { useAuth } from "@/composables/app/useAuth";
import type { Plugin } from "vue";

export const checkAppAuth = (): Plugin => {
    return {
        install(app, ...options) {
            const {checkIsAuth} = useAuth();


            checkIsAuth();
        },
    }
}