<script setup lang="ts">
import Header from "./components/layout/Header.vue";
import Layout from "./components/layout/Layout.vue";


</script>

<template>
  <Layout>
    <template #header>
      <Header />
    </template>

    <template #sidebar-nav>
        <Sidebar />
    </template>

    <template #content>
      <RouterView />
    </template>
  </Layout>
</template>

<style>

</style>
