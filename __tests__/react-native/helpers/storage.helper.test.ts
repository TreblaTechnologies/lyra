import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  multiRemoveFromStorage,
} from "react-native/helpers/storage.helper";

jest.mock("@react-native-async-storage/async-storage");

describe("storage.helper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("setStorageItem sets an item in AsyncStorage", async () => {
    const key = "testKey";
    const value = "testValue";

    await setStorageItem(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  test("getStorageItem gets an item from AsyncStorage", async () => {
    const key = "testKey";
    const value = "testValue";

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(value);

    const result = await getStorageItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  test("removeStorageItem removes an item from AsyncStorage", async () => {
    const key = "testKey";

    await removeStorageItem(key);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test("multiRemoveFromStorage removes multiple items from AsyncStorage", async () => {
    const keys = ["testKey1", "testKey2"];

    await multiRemoveFromStorage(keys);

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith(keys);
  });
});
