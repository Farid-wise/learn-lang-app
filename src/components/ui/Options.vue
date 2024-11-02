<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useTemplateRef, type ShallowRef } from 'vue';


const auth = useAuthStore()
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

  },

  {
    label: "Профиль",
    icon: "pi pi-user",
    to: "profile",
    id: auth?.userId ?? ''
    
  }

] as {
  label: string;
  icon: string;
  id?: string;
  to?: string;
  action?: () => void;
}[];
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
        :to="{ name: option?.to ?? '', params: {id: option?.id} }"
      >
        <i :class="option.icon" class="pi text-xl"></i>
        <span class="w-full">{{ option.label }}</span>
      </RouterLink>

      <Button class="p-button-rounded exit flex gap-2 align-items-center p-button-text" @click="auth.clearUser">Выйти
        <i class="pi pi-sign-out"></i>
      </Button>
    </ul>
  </OverlayPanel>
</template>

<style scoped lang="scss">
.module-link {
  color: #586380;
  font-weight: 600;

  &:hover {
    color: #5d8cf0;
  }
}

.exit {
  font-size: 18px;
}

.active-link {
  color: #5d8cf0;
}

#menu button {
  font-size: 20px;
}
</style>
