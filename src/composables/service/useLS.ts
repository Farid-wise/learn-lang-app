/**
 * A composable function that provides basic methods to interact with the local storage.
 *
 * It provides the following methods:
 *  - `set`: Set a value in the local storage by key.
 *  - `remove`: Remove a value from the local storage by key.
 *  - `get`: Get a value from the local storage by key.
 *  - `empty`: Check if a value in the local storage by key is empty.
 *  - `exist`: Check if a key exists in the local storage.
 *
 * @return {Object} Object containing the methods above.
 /** */
export const useLS = () => {
  const ls = window.localStorage;

  const set = async <T = any>(key: string, value: T | undefined) => {
    return new Promise((res, rej) => {
      ls.setItem(key, JSON.stringify(value));
      res(value);
    });
  };

  const append = async <T = any>(data: T[], value: any) => {
    return new Promise((res, rej) => {
      
        if (Array.isArray(data)) {
          data.push(value);
          ls.setItem("dict", JSON.stringify(data));
          res(data);
        }
      
    });
  };

  const remove = (key: string) => {
    ls.removeItem(key);
  };

  const get = async <T = any>(key: string): Promise<T> => {
    return new Promise((res, rej) => {
      const item = ls.getItem(key);
      if (item) {
        res(JSON.parse(item) as T);
      } else {
        rej(null);
      }
    });
  };

  const getSync = <T = any>(key: string): T => {
    const item = ls.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    } else {
      return null as T;
    }
  }

  const empty = (prop: any) => {
    if (!Object.keys(JSON.parse(ls[prop])).length) {
      return true;
    } else {
      return false;
    }
  };

  const exist = (key: string) => {
    if (key in ls) {
      return true;
    } else {
      return false;
    }
  };

  return {
    set,
    remove,
    empty,
    get,
    ls,
    getSync,
    append,
    exist,
  };
};
