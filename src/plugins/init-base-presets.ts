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
  const { getSync, set } = useLS();
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
      key: "hello",
      moduleName: "en-ru",
      translate: "Привет",
    },
    {
      key: "world",
      moduleName: "en-ru",
      translate: "мир",
    },
    {
      key: "sun",
      moduleName: "en-ru",
      translate: "солнце",
    },
    {
      key: "moon",
      moduleName: "en-ru",
      translate: "луна",
    },
    {
      key: "sky",
      moduleName: "en-ru",
      translate: "небо",
    },
    {
      key: "earth",
      moduleName: "en-ru",
      translate: "земля",
    },
    {
      key: "sea",
      moduleName: "en-ru",
      translate: "море",
    },
    {
      key: "mountain",
      moduleName: "en-ru",
      translate: "гора",
    },
    {
      key: "tree",
      moduleName: "en-ru",
      translate: "дерево",
    },
    {
      key: "house",
      moduleName: "en-ru",
      translate: "дом",
    },
    {
      key: "car",
      moduleName: "en-ru",
      translate: "машина",
    },
    {
      key: "apple",
      moduleName: "en-ru",
      translate: "яблоко",
    },
    {
      key: "water",
      moduleName: "en-ru",
      translate: "вода",
    },
    {
      key: "fire",
      moduleName: "en-ru",
      translate: "огонь",
    },
    {
      key: "snow",
      moduleName: "en-ru",
      translate: "снег",
    },
    {
      key: "rain",
      moduleName: "en-ru",
      translate: "дождь",
    },
    {
      key: "wind",
      moduleName: "en-ru",
      translate: "ветер",
    },
    {
      key: "cloud",
      moduleName: "en-ru",
      translate: "облако",
    },
    {
      key: "sun",
      moduleName: "ru-en",
      translate: "sun",
    },
    {
      key: "moon",
      moduleName: "ru-en",
      translate: "moon",
    },
    {
      key: "sky",
      moduleName: "ru-en",
      translate: "sky",
    },
    {
      key: "earth",
      moduleName: "ru-en",
      translate: "earth",
    },
    {
      key: "sea",
      moduleName: "ru-en",
      translate: "sea",
    },
    {
      key: "mountain",
      moduleName: "ru-en",
      translate: "mountain",
    },
    {
      key: "tree",
      moduleName: "ru-en",
      translate: "tree",
    },
    {
      key: "house",
      moduleName: "ru-en",
      translate: "house",
    },
    {
      key: "car",
      moduleName: "ru-en",
      translate: "car",
    },
    {
      key: "apple",
      moduleName: "ru-en",
      translate: "apple",
    },
    {
      key: "water",
      moduleName: "ru-en",
      translate: "water",
    },
    {
      key: "fire",
      moduleName: "ru-en",
      translate: "fire",
    },
    {
      key: "snow",
      moduleName: "ru-en",
      translate: "snow",
    },
    {
      key: "rain",
      moduleName: "ru-en",
      translate: "rain",
    },
    {
      key: "wind",
      moduleName: "ru-en",
      translate: "wind",
    },
    {
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
              dic: dicts.filter((dict) => dict.moduleName === "en-ru") as Dictionary[],
              description: "Изучение English",
              id: crypto.randomUUID(),
              moduleName: "en-ru",
            },
            {
              created_at: Date.now(),
              dic: dicts.filter((dict) => dict.moduleName === "ru-en") as Dictionary[],
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

