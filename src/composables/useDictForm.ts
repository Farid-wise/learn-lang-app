import { useAppStore } from "@/stores/app";
import type {
  Dictionary,
  LangAppAPITypeV2,
  Module,
} from "@/types/app-api.types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useLS } from "./service/useLS";
import { useToast } from "primevue/usetoast";
import { useStatuses } from "./service/useStatuses";
import { delay } from "@/utils/delay";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

/**
 * Provides reactive variables and functions for managing a dictionary form.
 *
 * @returns An object with the following properties:
 * - `dictInputs`: A reactive array of dictionary inputs.
 * - `addInputs`: A function to add a new dictionary input.
 * - `route`: The current route object.
 * - `foundDict`: The found dictionary from the current route slug.
 * - `deleteInputs`: A function to delete a dictionary input by its id.
 * - `saveDict`: A function to save the dictionary inputs to the current route slug.
 */

export const useDictForm = () => {
  const { getSync } = useLS();
  const route = useRoute();
  const app = useAppStore();
  const { userId } = storeToRefs(useAuthStore());

  const toast = useToast();
  const { setLoading, setSuccess, setError, resetStatus, statuses } =
    useStatuses();

  const foundDict =
    getSync("storage") === "localstorage"
      ? app.appModules[userId.value].find(
          (module) => module.moduleName === route.params.slug
        )?.dic
      : app.appModules[userId.value].find(
          (module) => module.moduleName === route.params.slug
        )?.dic;

  const key = ref<string>(
    foundDict?.find((dict) => dict.moduleName === route.params.slug)?.key || ""
  );
  const translate = ref<string>(
    foundDict?.find((dict) => dict.moduleName === route.params.slug)
      ?.translate || ""
  );

  const dictInputs = ref<Array<Dictionary>>(
    foundDict && foundDict.length
      ? foundDict
      : [
          {
            key: "",
            translate: "",
            id: crypto.randomUUID(),
            moduleName: route.params.slug as string,
          },
        ]
  );

  const addInputs = () => {
    dictInputs.value.push({
      key: "",
      translate: "",
      id: crypto.randomUUID(),
      moduleName: route.params.slug as string,
    });
  };

  const saveDict = async (moduleName: string) => {
    setLoading();
    try {
      await delay(500);

      await app.fillDictionary(dictInputs.value, userId, moduleName);
      setSuccess();

      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Словарь успешно обновлен!",
        life: 3000,
        closable: false,
      });
    } catch (error: any) {
      setError(error.message);
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Не удалось обновить словарь!",
        life: 3000,
      });
    } finally {
      await delay(500);
      resetStatus();
    }
  };

  const deleteInputs = async (id: string) => {
    const itemToDelete = dictInputs.value.find((input) => input.id === id);
    if (itemToDelete) {
      itemToDelete.isDeleting = true;
      await delay(1000);

      dictInputs.value = dictInputs.value.filter((input) => input.id !== id);
      itemToDelete.isDeleting = false;

      const emptyFields = dictInputs.value.some((input) => {
        if (input.key === "" || input.translate === "") {
          return true;
        }
      });

      if (emptyFields) {
        return;
      } else {
        saveDict(route.params.slug as string);
      }
    }
  };

  return {
    dictInputs,
    addInputs,
    statuses,
    route,
    foundDict,
    deleteInputs,
    saveDict,
    key,
    translate,
  };
};
