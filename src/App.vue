<script setup lang="ts">
import { onMounted, computed } from "vue";
import Header from "./components/layout/Header.vue";
import Layout from "./components/layout/Layout.vue";
import { useModules } from "./composables/useModules";
import { useFps } from "@vueuse/core";
import { useAuth } from "./composables/app/useAuth";
import { useRoute } from "vue-router";

useModules();
const { authMe } = useAuth();
const route = useRoute();
const fps = useFps();

const isDev = computed(() => import.meta.env.DEV);

onMounted(() => {
  authMe();
});
</script>

<template>
  <Layout>
    <template #header>
      <div
        v-if="isDev && fps"
        :style="{ paddingLeft: '10px', paddingTop: '5px', fontSize: '10px' }"
      >
        FPS: {{ fps }}
      </div>
      <Header />
    </template>

    <template #sidebar-nav>
      <Sidebar />
    </template>

    <template #content>
      <RouterView #default="{ Component }">
        <Transition v-if="!(route?.name === 'signIn')" name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
        <component v-else :is="Component" />
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
