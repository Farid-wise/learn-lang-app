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
        :title="'Описание -' + ' ' + stripTags(module?.description)"
        v-for="module in appModules[userId] || []"
        :key="module.id"
        :to="
          module.dic.length
            ? { name: 'dictionary', params: { slug: module.moduleName } }
            : ''
        "
        :class="!module.dic.length ? 'pointer-events-none bg-gray-100' : 'bg-white'"
        class="block rounded py-2 mb-3 shadow-md rounded-lg"
      >
        <li class="px-3 flex justify-content-between align-items-center">
          <h2 class="font-semibold text-lg text-gray-600">
            Словарь <i>{{ module.moduleName.toUpperCase() }}</i>
          </h2>
          <span
            :style="{
              borderRadius: '50%',
              color: '#fff',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }"
            class="p-2 bg-blue-600"
            >{{ module.dic.length }}</span
          >
        </li>
      </RouterLink>
    </ul>
  </section>
</template>

<style scoped lang="scss">
a {
  color: #0065f5;
  transition: 0.3s all ease;
  background-color: transparent;
  border: 1px solid rgb(233, 233, 239);
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
