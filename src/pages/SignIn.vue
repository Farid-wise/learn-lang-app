<script setup lang="ts">
import { useGoogleAuth } from "@/composables/service/useGoogleAuth";

const { authViaGoogle } = useGoogleAuth();
</script>

<template>
  <section class="flex flex items-center justify-center min-h-screen">
    <div class="w-full wrapper p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Пожалуйста авторизуйтесь перед использованием</h1>
      <Button
        @click="authViaGoogle"
        class="justify-content-center signin-button gap-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Войти через Google
        <i class="pi pi-google"></i>
      </Button>
    </div>
  </section>
</template>

<style scoped>
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
      
    }

  button.signin-button  {
    min-width: 50%;
    margin: 0 auto;
  }

</style>
