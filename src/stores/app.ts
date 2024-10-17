import { useLS } from "@/composables/service/useLS";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import router from '../router/index';
import { useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  const modules = ref<Array<Module>>([]);
  const {set} = useLS()
  const router  = useRouter()

  /**
   * Adds a module to the store. If the module is already in the store, it overwrites the existing one.
   * @param module The module to add
   */
  const addModule = async (module: Module[]) => {
    modules.value = module;
  };

  const removeModule = async (moduleKey: string) => {
    delete modules.value[0][moduleKey]
    set<LangAppAPIType>("dict", {
      module: !Object.keys(modules.value[0]).length ? [] : modules.value
    })

    set<string[]>('module-keys', Object.keys(modules.value[0]))

    await router.replace({ name: 'home' })
  };

  const clearMOdules = () => {
    modules.value = [];
  };

  return { modules, addModule, removeModule, clearMOdules };
});
