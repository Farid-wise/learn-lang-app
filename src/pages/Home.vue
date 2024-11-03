<script setup lang="ts">
import ModuleCard from "@/components/ui/ModuleCard.vue";
import Spinner from "@/components/features/Spinner.vue";
import { useModules } from "@/composables/useModules";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { Statuses } from "@/composables/service/useStatuses";
import { useAuthStore } from "@/stores/auth";

const modulesStatuses = useModules();

const { appModules } = storeToRefs(useAppStore());
const {userId} = storeToRefs(useAuthStore())


</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">Текущие модули</h1>


    <Spinner v-if="modulesStatuses.statuses.value === Statuses.LOADING" />
    <template v-else>
      <div class="flex gap-3 pt-5 align-content-center flex-wrap">
        <ModuleCard v-for="(module, i) in appModules[userId]" :key="module.id" :module="module" />
      </div>
    </template>

    <template v-if="!appModules[userId]?.length && modulesStatuses.statuses.value === Statuses.IDLE">
      <Message severity="warn">Модули не созданы</Message>
    </template>
  </section>
</template>

<style scoped></style>
