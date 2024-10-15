<script setup lang="ts">
import { langAppApi } from "@/api/LangAppApi";
import ModuleCard from "@/components/ModuleCard.vue";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { onBeforeMount, onMounted, ref, watch } from "vue";

const source = ref<"localstorage" | "firebase">("localstorage");
const word = ref<string>("hello");

const modules = ref<Array<Module>>([]);

onMounted(async () => {
  const newModules = [
    {
      "en-ru": {
        dic: [
          { id: "1", [word.value]: "Привет" },
          { id: "2", world: "мир" },
        ],
        description: "",
        created_at: Date.now(),
      },
      "ru-en": {
        dic: [],
        description: "fdsf",
        created_at: Date.now(),
      },
    },
  ];

  modules.value = newModules;
});

const unwatch = watch(modules, (newV, oldV) => {
  langAppApi.create({
    source,
    data: modules.value,
  });
});
</script>

<template>
  <section>
    <h1>Текущие модули</h1>

    <template v-if="modules.length">
      <ModuleCard v-for="(module, i) in modules" :key="i" :module="module" />
    </template>

    <template v-else>

      <Message severity="warn">Модули не созданы</Message>

    </template>
  </section>
</template>

<style scoped>

</style>
