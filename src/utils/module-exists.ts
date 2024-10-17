import type { Module } from "@/types/app-api.types";

/**
 * Checks if any of the given module names exist in the module object.
 * @param moduleNames - an array of module names to check
 * @param module - the module object to check against
 * @returns true if any of the given module names exist, false otherwise
 * @example
 * moduleExists(['en-ru', 'ru-en'], module) // true if 'en-ru' or 'ru-en' exist in module
 */
export function  moduleExists(moduleNames: string[], module: Module) {
    for(let i = 0; i< moduleNames.length; i++){
        if(JSON.parse(localStorage.dict).module.length){
            if(Object.keys(JSON.parse(localStorage.dict)?.module[0])?.includes(moduleNames[i])){
                return true
            }
            else{
                return false
            }    
        }
       
    }
}
