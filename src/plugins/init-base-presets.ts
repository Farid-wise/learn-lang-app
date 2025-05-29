import { useLS } from "@/composables/service/useLS";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import type { Dictionary } from "@/types/app-api.types";
import { storeToRefs } from "pinia";
import { ref, watch, type Plugin, type Ref } from "vue";

export interface PresetsCofig {
  isBasePresetsModalVisible: Ref<boolean>;
  handlePresetVisiblity: () => void;
  isPresetsInited: Ref<boolean>;
  handlePresetInited: (value: boolean) => void;
}

export const initBasePresets = (): Plugin => {
  const { getSync, set, remove } = useLS();
  const { userId } = storeToRefs(useAuthStore());
  const appModules = useAppStore();

  const isBasePresetsModalVisible = ref<boolean>(
    getSync("isBasePresetsModalVisible") ?? true
  );
  const isPresetsInited = ref<boolean>(getSync("isPresetsInited") || false);

  const handlePresetVisiblity = () => {
    isBasePresetsModalVisible.value = false;
    isPresetsInited.value = false;
    set("isBasePresetsModalVisible", false);
    set("isPresetsInited", false);
  };

  const handlePresetInited = (value: boolean) => {
    if (value) {
      isPresetsInited.value = value;
      isBasePresetsModalVisible.value = false;
      set("isPresetsInited", value);
      set("isBasePresetsModalVisible", false);
    }

    if (!isPresetsInited.value) {
      handlePresetVisiblity();
    }
  };

  const dicts = [
    {
      id: crypto.randomUUID(),
      key: "hello",
      moduleName: "en-ru",
      translate: "Привет",
    },
    {
      id: crypto.randomUUID(),
      key: "world",
      moduleName: "en-ru",
      translate: "мир",
    },
    {
      id: crypto.randomUUID(),
      key: "sun",
      moduleName: "en-ru",
      translate: "солнце",
    },
    {
      id: crypto.randomUUID(),
      key: "moon",
      moduleName: "en-ru",
      translate: "луна",
    },
    {
      id: crypto.randomUUID(),
      key: "sky",
      moduleName: "en-ru",
      translate: "небо",
    },
    {
      id: crypto.randomUUID(),
      key: "earth",
      moduleName: "en-ru",
      translate: "земля",
    },
    {
      id: crypto.randomUUID(),
      key: "sea",
      moduleName: "en-ru",
      translate: "море",
    },
    {
      id: crypto.randomUUID(),
      key: "mountain",
      moduleName: "en-ru",
      translate: "гора",
    },
    {
      id: crypto.randomUUID(),
      key: "tree",
      moduleName: "en-ru",
      translate: "дерево",
    },
    {
      id: crypto.randomUUID(),
      key: "house",
      moduleName: "en-ru",
      translate: "дом",
    },
    {
      id: crypto.randomUUID(),
      key: "car",
      moduleName: "en-ru",
      translate: "машина",
    },
    {
      id: crypto.randomUUID(),
      key: "apple",
      moduleName: "en-ru",
      translate: "яблоко",
    },
    {
      id: crypto.randomUUID(),
      key: "water",
      moduleName: "en-ru",
      translate: "вода",
    },
    {
      id: crypto.randomUUID(),
      key: "fire",
      moduleName: "en-ru",
      translate: "огонь",
    },
    {
      id: crypto.randomUUID(),
      key: "snow",
      moduleName: "en-ru",
      translate: "снег",
    },
    {
      id: crypto.randomUUID(),
      key: "rain",
      moduleName: "en-ru",
      translate: "дождь",
    },
    {
      id: crypto.randomUUID(),
      key: "wind",
      moduleName: "en-ru",
      translate: "ветер",
    },
    {
      id: crypto.randomUUID(),
      key: "cloud",
      moduleName: "en-ru",
      translate: "облако",
    },
    {
      id: crypto.randomUUID(),
      key: "sun",
      moduleName: "ru-en",
      translate: "sun",
    },
    {
      id: crypto.randomUUID(),
      key: "moon",
      moduleName: "ru-en",
      translate: "moon",
    },
    {
      id: crypto.randomUUID(),
      key: "sky",
      moduleName: "ru-en",
      translate: "sky",
    },
    {
      id: crypto.randomUUID(),
      key: "earth",
      moduleName: "ru-en",
      translate: "earth",
    },
    {
      id: crypto.randomUUID(),
      key: "sea",
      moduleName: "ru-en",
      translate: "sea",
    },
    {
      id: crypto.randomUUID(),
      key: "mountain",
      moduleName: "ru-en",
      translate: "mountain",
    },
    {
      id: crypto.randomUUID(),
      key: "tree",
      moduleName: "ru-en",
      translate: "tree",
    },
    {
      id: crypto.randomUUID(),
      key: "house",
      moduleName: "ru-en",
      translate: "house",
    },
    {
      id: crypto.randomUUID(),
      key: "car",
      moduleName: "ru-en",
      translate: "car",
    },
    {
      id: crypto.randomUUID(),
      key: "apple",
      moduleName: "ru-en",
      translate: "apple",
    },
    {
      id: crypto.randomUUID(),
      key: "water",
      moduleName: "ru-en",
      translate: "water",
    },
    {
      id: crypto.randomUUID(),
      key: "fire",
      moduleName: "ru-en",
      translate: "fire",
    },
    {
      id: crypto.randomUUID(),
      key: "snow",
      moduleName: "ru-en",
      translate: "snow",
    },
    {
      id: crypto.randomUUID(),
      key: "rain",
      moduleName: "ru-en",
      translate: "rain",
    },
    {
      id: crypto.randomUUID(),
      key: "wind",
      moduleName: "ru-en",
      translate: "wind",
    },
    {
      id: crypto.randomUUID(),
      key: "cloud",
      moduleName: "ru-en",
      translate: "cloud",
    },
  ];




  return {
    install(app, ...options) {
      app.provide<PresetsCofig>("presetsConfig", {
        handlePresetInited,
        handlePresetVisiblity,
        isBasePresetsModalVisible,
        isPresetsInited,
      });


      watch(isPresetsInited, () => {
        if (isPresetsInited.value) {
          appModules.addModule(userId.value, [
            {
              created_at: Date.now(),
              dic: dicts.filter(
                (dict) => dict.moduleName === "en-ru"
              ) as Dictionary[],
              description: "Изучение English",
              id: crypto.randomUUID(),
              moduleName: "en-ru",
            },
            {
              created_at: Date.now(),
              dic: dicts.filter(
                (dict) => dict.moduleName === "ru-en"
              ) as Dictionary[],
              description: "Изучение Русского",
              id: crypto.randomUUID(),
              moduleName: "ru-en",
            },
          ]);

          set("dict", appModules.appModules);
        }
      });
    },
  };
};
