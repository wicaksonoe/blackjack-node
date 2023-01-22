export function getLocalStorage<T>(key: string): T | undefined {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue) as T;
    } else {
      return undefined;
    }
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
