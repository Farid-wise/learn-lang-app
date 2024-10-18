<script setup lang="ts">
import { useModule } from "@/composables/useModule";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const {
  app,
  toggleEditableName,
  editName,
  toggleEditableDescription,
  editDescription,
  onBlurNameSave,
  onBlurDescriptionSave,
  slug,
} = useModule();


</script>

<template>
  <div>
    <Toast />

     
    <h1
      title="Дважды щелкните по названию для редактирования"
      v-if="!toggleEditableName"
      @dblclick="toggleEditableName = !toggleEditableName"
      class="text-2xl font-bold mb-4"
    >
      Модуль <span :style="{color: '#618FF0'}">{{ editName.toUpperCase() }}</span>
    </h1>
    <InputText
      v-autofocus
      v-model="editName"
      class="d-block mb-3"
      v-else
      @blur="onBlurNameSave"
    />

    <Message
      v-html="editDescription"
      :style="{padding: '10px'}"
      v-show="!toggleEditableDescription"
      v-if="editDescription.length"
      @dblclick="toggleEditableDescription = !toggleEditableDescription"
      title="Дважды щелкните по описанию для редактирования"
      :closable="false"
      severity="secondary"
    />
    

    
    <Textarea
      v-if="toggleEditableDescription"
      v-autofocus
      v-model="editDescription"
      class="w-full"
      @blur="onBlurDescriptionSave"
      :autoResize="true"
      rows="5"
    />

    <Button severity="danger" @click="app.removeModule(slug)">Remove</Button>
  </div>
</template>

<style scoped></style>
