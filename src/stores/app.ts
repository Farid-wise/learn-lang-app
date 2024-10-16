import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('app', () => {
    const modules = ref<Array<Module>>([]);


    const addModule = async (module: Module) => {
    // Check if the module already exists in the modules array
    if (!modules.value.some(item => item.id === module.id)) {
        
        console.log(module)

        modules.value.push(module);
    }
}

    const removeModule = (module: Module, order: number) => {
        modules.value = modules.value.filter((item, i) => item[i].id !== module[order].id)
    }

    const clearMOdules = () => {
        modules.value = []
    }

    return { modules, addModule, removeModule, clearMOdules }
})