import { langAppApi } from "@/api/LangAppApi";
import { useAuthStore } from "@/stores/auth";
import type { LangAppAPITypeV2 } from "@/types/app-api.types";
import { storeToRefs } from "pinia";
import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
  NavigationGuardNext,
} from "vue-router";

export async function routeGuard(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext
) {
  const { userId } = storeToRefs(useAuthStore());

  if (userId.value && to.name === "signIn") {
    next({ name: "home" });
  }

  if (to.meta.requiresAuth && !userId.value) {
    next({ name: "signIn" });
  }

  

  if (to.meta.requiresDict && (to.path === "/dictionaries" || to.path === "/pass-test")) {
    const modules = (await langAppApi.get<LangAppAPITypeV2>({
      source: "localstorage",
    })) as LangAppAPITypeV2;
    if (modules[userId.value].some((module) => module.dic.length)) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    // console.log('hit');
    next();
  }

  document.title = to.meta.title as string;
}
