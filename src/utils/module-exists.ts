import type { Module } from "@/types/app-api.types";


/**
 * Checks if the given moduleNames exist in the module object.
 * @param moduleNames the array of module names to check
 * @param module the module object to check against
 * @returns true if any of the module names exist in the module object, false otherwise
 */
export function  moduleExists(moduleNames: string[], module: Module) {
    for(let i = 0; i< moduleNames.length; i++){
        if(Object.keys(module).length){
            if(Object.keys(module)?.includes(moduleNames[i])){
                return true
            }
            else{
                return false
            }    
        }
       
    }
}
