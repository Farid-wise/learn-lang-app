<script setup lang="ts">
import { useToggleSideBarStore } from "@/stores/navigaton";
import Options from "../ui/Options.vue";
import { useModulesSearch } from "@/composables/useModulesSearch";
import SearchOutput from "../features/SearchOutput.vue";

const store = useToggleSideBarStore();
const { target, foundModules, searchValue } = useModulesSearch();


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
          <InputText
            v-model.trim="searchValue"
            type="search"
            placeholder="Поиск модулей"
          />
        </IconField>

        <Transition name="fade" mode="out-in">
          <SearchOutput ref="target" :foundModules="foundModules" v-show="searchValue.length" />
        </Transition>
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
  position: relative;

  & > div {
    width: 100%;
  }

  input {
    width: 100%;
    background-color: #58638021;
    border: none;
    color: white;
    text-overflow: ellipsis;
    outline: 2px solid #58638021;
   
  }
}
</style>
