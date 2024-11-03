<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { stripTags } from "@/utils/strip-tags";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { appModules } = storeToRefs(useAppStore());
const { userId } = storeToRefs(useAuthStore());
const router = useRouter();
const selectedItem = ref(appModules.value[userId.value][0]);

const redirectToDictionary = async (moduleName: string) => {
  await router.push({ name: "dictionary", params: { slug: moduleName } });
};
</script>

<template>
  <section>
    <h1 hidden class="text-2xl font-bold mb-4">Словари</h1>

    <ul class="space-y-4">
      <RouterLink
        :title="stripTags(module?.description)"
        v-for="module in appModules[userId] || []"
        :key="module.id"
        :to="{ name: 'dictionary', params: { slug: module.moduleName } }"
        class="block py-2 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <li class="px-3">
          <h2 class="font-semibold text-lg mb-1">Словарь {{ module.moduleName.toUpperCase() }}</h2>
        </li>
      </RouterLink>
    </ul>
  </section>
</template>

<style scoped>
a {
  color: #0065F5;
}
</style>
