<script setup lang="ts">
import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { onBeforeMount, onMounted, ref } from "vue";

const source = ref<"localstorage" | "firebase">("localstorage");
const word = ref<string>("hello");

const modules = ref<Array<Module>>([
  {
    "en-ru": {
      dic: [
        { id: "1", [word.value]: "Привет" },
        { id: "2", world: "мир" },
      ],
    },
    "ru-en": {
      dic: [],
    },
  },
]);


onBeforeMount(async () => {
  await langAppApi.create<LangAppAPIType>({
    source,
    data: {
      module: modules.value,
    },
  });
});

onMounted(async () => {
  const data = await langAppApi.get<LangAppAPIType>({
    source,
  });
  data?.module.forEach((module) => {
    console.log(module["en-ru"].dic);
  });
});
</script>

<template>
  <main>
    <h1>Home</h1>


    <template v-for="(module, i) in modules" :key="i">
      <div v-for="item in Object.keys(module)">
        {{ item }}
      </div>

    </template>
  </main>
</template>
