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

/*
  Here is a succinct explanation of the LangAppAPI class definition:

 Class Overview: LangAppAPI extends BaseAPI and provides two methods for interacting with data storage: get and create.

 Method Explanations:

  get<T = any>({ url, source }: OmitedHandlersType): Promise<T | null>:
  Retrieves data from either local storage or Firebase, depending on the source parameter.
  Returns the retrieved data as a promise, or null if the data is not found.
  create<T = any>({ url, data, source }: HandlersType<T>):
  Creates new data in either local storage or Firebase, depending on the source parameter.
  Stores the provided data in the specified storage location.
  Note that the url parameter is not used in either method, and the source parameter is used to determine the storage location.

*/

class LangAppAPI extends BaseAPI {
  async get<T = any>({ url, source }: OmitedHandlersType): Promise<T | null> {
    const { get, remove } = useLS();
    if (typeof source === "string") {


      switch (source) {
        case "localstorage": {
          try {
            return await get<T>("dict");
          } catch (error) {
            console.log(error);
          }
          break;
        }
        case "firebase": {
          const backup = await get<T>("dict");
          remove("dict");
          return null;
        }
      }
    } 
    
    else {
      if (source.value === "localstorage") {
        try {
          return await get<T>("dict");
        } catch (error) {
          console.log(error);
        }
      } else if (source.value === "firebase") {
        const backup = await get<T>("dict");
        remove("dict");
        return null;
      }
    }
    return Promise.resolve(null);
  }
  async create<T = any>({ url, data, source }: HandlersType<T>) {
    if (typeof source === "string") {
      if (source === "localstorage") {
        const { set } = useLS();

        try {
          await set<T>("dict", data);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if (source.value === "localstorage") {
        const { set } = useLS();

        try {
          await set<T>("dict", data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
}

export const langAppApi = new LangAppAPI();
