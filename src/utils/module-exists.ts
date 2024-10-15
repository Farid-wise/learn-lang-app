import type { Module } from "@/types/app-api.types";

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
