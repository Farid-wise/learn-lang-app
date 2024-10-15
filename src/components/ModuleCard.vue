<script setup lang="ts">
import type { Module } from '@/types/app-api.types';


defineProps<{module: Module}>()

</script>


<template>
    <div
        class="flex gap-3 pt-5 align-content-center flex-wrap">
        <RouterLink
          class="module-cards p-3"
          :key="item"
          v-for="item in Object.keys(module)"
          :to="`/module/${item}`"
        >
          <Card class="p-3">
            <template #header>{{ item }}</template>
          </Card>
        </RouterLink>
      </div>
</template>



<style scoped lang="scss">
.module-cards {
    width: 40%;
    transition: 0.3s all ease;

  
}

.p-card {
    transition: 0.3s all ease;

    &:hover {
        transform: scale(1.05);
        transition: 0.3s all ease;

        background-color: #EDEFFF !important;
    }
}


</style>