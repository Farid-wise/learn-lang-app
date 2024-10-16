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
      <RouterView #default="{ Component }">

        <Transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>

      </RouterView>
    </template>
  </Layout>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
