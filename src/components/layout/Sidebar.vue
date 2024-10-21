<script setup lang="ts">

import { useTheme } from '@/composables/service/useTheme';
import { useAppStore } from '@/stores/app';
import { useToggleSideBarStore } from '@/stores/navigaton';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';


const themeStore = useThemeStore()
const {isOpen} = storeToRefs(useToggleSideBarStore());

const linkColor = computed(() => themeStore.theme === 'aura-light-blue' ? '#171a23' : '#586380');
const {appModules} = storeToRefs(useAppStore())

const links: Array<{label: string, icon: string, to: string, disabled?: boolean}> = [
  {
    label: "Главная",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "Словари",
    icon: "pi pi-fw pi-info",
    to: "/dictionaries",
    disabled: !appModules.value.modules.some(m => m.dic.length)
  },

  {
    label: "Tест",
    icon: "pi pi-fw pi-check",
    to: "/pass-test",
  },
];

</script>

<template>
  <aside :class="{closed: !isOpen}">
    <ul>
      <RouterLink
        :key="link.to"
        :style="{opacity: link.disabled ? '0.5' : '1', pointerEvents: link.disabled ? 'none' : 'all'}"
        activeClass="active-link"
        v-for="link in links"
        class="flex my-2 d-block p-2 align-items-center gap-1 p-button-rounded p-button-text w-full"
        :to="link.to"
      >
        <i :class="link.icon"></i>
        <li :class="isOpen ? 'opacity-100' : 'opacity-0'" class="w-full">{{ link.label }}</li>
      </RouterLink>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  width: 30%;
  padding: 15px 15px;
  min-height: 100vh;
  transition: 0.3s all ease;

}

.closed {
    width: 66px;
    transition: 0.3s all ease;
}

i {
  font-weight: 600;
}
li {
    overflow: hidden;
    text-overflow: ellipsis;
}

.active-link {
    background-color: #EDEFFF;
    color: #006EF5;
}

a {
  color: v-bind('linkColor');
  overflow: hidden;
  text-overflow: ellipsis;  
  font-weight: 600;
  border-radius: 10px;

  &:hover {
    color: #5D8CF0;
  }
}
</style>
