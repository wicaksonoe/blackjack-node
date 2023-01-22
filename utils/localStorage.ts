export function getLocalStorage<T>(key: string): T | undefined {
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    return JSON.parse(storedValue) as T;
  } else {
    return undefined;
  }
}

export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
