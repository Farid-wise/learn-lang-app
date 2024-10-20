import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { onMounted, ref } from "vue";
import { useLS } from "./service/useLS";
import { delay } from "@/utils/delay";
import { useRouter } from "vue-router";
import { moduleExists } from "@/utils/module-exists";

/**
 * Provides reactive variables and functions for creating a module
 *
 * @returns An object with the following properties:
 * - `name`: A reactive string variable to store the name of the module
 * - `description`: A reactive string variable to store the description of the module
 * - `statuses`: An object with `isCreating` and `error` properties. `isCreating` is a boolean indicating whether the module is being created, and `error` is a string containing the error message if an error occurred
 * - `clearValues`: A function to clear the values of `name` and `description`
 * - `createModule`: A function to create the module. It takes two arguments: `callback` and `error`. `callback` is a function to be called when the module is created successfully, and `error` is a function to be called if an error occurred while creating the module
 */
export const useCreateModule = () => {
  const { remove, get, getSync, exist, set } = useLS();

  const router = useRouter();
  const source = ref<"localstorage" | "firebase">("localstorage");

  const statuses = ref<{ isCreating: boolean; error: string }>({
    isCreating: false,
    error: "",
  });

  const name = ref<string>("");
  const description = ref<string>("");

  onMounted(() => {
    source.value =
      getSync<"localstorage" | "firebase">("storage") ?? "localstorage";
  });

  const clearValues = () => {
    name.value = "";
    description.value = "";
  };

  const createModule = async (
    callback: () => void,
    error: (msg: string) => void
  ) => {
    try {
      statuses.value.isCreating = true;
      await delay(500);
      const currentData = await langAppApi.get<LangAppAPIType>({
        source: source.value,
      });

      if (currentData) {
        if (moduleExists(name.value, currentData.modules)) {
          statuses.value.error = "Модуль с таким именем уже существует!";
          error(statuses.value.error);
          return;
        }
      }

      const newModules: Module[] = [
        ...(currentData?.modules! ?? []),
        {
          id: crypto.randomUUID(),
          dic: [],
          moduleName: name.value,
          description: description.value,
          created_at: Date.now(),
        },
      ];

      await langAppApi.create<LangAppAPIType>({
        source: source.value,
        data: {
          modules: newModules,
        },
      });

      callback();

      await router.push({ name: "home" });
      clearValues();
    } catch (e) {
      console.log(e);

      statuses.value.error = "Произошла ошибка при создании модуля!";
      error(statuses.value.error);
    } finally {
      statuses.value.isCreating = false;
    }
  };

  return { name, description, clearValues, statuses, createModule };
};
