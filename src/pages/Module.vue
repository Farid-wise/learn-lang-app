
<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useRoute } from 'vue-router';

    const route = useRoute();
    const app = useAppStore()
</script>


<template>
    <div>
        <h1 class="text-2xl font-bold mb-4">Модуль {{ (route.params.slug as string).toUpperCase() }}</h1>

        <div class="mb-5">
            {{ app?.modules[0][(route?.params?.slug as string)]  }}
        </div>


        <Button severity="danger" @click="app.removeModule((route.params.slug as string))">Remove</Button>
    </div>
</template>

<style scoped>

</style>