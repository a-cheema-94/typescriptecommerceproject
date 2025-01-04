import { useState, useEffect } from "react"

function useLocalStorage<T> (defaultValue: T | (() => T), key: string)  {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);

    return storedValue !== null ?
      JSON.parse(storedValue) : 
      defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}

export default useLocalStorage