<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { computed, ref } from "vue";
import { useTestsStore } from "../stores/tests.store";
import { useAppStore } from "../stores/app";

const { user } = storeToRefs(useAuthStore());
const emailVerfiedText = computed(() =>
  user.value?.emailVerified ? "Подтверждена" : "Не подтверждена"
);

const { results } = storeToRefs(useTestsStore());
const { userId } = storeToRefs(useAuthStore());
const { appModules } = storeToRefs(useAppStore());

const resultForCurrentModule = appModules.value[userId.value]?.map((module) => ({
  moduleName: module.moduleName.toUpperCase(),
  score: results.value[module.moduleName]?.[0]?.score,
  date: results.value[module.moduleName]?.[0]?.date,
}));

const dt = ref<any>();
const exportCSV = () => {
  dt.value.exportCSV();
};
</script>

<template>
  <section class="profile-page rounded-xl shadow-md space-y-4">
    <div class="flex items-center gap-4 mb-5">
      <img class="img-avatar" :src="user?.photoURL!" alt="Profile Picture" />
      <div class="text-lg font-medium">
        <h1 class="text-2xl font-bold">{{ user?.displayName }}</h1>
        <p class="text-white">Email: {{ user?.email }}</p>
        <p class="text-white">Верифицикация email: {{ emailVerfiedText }}</p>
        <p class="text-white">Телефон: {{ user?.phoneNumber ?? "Не указан" }}</p>
        <p class="text-white">ID: {{ user?.uid }}</p>
      </div>
    </div>

    <div class="mb-5">
      <Button label="Edit Profile" class="p-button-rounded p-button-secondary" />
    </div>

    <h2 class="mb-5">Результаты тестирований:</h2>

    <DataTable
      :paginator="true"
      resizableColumns
      ref="dt"
      columnResizeMode="expand"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      :rows="5"
      :show-gridlines="true"
      v-if="resultForCurrentModule?.length"
      :value="resultForCurrentModule"
      tableStyle="min-width: 50rem"
    >
      <Column field="moduleName" header="Модуль"></Column>
      <Column field="score" header="Результат"></Column>
      <Column field="date" header="Дата"></Column>
    </DataTable>

    <p v-else>Нет результатов</p>
  </section>
</template>

<style scoped>
.img-avatar {
  max-width: 100%;
  width: 200px !important;
  object-fit: cover;
}
</style>
