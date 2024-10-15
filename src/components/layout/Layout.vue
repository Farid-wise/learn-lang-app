<script setup lang="ts">
import { useTheme } from "@/composables/service/useTheme";

useTheme();
</script>

<template>
  <template v-if="$slots.header">
    <slot name="header"></slot>
  </template>

  <div class="flex items-center gap-3">
    <slot name="sidebar-nav"></slot>
    <main>
      <slot name="content"></slot>
    </main>
  </div>
</template>

<style scoped></style>
