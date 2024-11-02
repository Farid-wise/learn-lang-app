<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { computed } from "vue";

const {user} = storeToRefs(useAuthStore())
const emailVerfiedText = computed(() => user.value?.emailVerified ? 'Подтверждена' : 'Не подтверждена')
</script>

<template>

  <div class="profile-page p-6 max-w-2xl mx-auto rounded-xl shadow-md space-y-4">
    <div class="flex items-center gap-4">
      <img class="img-avatar"  :src="user?.photoURL!" alt="Profile Picture" />
      <div class="text-lg font-medium">
        <h1 class="text-2xl font-bold">{{ user?.displayName }}</h1>
        <p class="text-gray-500">Email: {{ user?.email }}</p>
        <p class="text-gray-500">Верифицикация email: {{ emailVerfiedText }}</p>
        <p class="text-gray-500">Телефон: {{ user?.phoneNumber ?? 'Не указан' }}</p>
        <p class="text-gray-500">ID: {{ user?.uid }}</p>
      </div>
    </div>


    <div class="mt-5">
        <Button label="Edit Profile" class="p-button-rounded p-button-secondary" />
    </div>
  </div>
</template>

<style scoped>


.img-avatar {
    max-width: 100%;
    width: 200px !important;
    object-fit: cover;
}
</style>
