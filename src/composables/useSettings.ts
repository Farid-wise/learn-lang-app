import { ref } from "vue";
import { useLS } from "./service/useLS";
import { useConfirm } from "primevue/useconfirm";
import { delay } from "@/utils/delay";
import { useTheme } from "./service/useTheme";
import { useAppStore } from "@/stores/app";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

/**
 * Provides reactive variables and functions for managing the settings of the application
 *
 * @returns An object with the following properties:
 * - `source`: A reactive variable with the value of the storage source, either "localstorage" or "firebase"
 * - `clearStorage`: A function to clear the storage
 * - `saveOptions`: A function to save the settings
 * - `isSaving`: A reactive variable indicating whether the settings are being saved
 * - `storageOption`: A reactive variable with the value of the storage option, either "Локальное хранилище" or "Внешнее Firebase"
 * - `themeOption`: A reactive variable with the value of the theme option, either "Светлая" or "Темная"
 * - `themes`: A reactive variable with an array of theme options
 * - `storage`: A reactive variable with an array of storage options
 * - `theme`: A reactive variable with the value of the theme, either "aura-light-blue" or "aura-dark-blue"
 */
export const useSettings = () => {
  const { set, getSync, exist, remove } = useLS();
  const confirm = useConfirm();
  const app = useAppStore();
  const {userId} = storeToRefs(useAuthStore())

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
        : "Внешнее облако",
  });

  const themes = ref([{ name: "Светлая" }, { name: "Темная" }]);
  const storage = ref([
    { name: "Локальное хранилище" },
    { name: "Внешнее облако" },
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

      //console.log(storageOption.value);

      if (storageOption.value.name === "Локальное хранилище") {
        set("storage", "localstorage");
      
      } else {
        set("storage", "firebase");
        app.appModules = {};
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
           
            app.clearModules(userId, async () => {
              remove("dict");
              remove('isPresetsInited')
              remove('isBasePresetsModalVisible')
              remove('user-results')
              await router.push({ name: "home" });
              document.location.reload()
    
            });
           

          },
          
        });

       
      }
    }
  };


  const resetPresets = () => {
    app.clearModules(userId, async () => {
      remove("dict");
      remove('isPresetsInited')
      remove('isBasePresetsModalVisible')
      await router.push({ name: "home" });
      document.location.reload()
    });
  }

  return {
    source,
    clearStorage,
    saveOptions,
    resetPresets,
    isSaving,
    storageOption,
    themeOption,
    themes,
    storage,
    theme,
  };
};
