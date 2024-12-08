import { useState, useEffect } from "react";
import { parseStr } from "../utils/utils";

export enum StorageType {
  LOCAL = "local",
  SESSION = "session",
}

function useStorage<T>(
  key: string,
  initialValue: T,
  storage: StorageType = StorageType.LOCAL
) {
  const currentStorage =
    storage === StorageType.LOCAL ? localStorage : sessionStorage;
  const getStoredValue = () => {
    const saved = currentStorage.getItem(key);
    if (saved !== null) {
      return parseStr<T>(saved);
    } else {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(() => getStoredValue());

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? parseStr<T>(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);

    currentStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
}

export default useStorage;
