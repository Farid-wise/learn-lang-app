import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPITypeV2, LangAppAPITypeV3 } from "@/types/app-api.types";
import { onMounted } from "vue";
import { useLS } from "./service/useLS";
import { useAppStore } from "@/stores/app";
import { useStatuses } from "./service/useStatuses";
import { delay } from "@/utils/delay";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { API_URL } from "@/api/config/config";

/**
 * This function fetches modules from local storage or firebase and adds them to the app store.
 */
export const useModules = () => {
  const { get, exist} = useLS();
  const app = useAppStore()
  const {userId} = storeToRefs(useAuthStore())
  const {statuses, setLoading, resetStatus, setError, setSuccess} = useStatuses()

  
 
  onMounted(async () => {
   
    setLoading()
 
  
    try {
      if (!exist('storage') || (await get<string>('storage')).match('localstorage')) {
      
        const data = await langAppApi.get<LangAppAPITypeV2>({ source: 'localstorage' });
        
        if(data){
         
          if(data[userId.value]?.length){
            await app.addModule(userId, data[userId.value]);
            await delay(1000)
            setSuccess()
            
          }
          else {
      
            await app.addModule(userId.value, [])
          
          }
        }
       
       
      }
      else {
        console.log('Cloud storage inited...')
        const data = await langAppApi.get<LangAppAPITypeV3>({
          source: 'cloud',
          url: API_URL.value
        })
        
        if(data){
        
          await app.addModule(userId, data[userId.value])
          await delay(1000)
          setSuccess()
        }
        else {

          await app.addModule(userId.value, [])
        }
       
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message)
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
