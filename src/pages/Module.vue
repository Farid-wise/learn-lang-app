
<script setup lang="ts">
import { useRoute } from 'vue-router';

    const route = useRoute();
</script>


<template>
    <div>
        <h1>Модуль {{ (route.params.slug as string).toUpperCase() }}</h1>


    </div>
</template>

<style scoped>

</style>