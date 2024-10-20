import { useLS } from "@/composables/service/useLS";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { delay } from "@/utils/delay";
import { uniqueObjects } from "@/utils/unique-modules";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  const appModules = ref<LangAppAPIType>({
    modules: [],
  });
  const { set } = useLS();
  const router = useRouter();

  /**
   * Adds a module to the store. If the module is already in the store, it overwrites the existing one.
   * @param module The module to add
   */
  const addModule = async (module: Module[]) => {

    appModules.value.modules = module

    

  };


  /**
   * Removes a module from the store and local storage, and redirects the user back to the home page.
   * @param moduleKey The key of the module to remove
   */
  const removeModule = async (moduleKey: string) => {

    appModules.value.modules = appModules.value.modules.filter(module => module.moduleName !== moduleKey);


    await set<LangAppAPIType>("dict", appModules.value);
    await delay(500)
    await router.replace({ name: "home" });
    
  };

  /**
   * Updates the name and description of a module in the store.
   * If the provided name is non-empty, it updates the module's key with the new name.
   * If the provided description is non-empty, it updates the module's description.
   * The updated module data is then persisted to local storage.
   *
   * @param moduleKey - The key of the module to update.
   * @param param1 - An object containing the new name and/or description of the module.
   * @param param1.name - The new name to set for the module (optional).
   * @param param1.description - The new description to set for the module (optional).
   */
  const updateModuleNameAndDescription = async (
    moduleKey: string,
    { name, description }: { name?: string; description?: string }
  ) => {
    if (name) {
      appModules.value.modules = appModules.value.modules.map(module => module.moduleName === moduleKey ? { ...module, moduleName: name.trim() } : module);
      await set<LangAppAPIType>("dict", appModules.value);
      await router.replace({name: 'module', params: { slug: name.trim() }});
    }

    if (description) {
      appModules.value.modules = appModules.value.modules.map(module => module.moduleName === moduleKey ? { ...module, description: description.trim() } : module);
      await set<LangAppAPIType>("dict", appModules.value);
    }
  };

  /**
   * Clears all modules in the store by setting the `modules` ref to an empty array.
   * This will also remove all modules from local storage.
   */
  const clearModules = () => {
    appModules.value.modules = [];
  };

  return {
    appModules,
    addModule,
    updateModuleNameAndDescription,
    removeModule,
    clearModules,
  };
});
