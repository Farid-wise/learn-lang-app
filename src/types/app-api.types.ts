export interface Dictionary {
  id: string;
  key: string;
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

// const app: LangAppAPIType = {
//   module: [
//     {
//       "en-ru": {
//         dic: [
//           { id: "1", f: "Привет" },
//           { id: "2", world: "мир" },
//         ],
//         description: "Изучение английского языка",
//         created_at: Date.now(),
//         id: crypto.randomUUID(),
//         moduleName: "English",
//       },
//       "ru-en": {
//         dic: [],
//         description: "Изучение русского языка",
//         created_at: Date.now(),
//         moduleName: "Russian",
//         id: crypto.randomUUID(),
//       },
//     },
//   ]
// };

