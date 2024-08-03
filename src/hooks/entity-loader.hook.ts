import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { EntityItem } from "../entities/entity-item.entity";
import { TimeDurations } from "../enums/time-duration.enum";
import { CachedData, useCache } from "./cache.hook";

export type FetchFunction<T> = () => Promise<AxiosResponse<T[]>>;

export interface UseEntityLoaderProps<T> {
  fetchFunction: FetchFunction<T>;
  cacheKey: string;
  cacheExpiration?: number;
  labelField: keyof T;
  valueField: keyof T;
}

export function useEntityLoader<T extends Record<string, any>>({
  fetchFunction,
  cacheKey,
  cacheExpiration = TimeDurations.OneDay,
  labelField,
  valueField,
}: UseEntityLoaderProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [items, setItems] = useState<EntityItem[]>([]);

  const { getCachedData, setCachedData } = useCache();

  useEffect(() => {
    async function bootstrapAsync() {
      let loadedItems: T[] = [];

      try {
        setIsLoading(true);

        const cachedData: CachedData | undefined = getCachedData(
          cacheKey,
          cacheExpiration
        );

        if (cachedData) {
          loadedItems = cachedData.data as T[];
        } else {
          const response = await fetchFunction();

          if (response.status === HttpStatusCode.Ok) {
            loadedItems = response.data;

            setCachedData(cacheKey, loadedItems);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setItems(
          loadedItems.map((item) => ({
            value: item[valueField],
            label: item[labelField],
          }))
        );
      }
    }

    bootstrapAsync();
  }, [
    fetchFunction,
    cacheKey,
    cacheExpiration,
    getCachedData,
    setCachedData,
    labelField,
    valueField,
  ]);

  return {
    items,
    isLoading,
  };
}
