<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import type { Dictionary } from "@/types/app-api.types";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { userId } = storeToRefs(useAuthStore());
const { appModules } = storeToRefs(useAppStore());
const route = useRoute();

const foundDict = appModules.value[userId.value].find(
  (module) => module.moduleName === route.params.slug
)?.dic as Array<Dictionary>;

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};


</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-5">
      Словарь модуля {{(route.params.slug as string).toUpperCase()}}
    </h1>

    <DataTable
      paginator
      ref="dt"
      :rows="5"
      resizableColumns
      columnResizeMode="expand"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      stripedRows
      showGridlines
      :value="foundDict"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div class="text-end">
          <Button icon="pi pi-external-link" label="Экспортировать CSV" @click="exportCSV()" />
        </div>
      </template>
      <Column sortable field="key" header="Значение"></Column>
      <Column sortable field="translate" header="Перевод"></Column>
    </DataTable>
  </section>
</template>

<style scoped></style>
