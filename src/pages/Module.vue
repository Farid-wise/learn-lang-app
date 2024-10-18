<script setup lang="ts">
import { useModule } from "@/composables/useModule";

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

const foundModule = app?.modules.find(m => m.moduleName === slug);
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
      Модуль {{ slug }}
    </h1>
    <InputText
      v-autofocus
      v-model="editName"
      class="d-block mb-3"
      v-else
      @blur="onBlurNameSave"
    />

    <Message
      v-show="!toggleEditableDescription"
      v-if="foundModule?.description?.length"
      @dblclick="toggleEditableDescription = !toggleEditableDescription"
      title="Дважды щелкните по описанию для редактирования"
      :closable="false"
      severity="secondary"
      >{{ foundModule?.description }}</Message
    >

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
