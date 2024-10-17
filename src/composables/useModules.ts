import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { ref, onMounted } from "vue";
import { useLS } from "./service/useLS";
import { useAppStore } from "@/stores/app";

/**
 * This function fetches modules from local storage or firebase and adds them to the app store.
 */
export const useModules = () => {
  const { get, exist} = useLS();
  const app = useAppStore()
 
  onMounted(async () => {

  
    try {
      if (!exist('storage') || (await get<string>('storage')).match('localstorage')) {
    
        const data = await langAppApi.get<LangAppAPIType>({ source: 'localstorage' });
        
        if(data){
          app.addModule(data.module);
          
        }
      }
      else {
        console.log('firebase');
      }
    } catch (error) {
      console.log(error);
    }
    
  
  });

 

 
};
