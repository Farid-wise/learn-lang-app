import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType } from "@/types/app-api.types";
import { onMounted, ref } from "vue";
import { useLS } from "./service/useLS";
import { delay } from "@/utils/delay";
import { useRouter } from "vue-router";

export const useCreateModule = () => {
  const { remove, get, getSync, exist, set } = useLS();

  const router = useRouter();
  const source = ref<"localstorage" | "firebase">("localstorage")

  const statuses = ref<{ isCreating: boolean; error: string }>({
    isCreating: false,
    error: "",
  });

  const name = ref<string>("");
  const description = ref<string>("");


  onMounted(() => {
    source.value = getSync<"localstorage" | "firebase">("storage") ?? "localstorage";
  })

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
        if (
          Object.keys(currentData?.module[0]!)?.includes(
            name.value.trim().toLowerCase()
          )
        ) {
          statuses.value.error = "Модуль с таким именем уже существует!";
          error(statuses.value.error);
          return;
        }
      }

      const newModules = [
        {
          ...currentData?.module[0],
          [name.value.trim().toLowerCase()]: {
            dic: [],
            description: description.value,
            created_at: Date.now(),
            id: crypto.randomUUID(),
          },
        },
      ];

      await langAppApi.create<LangAppAPIType>({
        source: source.value,
        data: {
          module: newModules,
        },
      });
      await set<string>(
        "module-keys",
        JSON.stringify(Object.keys(newModules[0]))
      );

      callback();
      clearValues();

      await router.push({ name: "home" });
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
