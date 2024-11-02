<script setup lang="ts">
import { useCreateModule } from "@/composables/useCreateModule";

const { name, createStatuses, description, createModule } = useCreateModule();
</script>

<template>
  <div>
    <Toast />
    <h1 class="text-2xl font-bold mb-4">Создать Модуль</h1>

    <Message class="mb-5" :style="{ width: '70%' }" :closable="false"
      >Модули необходимо создавать в формате "определение-значение", то есть если вы
      собираетесь изучать, к примеру Английский язык, то вы должны создать модуль "язык
      который изучаете" - "язык на котором говорите"</Message
    >

    <form
      @submit.prevent="
        createModule(
          () => {
            $toast.add({
              severity: 'success',
              detail: 'Модуль успешно создан!',
              life: 3000,
            });
          },
          (msg) => {
            $toast.add({
              severity: 'error',
              summary: 'Модуль не создан!',
              detail: msg,
              life: 3000,
            });
          }
        )
      "
      class="create-module-form"
    >
      <div class="field">
        <InputText
          v-model="name"
          placeholder="Название модуля"
          id="inputtext"
          type="text"
        />
      </div>

      <div class="field">
        <Editor
          v-model="description"
          editorStyle="height: 320px"
          id="textarea"
          placeholder="Описание"
          class="w-full"
        />
      </div>

      <div class="field">
        <Button
          :loading="createStatuses.isCreating"
          :disabled="!name.length || createStatuses.isCreating"
          type="submit"
          :label="createStatuses.isCreating ? 'Создание...' : 'Создать'"
          class="p-button-secondary"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.field > input {
  width: 80%;
}

.field > textarea {
  width: 80%;
}
</style>
