<script setup lang="ts">
import { useTemplateRef, type ShallowRef } from 'vue';



const op = useTemplateRef<any>('op');
const toggle = (event: Event) => {
  op.value?.toggle(event);
};


const options = [
  {
    label: "Создать модуль",
    icon: "pi pi-box",
    to: "create-module",
  },

  {
    label: "Настройки",
    icon: "pi pi-cog",
    to: "settings",
    
  }
]
</script>

<template>
  <Button @click="toggle" icon="pi pi-plus" class="p-button-rounded p-button-text" />
  <OverlayPanel ref="op">
    <ul>
      <RouterLink
        active-class="active-link"
        v-for="option in options"
        :key="option.to"
        class="flex p-2 module-link align-items-center gap-2 p-button-rounded p-button-text w-full"
        :to="{ name: option.to }"
      >
        <i :class="option.icon" class="pi text-xl"></i>
        <span class="w-full">{{ option.label }}</span>
      </RouterLink>
    </ul>
  </OverlayPanel>
</template>

<style scoped lang="scss">

    
.module-link {
    color: #586380;
    font-weight: 600;

    &:hover {
      color: #5D8CF0;
    }
}

.active-link {
  color: #5D8CF0;
}

#menu button {
  font-size: 20px;
}

</style>
