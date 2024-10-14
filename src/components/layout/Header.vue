<script setup lang="ts">
import { useToggleSideBarStore } from "@/stores/navigaton";
import { useTemplateRef } from "vue";

const store = useToggleSideBarStore();
const op = useTemplateRef("op");

const toggle = (event: Event) => {
  op.value?.toggle(event);
};
</script>

<template>
  <header class="w-full">
    <nav class="flex justify-content-between items-center">
      <div id="menu">
        <Button
          @click="store.toggleSidebar()"
          icon="pi pi-bars"
          class="p-button-rounded p-button-text"
        />
      </div>

      <div id="app-search">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"> </InputIcon>
          <InputText type="search" placeholder="Поиск модулей" />
        </IconField>
      </div>

      <div id="module-create">
        <Button
          @click="toggle"
          icon="pi pi-plus"
          class="p-button-rounded p-button-text"
        />
        <OverlayPanel ref="op">
          <ul>
            <RouterLink
              class="flex p-2 module-link align-items-center gap-2 p-button-rounded p-button-text w-full"
              :to="{ name: 'create-module' }"
            >
              <i class="pi pi-box text-xl"></i>
              <span class="w-full">Создать модуль</span>
            </RouterLink>
          </ul>
        </OverlayPanel>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: 15px;
}
#app-search {
  width: 40%;
  margin: 0 auto;

  & > div {
    width: 100%;
  }

  input {
    width: 100%;
    background-color: #58638021;
    border: none;
    text-overflow: ellipsis;
    outline-color: #58638021;
  }
}

.module-link {
    color: #586380;
    font-weight: 600;
}

#menu button {
  font-size: 20px;
}
</style>
