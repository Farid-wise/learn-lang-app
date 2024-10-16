<script setup lang="ts">
import ModuleCard from "@/components/ModuleCard.vue";
import { useModules } from "@/composables/useModules";
import { useAppStore } from "@/stores/app";

useModules()

const app = useAppStore()
</script>

<template>
  <section>
    <h1  class="text-2xl font-bold mb-4">Текущие модули</h1>
    
    <template v-if="app.modules.length">
   
      <div  class="flex gap-3 pt-5 align-content-center flex-wrap">
        <ModuleCard  v-for="(module, i) in app.modules" :key="i" :module="module" />
      </div>
      
    </template>

    <template v-else>

      <Message severity="warn">Модули не созданы</Message>

    </template>
  </section>
</template>

<style scoped>

</style>
