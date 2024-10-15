<script lang="ts" setup>
import { useLS } from "@/composables/service/useLS";
import { useTheme } from "@/composables/service/useTheme";
import { delay } from "@/utils/delay";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref, watch } from "vue";

const { theme } = useTheme();
const { set } = useLS();
const isSaving = ref<boolean>(false);

const themeOption = ref<{ name: string }>({
  name: theme.value === "aura-light-blue" ? "Светлая" : "Темная",
});
const storageOption = ref<{ name: string }>({ name: "Локальное хранилище" });

const themes = ref([{ name: "Светлая" }, { name: "Темная" }]);
const storage = ref([{ name: "Локальное хранилище" }, { name: "Внешнее Firebase" }]);

const saveOptions = async (callback: () => void, error: () => void) => {
  isSaving.value = true;
  await delay(500);
  try {
    if (themeOption.value?.name === "Светлая") {
      theme.value = "aura-light-blue";
    } else {
      theme.value = "aura-dark-blue";
    }

    if (storageOption.value?.name === "Локальное хранилище") {
      set("storage", "local");
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
</script>

<template>
  <div>
    <Toast />
    <div :class="['settings-page p-4']">
      <h1 class="text-2xl font-bold mb-4">Настройки</h1>

      <div class="mb-4">
        <label for="theme" class="block text-sm font-medium text-gray-700">Тема</label>
        <Dropdown
          id="theme"
          v-model="themeOption"
          option-label="name"
          placeholder="Выберите тему"
          :options="themes"
          class="mt-1 w-full"
        >
        </Dropdown>
      </div>

      <div class="mb-4">
        <label for="storage" class="block text-sm font-medium text-gray-700"
          >Хранилище</label
        >

        <Dropdown
          option-label="name"
          id="storage"
          v-model="storageOption"
          placeholder="Выберите хранилище"
          :options="storage"
          class="mt-1 w-full"
        >
        </Dropdown>
      </div>

      <Button
        :disabled="isSaving"
        :label="isSaving ? 'Сохранение...' : 'Сохранить'"
        :loading="isSaving"
        @click="
          saveOptions(
            () =>
              $toast.add({
                severity: 'success',
                summary: 'Успешно',
                detail: 'Настройки сохранены',
                life: 3000,
              }),
            () =>
              $toast.add({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Не удалось сохранить настройки',
                life: 3000,
              })
          )
        "
        :severity="'info'"
        class="bg-indigo-600 border-none text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      />
    </div>
  </div>
</template>

<style scoped></style>
