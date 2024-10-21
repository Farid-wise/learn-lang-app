<script setup lang="ts">
import { useLS } from "@/composables/service/useLS";
import { useAppStore } from "@/stores/app";
import type { Dictionary, LangAppAPIType } from "@/types/app-api.types";
import { ref } from "vue";
import { useRoute } from "vue-router";

const { getSync } = useLS();
const route = useRoute();

const dictInputs = ref<Array<Dictionary>>(
  getSync<LangAppAPIType>("dict").modules.find(
    (module) => module.moduleName === route.params.slug
  )?.dic ?? [{ key: "", translate: "", id: crypto.randomUUID() }]
);

const app = useAppStore();

const addInputs = () => {
  dictInputs.value.push({ key: "", translate: "", id: crypto.randomUUID() });
};

const deleteInputs = (id: string) => {
  dictInputs.value = dictInputs.value.filter((input, index) => {
    return index === 0 || input.id !== id;
  });
};

const saveDict = async (moduleName: string) => {
  await app.fillDictionary(dictInputs.value, moduleName);
};
</script>

<template>
  <div>
    <div class="mb-3 flex gap-3 align-items-center">
      <Button @click="addInputs">Добавить поля</Button>
      <Button @click="saveDict(route.params.slug as string)" :outlined="true"
        >Сохранить</Button
      >
    </div>

    <template v-for="(input, index) in dictInputs" :key="input.id">
      <InputGroup class="mb-3">
        <InputText v-model="input.key" placeholder="Введите термин" />
        <InputText v-model="input.translate" placeholder="Добавьте перевод" />
        <Button
          :disabled="index === 0"
          @click="deleteInputs(input.id)"
          :icon="'pi pi-trash'"
          severity="danger"
        />
      </InputGroup>
    </template>
  </div>
</template>

<style scoped></style>
