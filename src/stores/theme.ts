import { useLS } from "@/composables/service/useLS";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore('theme', () => {

    const {ls} = useLS()
    const theme = ref<'aura-light-blue' | 'aura-dark-blue'>(ls.getItem('theme') as 'aura-light-blue' | 'aura-dark-blue' || 'aura-light-blue')

    const setTheme = (mode: 'aura-light-blue' | 'aura-dark-blue') => {

        theme.value = mode
    }
    return { theme, setTheme }
})
