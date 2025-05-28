<script setup lang="ts">
import ModuleCard from "@/components/ui/ModuleCard.vue";
import Spinner from "@/components/features/Spinner.vue";
import { useModules } from "@/composables/useModules";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { Statuses } from "@/composables/service/useStatuses";
import { useAuthStore } from "@/stores/auth";
import { stripTags } from "@/utils/strip-tags";
import { inject, type Ref } from "vue";
import type { PresetsCofig } from '../plugins/init-base-presets';

const modulesStatuses = useModules();

const { appModules } = storeToRefs(useAppStore());
const { userId } = storeToRefs(useAuthStore());

const presetsConfig = inject<PresetsCofig>('presetsConfig')!
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">Текущие модули</h1>

    <Spinner v-if="modulesStatuses.statuses.value === Statuses.LOADING" />
    <template
      v-else-if="
        appModules[userId]?.length && modulesStatuses.statuses.value === Statuses.IDLE
      "
    >
      <div class="flex gap-3 pt-5 align-content-center flex-wrap">
        <ModuleCard
          :title="stripTags(module.description)"
          v-for="(module, i) in appModules[userId]"
          :key="module.id"
          :module="module"
        />
      </div>
    </template>

    <template
      v-if="
        !appModules[userId]?.length && modulesStatuses.statuses.value === Statuses.IDLE
      "
    >
      <Message severity="warn">Модули не созданы</Message>
    </template>

    <Dialog
      v-model:visible="presetsConfig.isBasePresetsModalVisible.value"
      modal
      header="Хотите использовать предустановленные пресеты модулей? "
      :style="{ width: '50rem' }"
    >
      <span :style="{fontWeight: 'bold'}" class="p-text-secondary block mb-5">EN-RU и RU-EN </span>

      <span class="p-text-secondary block mb-5">Сделайте подтверждение</span>

      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Да я хотел / хотела бы "
          severity="secondary"
          @click="presetsConfig?.handlePresetInited(true)"
        ></Button>
        <Button
          type="button"
          label="Отменить"
          severity="secondary"
          @click="presetsConfig?.handlePresetInited(false)"
        ></Button>
      </div>
    </Dialog>
  </section>
</template>

<style scoped></style>
