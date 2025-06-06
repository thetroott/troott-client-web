import type { IStorage } from "./interface.util";

const keep = (key: string, data: any | string) => {
  let result: string = "";

  if (typeof data == "object") {
    result = JSON.stringify(data);
  } else {
    result = data;
  }

  localStorage.setItem(key, result);
};

const fetch = (key: string): string | null => {
  const data = localStorage.getItem(key);
  return data ? data : null;
};

const getJSON = async (key: string): Promise<any | null> => {
  const data = await fetch(key);
  return data ? JSON.parse(data) : null;
};

const exists = async (key: string): Promise<boolean> => {
  const value = localStorage.getItem(key);
  return value !== null;
};

const update = async (key: string, newData: object | string): Promise<void> => {
  const existingData = await fetch(key);
  if (existingData) {
    const parsedData =
      typeof existingData === "string"
        ? JSON.parse(existingData)
        : existingData;
    const updatedData =
      typeof newData === "object" ? { ...parsedData, ...newData } : newData;
    await keep(key, updatedData);
  }
};

const merge = async (key: string, newData: object): Promise<void> => {
  const existingData = await getJSON(key);
  if (existingData) {
    const mergedData = { ...existingData, ...newData };
    await keep(key, mergedData);
  }
};

const remove = async (key: string): Promise<void> => {
  localStorage.removeItem(key);
};

const clearAll = async (): Promise<void> => {
  localStorage.clear();
};

const multiKeep = async (
  items: { key: string; data: object | string }[]
): Promise<void> => {
  items.forEach(({ key, data }) => {
    const value = typeof data === "object" ? JSON.stringify(data) : data;
    localStorage.setItem(key, value);
  });
};

const multiFetch = async (
  keys: string[]
): Promise<{ [key: string]: any | null }> => {
  const result: { [key: string]: any | null } = {};
  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    result[key] = value ? JSON.parse(value) : null;
  });
  return result;
};

const multiRemove = async (keys: string[]): Promise<void> => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const storage: IStorage = {
  keepData: keep,
  fetchData: fetch,
  getJSON,
  exists,
  updateData: update,
  mergeData: merge,
  removeData: remove,
  clearAll,
  multiKeep,
  multiFetch,
  multiRemove,
};

export default storage;
