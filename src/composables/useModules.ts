import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { ref, onMounted } from "vue";
import { useLS } from "./service/useLS";
import { useAppStore } from "@/stores/app";
import { useStatuses } from "./service/useStatuses";
import { delay } from "@/utils/delay";

/**
 * This function fetches modules from local storage or firebase and adds them to the app store.
 */
export const useModules = () => {
  const { get, exist} = useLS();
  const app = useAppStore()
  const {statuses, setLoading, resetStatus, setError, setSuccess} = useStatuses()
 
  onMounted(async () => {

    setError(null)
   
    setLoading()
 
  
    try {
      if (!exist('storage') || (await get<string>('storage')).match('localstorage')) {
        await delay(500)
        const data = await langAppApi.get<LangAppAPIType>({ source: 'localstorage' });
        
        if(data?.modules.length){
          await app.addModule(data?.modules);
          setSuccess()
          
        }
      }
      else {
        console.log('firebase');
        setSuccess()
      }
    } catch (error: any) {
      console.log(error);
      setError(error.message)
    }
    finally {

      await delay(500)
      resetStatus()
    }
    
  
  });

 

  return {
    statuses,

  }
 
};
