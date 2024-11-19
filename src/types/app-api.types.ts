export interface Dictionary {
  id: string;
  key: string;
  moduleName?: string;
  isDeleting?: boolean
  translate: string;
}

export interface Module {
  
  dic: Array<Dictionary>;
  moduleName: string;
  description: string;
  created_at: string | number;
  id: string;
  
}

export interface LangAppAPIType {
  modules: Array<Module>;
}

export interface LangAppAPITypeV2 {
  
  [key: string]: Array<Module>
  
}

export type LangAppAPITypeV3 = [LangAppAPITypeV2]


// const modules: LangAppAPITypeV2 = {
//   "122233": [
//     {
//       moduleName: "English",
//       dic: [],
//       description: "Изучение английского языка",
//       created_at: Date.now(),
//       id: crypto.randomUUID(),
//     }
//   ]
// }

// const key = "122233"
// export const getModule = (key: string) => modules[key]
// const modulesData = getModule(key)
