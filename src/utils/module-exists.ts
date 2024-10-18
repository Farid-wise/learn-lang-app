import type { Module } from "@/types/app-api.types";



/**
 * Checks if a module with the given name exists in the given array of modules
 * @param moduleName the name of the module to search for
 * @param module the array of modules to search in
 * @returns true if the module exists, false otherwise
 */
export function  moduleExists(moduleName: string, module: Module[]) {
    return module.map(m => {
        if(m.moduleName === moduleName) {
            return true
        }

        return false
    })[0]
}
