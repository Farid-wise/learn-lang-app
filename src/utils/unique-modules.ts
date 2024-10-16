export function uniqueObjects(arr: any[]) {
    // Создаем пустой Set для хранения уникальных объектов
    const uniqueSet = new Set();
  
    // Функция для сериализации объектов
    const serialize = (obj: any) => JSON.stringify(obj);
  
    // Фильтруем массив, добавляя объекты в Set
    const uniqueArr = arr.filter((obj) => {
      const serialized = serialize(obj);
      const isUnique = !uniqueSet.has(serialized);
      if (isUnique) {
        uniqueSet.add(serialized);
      }
      return isUnique;
    });
  
    // Преобразуем сериализованные объекты обратно в исходные объекты
    return uniqueArr;
  }