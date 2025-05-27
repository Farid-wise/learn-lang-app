<script setup lang="ts">
import type Button from "primevue/button";
import { useTests } from "../composables/useTests";
import Test from "@/components/ui/Test.vue";
import { ref, computed } from 'vue';

const moduleName = ref<string>("");
const { userId, appModules, currentQuestionIndex } = useTests(moduleName.value);


</script>

<template>
  <section>
    <h1 class="text-2xl font-bold mb-4">Проверь свои знания</h1>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li
       :title="!module.dic?.length ? 'Модуль пуст' : ''" 
        v-for="module in appModules[userId]"
        :key="module.id"
        class="test-card shadow-lg p-4 border border-1 border-gray-200"
      >
        <h2 class="text-lg font-bold mb-3 uppercase">{{ module.moduleName }}</h2>
        <Button :disabled="!module.dic?.length" @click="moduleName = module.moduleName" class="text-white">
          Пройти тест модуля
        </Button>

        <Teleport to="body">
          <Test
            @click.self="moduleName = ''"
            :moduleName="moduleName"
            v-if="moduleName === module.moduleName"
          />
        </Teleport>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.test-card {
  border-radius: 10px;
}
</style>
