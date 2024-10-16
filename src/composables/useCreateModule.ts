import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType } from "@/types/app-api.types";
import { ref } from "vue";
import { useLS } from "./service/useLS";
import { delay } from "@/utils/delay";
import { useRouter } from "vue-router";

export const useCreateModule = () => {
  const { getSync ,remove, exist } = useLS();

  const router = useRouter()  

  const source = ref<"localstorage" | "firebase">(
    (getSync<"localstorage" | "firebase">("storage") as
      | "localstorage"
      | "firebase") ?? "localstorage"
  );
  const statuses = ref<{ isCreating: boolean; error: string }>({
    isCreating: false,
    error: "",
  });

  const name = ref<string>("");
  const description = ref<string>("");

  const clearValues = () => {
    name.value = "";
    description.value = "";
  };


  const createModule = async (callback: () => void, error: (msg: string) => void) => {
    try {
      statuses.value.isCreating = true;
      await delay(500);
      const currentData = await langAppApi.get<LangAppAPIType>({ source });
      const newModule = {
        [name.value]: {
          dic: [],
          description: description.value,
          created_at: Date.now(),
          id: crypto.randomUUID(),
        },
      };

      const updatedData = {
        module: [...(currentData?.module || []), newModule],
      };

      await langAppApi.create<LangAppAPIType>({
        source,
        data: updatedData,
      });

      callback();
      clearValues();

      await router.push({ name: "home" });


      
    } catch (e) {
      console.log(e);
      statuses.value.error = "Произошла ошибка при создании модуля!";
      error(statuses.value.error)
    }
    finally {
      statuses.value.isCreating = false;
    }
  };

  return { name, description, clearValues, statuses, createModule };
};
