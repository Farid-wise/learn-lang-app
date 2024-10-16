export interface Dictionary {
  id: string;
  [key: string]: string;
}

export interface Module {
  [key: string]: {
    dic: Array<Dictionary>;
    description: string;
    created_at: string | number;
    id: string;
  };
}

export interface LangAppAPIType {
  module: Array<Module>;
}

// const app: LangAppAPIType = {
//   module: [
//     {
//       "en-ru": {
//         dic: [
//           { id: "1", [word.value]: "Привет" },
//           { id: "2", world: "мир" },
//         ],
//         description: "Изучение английского языка",
//         created_at: Date.now(),
//         id: crypto.randomUUID(),
//       },
//       "ru-en": {
//         dic: [],
//         description: "Изучение русского языка",
//         created_at: Date.now(),
//         id: crypto.randomUUID(),
//       },
//     },
//   ]
// };


