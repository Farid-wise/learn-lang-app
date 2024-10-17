import { onMounted, onUnmounted, ref } from "vue"

/**
 * Provides a way to toggle the development mode on and off by pressing the 'alt + s' keys.
 *
 * It returns a reactive reference to the development mode state and a reactive reference to the current word.
 *
 * @returns {Object} An object with two properties: `isDev` and `word`, both of type reactive reference.
 */

export const useDev = () => {

    const isDev = ref<boolean>(false)
    const word=ref<string>('')


    const toggleDev = (event: KeyboardEvent) => {

        word.value +=event.key
        

        if(event.altKey && event.key === 's'){
            isDev.value = !isDev.value
        }

    }


    onMounted(() => {
        document.addEventListener('keydown', toggleDev)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', toggleDev)
    })


    return {isDev, word}
}