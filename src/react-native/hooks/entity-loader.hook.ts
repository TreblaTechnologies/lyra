import { TimeDurations } from "common/enums/time-duration.enum";
import { useEffect, useState } from "react";
import { useAsyncStorageCache } from "./async-storage-cache.hook";

type FetchFunction<T> = () => Promise<T[]>;

export interface UseEntityLoaderProps<T> {
  fetchFunction: FetchFunction<T>;
  cacheKey: string;
  cacheExpiration: TimeDurations;
  labelField: string;
  valueField: string;
}

export function useEntityLoader<T extends Record<string, any>>({
  fetchFunction,
  cacheKey,
  cacheExpiration = TimeDurations.OneDay,
}: UseEntityLoaderProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<T[]>([]);

  const { getItem: getCachedData, setItem: setCachedData } =
    useAsyncStorageCache<T[]>();

  useEffect(() => {
    async function bootstrapAsync() {
      let loadedItems: T[] = [];

      try {
        setIsLoading(true);
        const cachedData: T[] | null = await getCachedData(cacheKey);

        if (cachedData) {
          loadedItems = cachedData;
        } else {
          loadedItems = await fetchFunction();

          setCachedData(cacheKey, loadedItems, cacheExpiration);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setItems(loadedItems);
      }
    }

    bootstrapAsync();
  }, [fetchFunction, cacheKey, cacheExpiration]);

  return {
    items,
    isLoading,
  };
}
