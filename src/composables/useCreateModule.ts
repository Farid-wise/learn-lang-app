import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, LangAppAPITypeV2, Module } from "@/types/app-api.types";
import { onMounted, ref } from "vue";
import { useLS } from "./service/useLS";
import { delay } from "@/utils/delay";
import { useRouter } from "vue-router";
import { moduleExists } from "@/utils/module-exists";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

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
  const {getSync, set, exist} = useLS();

  const router = useRouter();
  const {userId} = storeToRefs(useAuthStore())
  const source = ref<"localstorage" | "firebase">("localstorage");

  const createStatuses = ref<{ isCreating: boolean; error: string }>({
    isCreating: false,
    error: "",
  });

  const name = ref<string>("");
  const description = ref<string>("");

  onMounted(async () => {
    source.value = getSync<"localstorage" | "firebase">("storage") ?? "localstorage";

    if(await langAppApi.get<LangAppAPITypeV2>({ url: 'https://52644fae60d09042.mokky.dev/learn-lang-modules', source: source.value}) === null){
      await langAppApi.create<LangAppAPITypeV2>({
        source: source.value,
        url: 'https://52644fae60d09042.mokky.dev/learn-lang-modules', 
        data: { [userId.value]: [] }
      });
    }
   
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
      createStatuses.value.isCreating = true;
      await delay(500);
      const currentData = await langAppApi.get<LangAppAPITypeV2>({
        url: 'https://52644fae60d09042.mokky.dev/learn-lang-modules',
        source: source.value,
      });

    

      if (currentData) {
        if (moduleExists(name.value, currentData[userId.value])) {
          createStatuses.value.error = "Модуль с таким именем уже существует!";
          error(createStatuses.value.error);
          return;
        }


        const newModules: Module[] = [
          ...(currentData[userId.value] ?? []),
          {
            id: crypto.randomUUID(),
            dic: [],
            moduleName: name.value,
            description: description.value,
            created_at: Date.now(),
          },
        ];
  


        const prevData = !Object.keys(currentData).includes('') ? currentData : '';
        console.log(prevData)
        await langAppApi.create<LangAppAPITypeV2>({
          url: 'https://52644fae60d09042.mokky.dev/learn-lang-modules',
          source: source.value,
          data: {
            ...prevData,
            [userId.value]: newModules,
          }
        });
  
        callback();
        await delay(1000);
        await router.push({ name: "home" });
        clearValues();
  
      }

     
      
    } 
    catch (e) {
      console.log(e);

      createStatuses.value.error = "Произошла ошибка при создании модуля!";
      error(createStatuses.value.error);
    } finally {
      createStatuses.value.isCreating = false;
    }
  };

  return { name, description, clearValues, createStatuses, createModule };
};
