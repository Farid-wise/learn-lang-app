import { useLS } from "@/composables/service/useLS";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
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
              dic: [
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
              ],
              description: "Изучение English",
              id: crypto.randomUUID(),
              moduleName: "en-ru",
            },
            {
              created_at: Date.now(),
              dic: [
                {
                  id: crypto.randomUUID(),
                  key: "привет",
                  moduleName: "ru-en",
                  translate: "hello",
                },
                {
                  id: crypto.randomUUID(),
                  key: "мир",
                  moduleName: "ru-en",
                  translate: "world",
                },
              ],
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
