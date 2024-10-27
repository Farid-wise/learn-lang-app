<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useTheme } from '../../composables/service/useTheme';


useTheme();

const {userId} = storeToRefs(useAuthStore());

</script>

<template>
  <template v-if="$slots.header">
    <slot v-if="userId.length" name="header"></slot>
  </template>

  <div class="flex items-center gap-3">
    <slot v-if="userId.length" name="sidebar-nav"></slot>
    <main :style="{padding: !userId.length ? '0' : ''}">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<style scoped></style>
