import { TimeDurations } from "common/enums/time-duration.enum";
import { useAsyncStorageCache } from "react-native/hooks/async-storage-cache.hook";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");

describe("useAsyncStorageCache", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set item in cache with expiration", async () => {
    const { setItem } = useAsyncStorageCache();
    const key = "test-key";
    const value = "test-value";
    const expiration = TimeDurations.FiveMinutes;

    await setItem(key, value, expiration);

    const calls = (AsyncStorage.setItem as jest.Mock).mock.calls[0];
    const cachedItem = JSON.parse(calls[1]);

    expect(calls[0]).toBe(key);
    expect(cachedItem.value).toBe(value);
    expect(typeof cachedItem.expireAt).toBe("number");
  });

  it("should get item from cache if not expired", async () => {
    const { getItem } = useAsyncStorageCache();
    const key = "test-key";
    const value = "test-value";
    const expireAt = Date.now() + TimeDurations.FiveMinutes;

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ value, expireAt })
    );

    const result = await getItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  it("should return null if item is expired", async () => {
    const { getItem } = useAsyncStorageCache();
    const key = "test-key";
    const value = "test-value";
    const expireAt = Date.now() - TimeDurations.FiveMinutes; // Already expired

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({ value, expireAt })
    );

    const result = await getItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });
});
