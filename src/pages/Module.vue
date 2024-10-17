<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const app = useAppStore();

const toggleEditableName = ref<boolean>(false);
const toggleEditableDescription = ref<boolean>(false);

const slug = route?.params?.slug as string;


const editName = ref<string>(app?.modules[0][slug].moduleName as unknown as string);
const editDescription = ref<string>(app?.modules[0][slug].description as unknown as string);


function onBlurNameSave(){
    app.updateModuleNameAndDescription(slug, { name: editName.value });
    toggleEditableName.value = false
}

function onBlurDescriptionSave(){
    app.updateModuleNameAndDescription(slug, { description: editDescription.value });
    toggleEditableDescription.value = false
}
</script>

<template>
  <div>
   
    <h1
      title="Дважды щелкните по названию для редактирования"
      v-if="!toggleEditableName"
      @dblclick="toggleEditableName = !toggleEditableName"
      class="text-2xl font-bold mb-4"
    >
      Модуль {{ app?.modules[0][slug].moduleName }}
    </h1>
    <InputText v-autofocus v-model="editName" class="d-block mb-3" v-else @blur="onBlurNameSave" />

    <Message
      v-if="!toggleEditableDescription"
      @dblclick="toggleEditableDescription = !toggleEditableDescription"
      title="Дважды щелкните по описанию для редактирования"
      :closable="false"
      severity="secondary"
      >{{ app?.modules[0][slug].description }}</Message
    >

    <Textarea
      v-else
      v-autofocus
      v-model="editDescription"
      class="w-full"
      @blur="onBlurDescriptionSave"
      :autoResize="true"
      rows="5"

    />

 

    <Button severity="danger" @click="app.removeModule((route.params.slug as string))"
      >Remove</Button
    >
  </div>
</template>

<style scoped></style>
