<script lang="ts" setup>
import { useSettings } from "@/composables/useSettings";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

const {
  clearStorage,
  themes,
  source,
  themeOption,
  storageOption,
  storage,
  saveOptions,
  resetPresets,
  isSaving,
} = useSettings();

const { appModules } = storeToRefs(useAppStore());
const { userId } = storeToRefs(useAuthStore());
</script>

<template>
  <section>
    <Toast />
    <div :class="['settings-page p-4']">
      <h1 class="text-2xl font-bold mb-4">Настройки</h1>

      <div class="mb-4">
        <label for="theme" class="block text-sm font-medium text-white">Тема</label>
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
        <label for="storage" class="block text-sm font-medium text-white"
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

      <div class="flex align-content-center gap-3">
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

        <ConfirmPopup />
        <Button
          :disabled="!appModules[userId]?.length"
          @click="clearStorage"
          severity="danger"
          label="Очистить хранилище"
        />
        <Button
          v-if="!appModules[userId]?.length"
          @click="resetPresets"
          severity="info"
          class="bg-indigo-600 border-none text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          label="Вернуть пресеты модулей"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
