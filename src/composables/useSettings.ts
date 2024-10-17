import type { remove } from "firebase/database";
import { computed, onMounted, ref } from "vue";
import { useLS } from "./service/useLS";
import { useConfirm } from "primevue/useconfirm";
import { delay } from "@/utils/delay";
import { useTheme } from "./service/useTheme";
import { useAppStore } from "@/stores/app";

export const useSettings = () => {
  const { set, getSync, exist, remove } = useLS();
  const confirm = useConfirm();
  const app = useAppStore();

  const source = ref<"localstorage" | "firebase">(
    getSync<"localstorage" | "firebase">("storage") ?? "localstorage"
  );

  const { theme } = useTheme();
  const isSaving = ref<boolean>(false);

  const themeOption = ref<{ name: string }>({
    name: theme.value === "aura-light-blue" ? "Светлая" : "Темная",
  });

  const storageOption = ref<{ name: string }>({
    name:
      source.value === "localstorage"
        ? "Локальное хранилище"
        : "Внешнее Firebase",
  });

  const themes = ref([{ name: "Светлая" }, { name: "Темная" }]);
  const storage = ref([
    { name: "Локальное хранилище" },
    { name: "Внешнее Firebase" },
  ]);

  const saveOptions = async (callback: () => void, error: () => void) => {
    isSaving.value = true;
    await delay(500);
    try {
      if (themeOption.value?.name === "Светлая") {
        theme.value = "aura-light-blue";
      } else {
        theme.value = "aura-dark-blue";
      }

      console.log(storageOption.value);

      if (storageOption.value.name === "Локальное хранилище") {
        set("storage", "localstorage");
      } else {
        set("storage", "firebase");
      }
      callback();
    } catch (e) {
      console.log(e);
      error();
    } finally {
      isSaving.value = false;
    }
  };

  const clearStorage = () => {
    console.log(source.value);
    if (source.value === "localstorage") {
      if (exist("dict")) {
        confirm.require({
          message: "Вы уверены, что хотите очистить хранилище?",
          header: "Подтвердите действие",
          icon: "pi pi-info-circle",
          rejectLabel: "Отмена",
          rejectClass: "p-button-secondary p-button-outlined",
          acceptClass: "p-button-danger",
          acceptLabel: "Удалить",
          acceptIcon: "pi pi-check",
          blockScroll: true,
          accept: () => {
            remove("dict");
            remove("module-keys");
            app.clearMOdules();

            window.location.reload();
          },
        });
      }
    }
  };

  return {
    source,
    clearStorage,
    saveOptions,
    isSaving,
    storageOption,
    themeOption,
    themes,
    storage,
    theme,
  };
};
