import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { ref, onMounted } from "vue";
import { useLS } from "./service/useLS";
import { useAppStore } from "@/stores/app";

export const useModules = () => {
  const { get, set } = useLS();
  const app = useAppStore()
 
  onMounted(async () => {

  
    try {
      set<string>('storage', 'localstorage')
      if ((await get('storage')) === "localstorage") {
    
        const data = await langAppApi.get<LangAppAPIType>({ source: 'localstorage' });
        
        if(data){
          app.addModule(data.module);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
    
  
  });

 

 
};
