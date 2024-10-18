<script lang="ts" setup>

import { useSettings } from "@/composables/useSettings";
import { useAppStore } from "@/stores/app";
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
  isSaving,
} = useSettings()

const {appModules} = storeToRefs(useAppStore())
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

        <ConfirmPopup/>
        <Button :disabled="!appModules.modules.length" @click="clearStorage()" severity="danger" label="Очистить хранилище" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
