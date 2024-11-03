<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import type { Dictionary } from '@/types/app-api.types';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';


const {userId} = storeToRefs(useAuthStore())
const {appModules} = storeToRefs(useAppStore())
const route = useRoute()


const foundDict = appModules.value[userId.value].find((module) => module.moduleName === route.params.slug)?.dic as Array<Dictionary>;

</script>

<template>
    <section>
        
        <h1  class="text-2xl font-bold mb-4">Словарь модуля {{(route.params.slug as string).toUpperCase()}}</h1>

        <pre>
            {{ foundDict }}
        </pre>
    </section>
</template>



<style scoped>

</style>