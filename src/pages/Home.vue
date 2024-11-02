<script setup lang="ts">
import ModuleCard from "@/components/ui/ModuleCard.vue";
import Spinner from "@/components/features/Spinner.vue";
import { useModules } from "@/composables/useModules";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { Statuses } from "@/composables/service/useStatuses";

const modulesData = useModules();

const { appModules } = storeToRefs(useAppStore());
</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">Текущие модули</h1>

    <Spinner v-if="modulesData.statuses.value === Statuses.LOADING" />
    <template v-else>
      <div class="flex gap-3 pt-5 align-content-center flex-wrap">
        <ModuleCard v-for="(module, i) in appModules.modules" :key="i" :module="module" />
      </div>
    </template>

    <template v-if="!appModules.modules.length && modulesData.statuses.value === Statuses.IDLE">
      <Message severity="warn">Модули не созданы</Message>
    </template>
  </section>
</template>

<style scoped></style>
