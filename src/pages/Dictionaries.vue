<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { stripTags } from "@/utils/strip-tags";
import { storeToRefs } from "pinia";

const { appModules } = storeToRefs(useAppStore());
const { userId } = storeToRefs(useAuthStore());


</script>

<template>
  <section>
    <h1 hidden class="text-2xl font-bold mb-4">Словари</h1>

    <ul class="space-y-4">
      <RouterLink
        :title="'Описание -' + ' ' +  stripTags(module?.description)"
        v-for="module in appModules[userId] || []"
        :key="module.id"
        :to="{ name: 'dictionary', params: { slug: module.moduleName } }"
        class="block rounded py-2 mb-3 bg-white shadow-md rounded-lg"
      >
        <li class="px-3 flex justify-content-between align-items-center">
          <h2 class="font-semibold text-lg">Словарь <i>{{ module.moduleName.toUpperCase() }}</i></h2>
          <span :style="{borderRadius: '10px', color: '#fff'}" class="p-2 bg-blue-600">{{ module.dic.length }}</span>
        </li>
      </RouterLink>
    </ul>
  </section>
</template>

<style scoped lang="scss">
a {
  color: #0065F5;
  transition: 0.3s all ease;
  background-color: transparent !important;
  border: 1px solid rgb(233, 233, 239) !important;
  box-shadow: none;

  &:hover {
    transform: scale(1.01234);
    transition: 0.3s all ease; 
    will-change: contents;
  }



}

a.rounded {
  border-radius: 10px;
}
</style>
