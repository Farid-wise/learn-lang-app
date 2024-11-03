<script setup lang="ts">
import { Statuses } from "@/composables/service/useStatuses";
import { useDictForm } from "@/composables/useDictForm";

const {
  addInputs,
  statuses,
  deleteInputs,
  dictInputs,
  saveDict,
  route,
  key,
  translate
} = useDictForm();



</script>

<template>
  <div>
    <Toast />

   

    <div class="mb-3 flex gap-3 align-items-center">
      <Button @click="addInputs">Добавить поля</Button>
      <Button
        :disabled="statuses === Statuses.LOADING || !key.length || !translate.length"  
        :loading="statuses === Statuses.LOADING"
        @click="saveDict(route.params.slug as string)"
        :label="statuses === Statuses.LOADING ? 'Сохранение...' : 'Сохранить'"
        :outlined="true"
      />
    </div>

    <template v-for="(input, index) in dictInputs" :key="input.id">
      <InputGroup :class="{ 'deleting-input': input.isDeleting }" class="mb-3">
        <InputText @change="key = input.key" v-model="input.key" placeholder="Введите термин" />
        <InputText @change="translate = input.translate" v-model="input.translate" placeholder="Добавьте перевод" />
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

<style scoped>
.deleting-input {
  animation: slide-out-fwd-right 1s linear 0s 1 normal none;
}

@keyframes slide-out-fwd-right {
  0% {
    transform: translateZ(0) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(600px) translateX(400px);
    opacity: 0;
  }
}
</style>
