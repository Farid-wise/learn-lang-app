import { defineStore } from "pinia";
import { ref } from "vue";

export const useToggleSideBarStore = defineStore('toggleSidebar', () => {

    const isOpen = ref<boolean>(true)

    const toggleSidebar = () => {
        isOpen.value = !isOpen.value
    }

    return {isOpen, toggleSidebar}
})