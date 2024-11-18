import { useLS } from "@/composables/service/useLS";
import type { Dictionary, LangAppAPIType, LangAppAPITypeV2, Module } from "@/types/app-api.types";
import { delay } from "@/utils/delay";
import { defineStore } from "pinia";
import { ref, toValue, type Ref } from "vue";
import { useRouter } from "vue-router";


type UpdateModuleTypes = { name?: string; description?: string }

export const useAppStore = defineStore("app", () => {
  const appModules = ref<LangAppAPITypeV2>({});
  const { set } = useLS();
  const router = useRouter();

  /**
   * Adds a module to the store. If the module is already in the store, it overwrites the existing one.
   * @param module The module to add
   */
  const addModule = async (userId: string | Ref<string>, module: Module[]) => {

 
    appModules.value[toValue(userId)] = module;
    
  };


  const removeModule = async (userId: string | Ref<string>, moduleKey: string) => {
    appModules.value[toValue(userId)] = appModules.value[toValue(userId)].filter(
      (module) => module.moduleName !== moduleKey
    );

    await set<LangAppAPITypeV2>("dict", appModules.value);
    await delay(500);
    await router.replace({ name: "home" });
  };


  const updateModuleNameAndDescription = async (userId: string | Ref<string>, moduleKey: string, { name, description }: UpdateModuleTypes ) => {
   
    if (name) {
      appModules.value[toValue(userId)] = appModules.value[toValue(userId)].map((module) =>
        module.moduleName == moduleKey
          ? { ...module, moduleName: name.trim() }
          : module
      );
      await set<LangAppAPITypeV2>("dict", appModules.value);
      await router.replace({ name: "module", params: { slug: name.trim() } });
    }

    appModules.value[toValue(userId)]= appModules.value[toValue(userId)].map((module) =>
      module.moduleName === moduleKey
        ? { ...module, description: description!.trim() }
        : module
    );
    await set<LangAppAPITypeV2>("dict", appModules.value);
  };

  /**
   * Clears all modules in the store by setting the `modules` ref to an empty array.
   * This will also remove all modules from local storage.
   */
  const clearModules = (userId: Ref<string>, callback: () => void) => {
    appModules.value[userId.value] = [];
    callback();
  };

  const fillDictionary = async (dict: Array<Dictionary>, userId: string | Ref<string>, moduleName: string) => {
    appModules.value = {
      ...appModules.value,
      [toValue(userId)]: appModules.value[toValue(userId)].map((module) =>
        module.moduleName === moduleName
          ? { ...module, dic: dict }
          : module
      ),
    }

    await set<LangAppAPITypeV2>("dict", appModules.value);
  }

  return {
    appModules,
    addModule,
    updateModuleNameAndDescription,
    removeModule,
    fillDictionary,
    clearModules,
  };
});
