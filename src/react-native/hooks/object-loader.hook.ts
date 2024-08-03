import { TimeDurations } from "common/enums/time-duration.enum";
import { useEffect, useState } from "react";
import { useAsyncStorageCache } from "./async-storage-cache.hook";

export type ObjectFetchFunction<T> = () => Promise<T>;

export interface UseObjectLoaderProps<T> {
  fetchFunction: ObjectFetchFunction<T>;
  cacheKey: string;
  cacheExpiration: TimeDurations;
}

export function useObjectLoader<T extends Record<string, any>>({
  fetchFunction,
  cacheKey,
  cacheExpiration = TimeDurations.OneDay,
}: UseObjectLoaderProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [item, setItem] = useState<T | null>(null);

  const { getItem: getCachedData, setItem: setCachedData } =
    useAsyncStorageCache<T>();

  useEffect(() => {
    async function bootstrapAsync() {
      let loadedItem: T | null = null;

      try {
        setIsLoading(true);
        const cachedData: T | null = await getCachedData(cacheKey);

        if (cachedData) {
          loadedItem = cachedData;
        } else {
          loadedItem = await fetchFunction();

          setCachedData(cacheKey, loadedItem, cacheExpiration);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setItem(loadedItem);
      }
    }

    bootstrapAsync();
  }, [fetchFunction, cacheKey, cacheExpiration]);

  return {
    item,
    isLoading,
  };
}
