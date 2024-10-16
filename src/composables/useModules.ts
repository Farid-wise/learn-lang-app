import { langAppApi } from "@/api/LangAppApi";
import type { LangAppAPIType, Module } from "@/types/app-api.types";
import { ref, onMounted, watch } from "vue";
import { useLS } from "./service/useLS";
import { useAppStore } from "@/stores/app";
import { uniqueObjects } from "@/utils/unique-modules";

export const useModules = () => {
  const { getSync } = useLS();
  const app = useAppStore()
  const source = ref<"localstorage" | "firebase">(
    (getSync("storage") as "localstorage" | "firebase") || "localstorage"
  );
  const word = ref<string>("hello");

  onMounted(async () => {
    if (source.value === "localstorage") {
      const data = await langAppApi.get<LangAppAPIType>({ source: source });
      if(data){
        data.module.forEach((module: Module) => {
         
         app.addModule(module)
        })
    
        
      }
    }
  
  });

 

  return {
    modules: app.modules,
    source,
    word,
  };
};
