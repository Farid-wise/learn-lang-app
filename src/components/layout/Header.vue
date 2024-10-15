<script setup lang="ts">
import { useToggleSideBarStore } from "@/stores/navigaton";
import Options from "../Options.vue";

const store = useToggleSideBarStore();

</script>

<template>
  <header class="w-full shadow-md">
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
      

        <Options />
        
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


</style>
