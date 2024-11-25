<script setup lang="ts">
import type { Module } from "@/types/app-api.types";
import { useRouter } from "vue-router";

defineProps<{ foundModules: Module[] }>();
const router = useRouter()
</script>

<template>
  <div class="search-output p-6 max-w-md mx-auto">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Результат поиска:</h2>
    <ul class="divide-y divide-gray-200">
      <template v-if="foundModules.length">
        <a
          v-for="module in foundModules"
          :key="module.id"
          target="_blank"
          :href="`/module/${module.moduleName}`"
          class="block py-2"
        >
          <h3>
            <span class="text-gray-800"
              >Модуль - {{ module.moduleName.toUpperCase() }}</span
            >
          </h3>

          <p class="text-gray-600">
            <span>{{ module.description }}</span>
          </p>
        </a>
      </template>
      <template v-else>
        <p class="text-gray-600">Ничего не нашлось</p>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.search-output {
  background-color: ghostwhite;
  position: absolute;
  z-index: 22;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  top: 40px;
  border-radius: 10px;
}

.search-output a {
  text-decoration: none;
  color: inherit;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  display: block;
}

.search-output a:hover {
  background-color: #abb7ff;
}
</style>
