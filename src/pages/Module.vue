
<script setup lang="ts">
import { useRoute } from 'vue-router';

    const route = useRoute();
</script>


<template>
    <div>
        <h1>Module with {{ route.params.slug }}</h1>
    </div>
</template>

<style scoped>

</style>