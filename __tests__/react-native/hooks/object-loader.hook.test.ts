import { renderHook, act } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useObjectLoader } from "react-native/hooks/object-loader.hook";
import { TimeDurations } from "common/enums/time-duration.enum";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockFetchObjectFunction = jest.fn();

describe("useObjectLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load object from cache if available", async () => {
    const cachedObject = { id: 1, name: "test" };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        value: cachedObject,
        expireAt: Date.now() + TimeDurations.OneDay,
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useObjectLoader({
        fetchFunction: mockFetchObjectFunction,
        cacheKey: "test-cache-object",
        cacheExpiration: TimeDurations.OneDay,
      })
    );

    await waitForNextUpdate();

    expect(result.current.item).toEqual(cachedObject);
    expect(result.current.isLoading).toBe(false);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("test-cache-object");
  });

  it("should fetch object and set cache if no cached object", async () => {
    const fetchedObject = { id: 1, name: "test" };
    mockFetchObjectFunction.mockResolvedValueOnce(fetchedObject);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result, waitForNextUpdate } = renderHook(() =>
      useObjectLoader({
        fetchFunction: mockFetchObjectFunction,
        cacheKey: "test-cache-object",
        cacheExpiration: TimeDurations.OneDay,
      })
    );

    await waitForNextUpdate();

    expect(result.current.item).toEqual(fetchedObject);
    expect(result.current.isLoading).toBe(false);
    expect(mockFetchObjectFunction).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
