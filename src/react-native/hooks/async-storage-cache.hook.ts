import { TimeDurations } from "common/enums/time-duration.enum";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../helpers/storage.helper";

export type CacheItemProps<T> = {
  value: T;
  expireAt: number;
};

export const useAsyncStorageCache = <T>() => {
  const setItem = async (
    key: string,
    value: T,
    ttl: TimeDurations = TimeDurations.FiveMinutes
  ) => {
    const expireAt = Date.now() + ttl;
    const item = JSON.stringify({ value, expireAt });

    await setStorageItem(key, item);
  };

  const getItem = async (key: string): Promise<T | null> => {
    const itemString = await getStorageItem(key);

    if (!itemString) return null;

    const item: CacheItemProps<T> = JSON.parse(itemString);

    if (Date.now() > item.expireAt) {
      await removeStorageItem(key);

      return null;
    }

    return item.value;
  };

  return {
    setItem,
    getItem,
  };
};
