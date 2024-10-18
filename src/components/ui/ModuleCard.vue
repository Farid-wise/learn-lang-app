<script setup lang="ts">
import type { Module } from "@/types/app-api.types";

defineProps<{ module: Module }>();
</script>

<template>
  <RouterLink
    class="module-cards p-3"
    :to="`/module/${module.moduleName}`"
  >
    <Card class="p-3">
      <template #title
        ><b>{{ module.moduleName.toUpperCase() }}</b></template
      >
      <template #content>
        <p
          :style="{
            whiteSpace: 'pre-wrap',
            fontStyle: 'italic',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '100%',
          }"
        >
          <b
            ><i>{{ new Date(module.created_at).toLocaleString() }}</i></b
          >
        </p>
      </template>
    </Card>
  </RouterLink>
</template>

<style scoped lang="scss">
.module-cards {
  width: 40%;
  height: 220px;
  transition: 0.3s all ease;
}

.p-card {
  transition: 0.3s all ease;

  height: 100%;

  &:hover {
    transform: scale(1.05);
    will-change: contents;
    transition: 0.3s all ease;
    background-color: #abb7ff !important;
  }
}
</style>
