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
  <section>
    <h1>Текущие модули</h1>

    <div class="flex gap-3 pt-5 align-content-center flex-wrap" v-for="(module, i) in modules" :key="i">
      <Card class="module-cards p-3" :key="item" v-for="item in Object.keys(module)">
          <template #header>{{ item }}</template>
      </Card>
      
    </div>

 
  </section>
</template>



<style scoped>

.module-cards {
  width: 450px;

}
</style>
