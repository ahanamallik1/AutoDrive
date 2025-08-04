"use client";

import { useEffect, useState } from "react";

// A custom hook that debounces a value over a specified delay.
export const useDebounceSearch = (value: string, delay: number) => {
  const [debounced, setDebounced] = useState<string>("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
