import { useLS } from "@/composables/service/useLS";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const modules = ref<Array<Module>>([]);
  const {set} = useLS()

  const addModule = async (module: Module[]) => {
    modules.value = module;
  };

  const removeModule = (moduleKey: string) => {
    delete modules.value[0][moduleKey]
    set<LangAppAPIType>("dict", {
        module: modules.value
    })
  };

  const clearMOdules = () => {
    modules.value = [];
  };

  return { modules, addModule, removeModule, clearMOdules };
});
