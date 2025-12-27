"use client";

import { normalize } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useDebounce(delay: number = 300) {
  const [query, setQuery] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  const value = normalize(debouncedValue).trim();

  return { query, setQuery, value };
}
