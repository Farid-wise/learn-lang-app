import { BaseAPI, type HandlersType, type OmitedHandlersType } from "./BaseApi";
import {
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { dbConnect } from "@/database/db-connect";
import { useAuthStore } from "@/stores/auth";
import { useLS } from "@/composables/service/useLS";

class LangAppAPI extends BaseAPI {
 
  async get<T = any>({ url, source }: OmitedHandlersType): Promise<T | null> {
    const { get, remove } = useLS();

    if (source.value === "localstorage") {

      try {
        return await get<T>("dict");
      } catch (error) {
        console.log(error);
      }
    } 
    else if (source.value === "firebase") {
      const backup = await get<T>("dict");
      console.log(backup);
      remove("dict");
      return null;
    }

    return Promise.resolve(null);
  }
   async create<T = any>({ url, data, source }: HandlersType<T>) {
    if (source.value === "localstorage") {
      const { set } = useLS();

      try {
        await set<T>("dict", data);
      }

      catch (error) {
        console.log(error);
      }
    }
  }
}

export const langAppApi = new LangAppAPI();