import { useCallback } from "react";

export interface CachedData {
  timestamp: number;
  data: any;
}

export function useCache() {
  const getCachedData = useCallback(
    (key: string, expiration: number): CachedData | undefined => {
      const item = localStorage.getItem(key);
      if (!item) return undefined;

      const parsedItem: CachedData = JSON.parse(item);

      if (Date.now() - parsedItem.timestamp > expiration) {
        localStorage.removeItem(key);
        return undefined;
      }

      return parsedItem;
    },
    []
  );

  const setCachedData = useCallback((key: string, data: any): void => {
    const cachedData: CachedData = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(cachedData));
  }, []);

  return {
    getCachedData,
    setCachedData,
  };
}
