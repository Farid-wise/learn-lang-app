import { useAppStore } from "@/stores/app"
import { useAuthStore } from "@/stores/auth"
import type { Module } from "@/types/app-api.types"
import { storeToRefs } from "pinia"
import { ref, watch } from "vue";
import { onClickOutside } from '@vueuse/core'

export const useModulesSearch = () => {


    const target = ref(null)


    const {userId} = storeToRefs(useAuthStore())
    const {appModules} = storeToRefs(useAppStore())

    const searchValue = ref<string>('')
    const isActiveSearch = ref<boolean>(false)
    const foundModules = ref<Module[]>([])


    const findModules = () => {
        foundModules.value = appModules.value[userId.value]
        .filter(module => module.moduleName.toLowerCase()
        .includes(searchValue.value.toLowerCase()))
    }




    watch(searchValue, () => {
       if(searchValue.value.length){
            findModules()
       }
       else {
        foundModules.value = []
       }
    })

    

    onClickOutside(target, event => {
        searchValue.value = ''
    })
 
    return {
        searchValue, 
        target,
        isActiveSearch,
        foundModules
    }
}