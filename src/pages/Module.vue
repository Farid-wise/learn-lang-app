<script setup lang="ts">
import DictForm from "@/components/ui/DictForm.vue";
import { useModule } from "@/composables/useModule";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";


const {appModules} = storeToRefs(useAppStore())

const {
  toggleEditableName,
  editName,
  isNameError,
  isNameUpdating,
  toggleEditableDescription,
  editDescription,
  isRemovingModule,
  removeModule,
  onBlurNameSave,
  createDict,
  toggleCreateDict,
  onBlurDescriptionSave,
  slug,
} = useModule(appModules.value.modules);
</script>

<template>
  <div>
    <Toast />
    <Dialog />

    <pre>
    </pre>
    <h1
      v-if="!toggleEditableName"
      class="text-2xl font-bold mb-4 flex justify-content-between align-items-center"
    >
      <span class="flex align-items-center" :style="{ color: '#618FF0' }"
        >{{ editName.toUpperCase() }}

        <i
          @click="toggleEditableName = true"
          class="pi cursor-pointer pi-pencil ml-2"
        ></i>
      </span>

      <Button
        :label="isRemovingModule ? 'Удаление...' : 'Удалить модуль'"
        :outlined="true"
        severity="danger"
        @click="removeModule(slug)"
      />
    </h1>
    <InputText
      v-autofocus
      v-model="editName"
      :class="{
        'invalid-name-input': isNameError,
        'updating-name-input': isNameUpdating,
      }"
      class="d-block mb-3 edit-name-input"
      v-else
      @blur="onBlurNameSave"
    />

    <div class="flex align-items-center relative">
      <Message
        v-html="editDescription"
        :style="{ padding: '10px' }"
        v-if="editDescription.length"
        class="mt-0 w-full"
        @dblclick="toggleEditableDescription = true"
        title="Дважды щелкните по описанию для редактирования"
        :closable="false"
        severity="secondary"
      />

      <Textarea
        v-autofocus
        ref="target"
        v-model="editDescription"
        class="w-full mb-3 edit-area"
        :class="{ 'edit-area-active': toggleEditableDescription }"
        @blur="onBlurDescriptionSave"
        :autoResize="true"
        rows="3"
      />
    </div>

    <div class="flex gap-3 align-items-center">
      <Button @click="createDict()" :label="toggleCreateDict ? 'Скрыть' : 'Добавить словарь'" :outlined="true" />
    </div>

    <DictForm class="mt-5" v-show="toggleCreateDict" />
  </div>
</template>

<style scoped>
.edit-name-input {
  border: none !important;
  outline: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #618ff0 !important;
}

.updating-name-input {
  animation: blink-2 1s linear 0s 1 normal none;
}

.invalid-name-input {
  animation: shake-horizontal 1s linear 0s 1 normal none !important;
}

.edit-area {
  position: absolute !important;
  left: 0;
  opacity: 0 !important;
  z-index: -1 !important;
  transition: 0.3s all ease;
  width: 100% !important;
}

.edit-area-active {
  opacity: 1 !important;
  z-index: 1 !important;
  transition: 0.3s all ease;
}

@keyframes shake-horizontal {
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-10px);
  }
  20% {
    transform: translateX(10px);
  }
  30% {
    transform: translateX(-10px);
  }
  40% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(-10px);
  }
  80% {
    transform: translateX(8px);
  }
  90% {
    transform: translateX(-8px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes blink-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
