<script setup lang="ts">

import { useToggleSideBarStore } from '@/stores/navigaton';
import { storeToRefs } from 'pinia';

const links = [
  {
    label: "Главная",
    icon: "pi pi-fw pi-home",
    to: "/",
  },
  {
    label: "Словарь",
    icon: "pi pi-fw pi-info",
    to: "/dictionary",
  },

  {
    label: "Tест",
    icon: "pi pi-fw pi-check",
    to: "/pass-test",
  },
];

const {isOpen} = storeToRefs(useToggleSideBarStore());
</script>

<template>
  <aside :class="{closed: !isOpen}">
    <ul>
      <RouterLink
        :key="link.to"
        activeClass="active-link"
        v-for="link in links"
        class="flex p-2 align-items-center gap-1 p-button-rounded p-button-text w-full"
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
  color: #171a23;
  overflow: hidden;
  text-overflow: ellipsis;  
  font-weight: 600;
  border-radius: 10px;
}
</style>
