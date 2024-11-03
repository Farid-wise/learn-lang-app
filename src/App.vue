<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./components/layout/Header.vue";
import Layout from "./components/layout/Layout.vue";
import { useModules } from "./composables/useModules";
import { useFps } from '@vueuse/core'
import { useAuth } from "./composables/app/useAuth";

useModules()
const {authMe, checkIsAuth} = useAuth()
const fps = useFps()


onMounted(() => {

  checkIsAuth()
  authMe()
})

</script>

<template>
  <Layout>
    <template #header>
      <div v-if="fps" :style="{paddingLeft: '10px'}">FPS: {{ fps }}</div>
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
