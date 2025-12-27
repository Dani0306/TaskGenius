"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = useCallback(
    ({ type, value }: { type: string; value: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = searchParams.get(type) ?? "";

      // if nothing changed, do nothing
      if (current === value) return;

      if (!value) {
        // empty value → remove param instead of setting ?name=
        params.delete(type);
      } else {
        params.set(type, value);
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      router.push(url);
    },
    [router, pathname, searchParams]
  );

  const hasFilter = useCallback(
    ({ type, value }: { type: string; value: string }) =>
      searchParams.get(type) === value,
    [searchParams]
  );

  const clearFilter = useCallback(
    ({ type }: { type: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(type);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.push(url);
    },
    [router, pathname, searchParams]
  );

  const clearAll = useCallback(() => {
    router.replace(pathname);
  }, [router, pathname]);

  const getAll = useCallback(() => {
    const allParams = Object.fromEntries(searchParams.entries());
    return allParams;
  }, [searchParams]);

  return {
    handleFilter,
    hasFilter,
    clearFilter,
    clearAll,
    getAll,
  };
}
