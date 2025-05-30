import { useLS } from "@/composables/service/useLS";
import { defineStore } from "pinia";
import { ref, watch } from "vue";


interface ITestData {
    [moduleName: string]: Array<{date: string, score: string}>
}

export const useTestsStore = defineStore('tests', () => {

        const {set, getSync} = useLS()

    const results = ref<ITestData>(getSync('user-results') ?? {})

    



    const setResults = (data: ITestData) => {
        if(results.value) {
            results.value = {...results.value, ...data}
        }
        else {
            results.value = data
        }
    }

    const removeResults = (moduleName: string) => {
        if(results.value) {
            delete results.value[moduleName]
        }
    }


    watch(results, () => {
        if(results.value) {
            set('user-results', results.value)
        }
    })

    return {results, setResults, removeResults}
})