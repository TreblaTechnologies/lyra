import { renderHook, act } from "@testing-library/react-hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEntityLoader } from "react-native/hooks/entity-loader.hook";
import { TimeDurations } from "common/enums/time-duration.enum";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockFetchFunction = jest.fn();

describe("useEntityLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load data from cache if available", async () => {
    const cachedData = [{ id: 1, name: "test" }];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({
        value: cachedData,
        expireAt: Date.now() + TimeDurations.OneDay,
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useEntityLoader({
        fetchFunction: mockFetchFunction,
        cacheKey: "test-cache",
        cacheExpiration: TimeDurations.OneDay,
        labelField: "name",
        valueField: "id",
      })
    );

    await waitForNextUpdate();

    expect(result.current.items).toEqual(cachedData);
    expect(result.current.isLoading).toBe(false);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("test-cache");
  });

  it("should fetch data and set cache if no cached data", async () => {
    const fetchedData = [{ id: 1, name: "test" }];
    mockFetchFunction.mockResolvedValueOnce(fetchedData);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEntityLoader({
        fetchFunction: mockFetchFunction,
        cacheKey: "test-cache",
        cacheExpiration: TimeDurations.OneDay,
        labelField: "name",
        valueField: "id",
      })
    );

    await waitForNextUpdate();

    expect(result.current.items).toEqual(fetchedData);
    expect(result.current.isLoading).toBe(false);
    expect(mockFetchFunction).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
