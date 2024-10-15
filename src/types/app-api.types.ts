export interface Dictionary {
  id: string;
  [key: string]: string;
}

export interface Module {
  
  [key: string]: {
    dic: Array<Dictionary>;
    description: string;
    created_at: string | number;
  };
}

export interface LangAppAPIType {
  module: Array<Module>;
}

// const app: AppAPI = {
//     module: [
//         {
//             "en-ru": {
//                 dic: [{id: "1", en: "hello", ru: "привет"}, {id: "2", en: "world", ru: "мир"}]
//             }
//         }
//     ]
// }
