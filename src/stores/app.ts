import { useLS } from "@/composables/service/useLS";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { uniqueObjects } from "@/utils/unique-modules";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  const modules = ref<Array<Module>>([]);
  const { set } = useLS();
  const router = useRouter();

  /**
   * Adds a module to the store. If the module is already in the store, it overwrites the existing one.
   * @param module The module to add
   */
  const addModule = async (module: Module[]) => {

    modules.value = module

    

  };

  /**
   * Removes a module from the store. If the module doesn't exist in the store, no action is taken.
   * @param moduleKey The key of the module to remove
   */
  const removeModule = async (moduleKey: string) => {
    if (moduleKey in modules.value[0]) {
      modules.value = modules.value.filter(module => module.id !== moduleKey);


      await set<Array<Module>>("dict", modules.value);
      await set<string[]>("module-keys", Object.keys(modules.value[0]));

      await router.replace({ name: "home" });
    }
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
  const updateModuleNameAndDescription = (
    moduleKey: string,
    { name, description }: { name?: string; description?: string }
  ) => {
    if (name) {
      modules.value.map(module => module.moduleName === moduleKey ? { ...module, moduleName: name.trim() } : module);
      set<LangAppAPIType>("dict", {
        module: !Object.keys(modules.value[0]).length ? [] : modules.value,
      });
    }

    if (description) {
      modules.value.map(module => module.moduleName === moduleKey ? { ...module, description: description.trim() } : module);
      set<LangAppAPIType>("dict", {
        module: !Object.keys(modules.value[0]).length ? [] : modules.value,
      });
    }
  };

  /**
   * Clears all modules in the store by setting the `modules` ref to an empty array.
   * This will also remove all modules from local storage.
   */
  const clearMOdules = () => {
    modules.value = [];
  };

  return {
    modules,
    addModule,
    updateModuleNameAndDescription,
    removeModule,
    clearMOdules,
  };
});
