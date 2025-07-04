import { computed } from "vue";

export const API_URL = computed(() => import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL);

