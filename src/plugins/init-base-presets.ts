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
  const dicts: Dictionary[] = [];
  const modules = [
    {
      name: "en-ru",
      words: [
        { key: "hello", translate: "Привет" },
        { key: "world", translate: "мир" },
        { key: "sun", translate: "солнце" },
        { key: "moon", translate: "луна" },
        { key: "sky", translate: "небо" },
        { key: "earth", translate: "земля" },
        { key: "sea", translate: "море" },
        { key: "mountain", translate: "гора" },
        { key: "tree", translate: "дерево" },
        { key: "house", translate: "дом" },
      ],
    },
    {
      name: "ru-en",
      words: [
        { key: "Привет", translate: "hello" },
        { key: "мир", translate: "world" },
        { key: "солнце", translate: "sun" },
        { key: "луна", translate: "moon" },
        { key: "небо", translate: "sky" },
        { key: "земля", translate: "earth" },
        { key: "море", translate: "sea" },
        { key: "гора", translate: "mountain" },
        { key: "дерево", translate: "tree" },
        { key: "дом", translate: "house" },
      ],
    },
  ];

  for (const module of modules) {
    for (const word of module.words) {
      dicts.push({
        id: crypto.randomUUID(),
        key: word.key,
        moduleName: module.name,
        translate: word.translate,
      });
    }
  }




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
