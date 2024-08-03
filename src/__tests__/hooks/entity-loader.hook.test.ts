import { renderHook, act } from "@testing-library/react-hooks";
import { AxiosResponse } from "axios";
import { TimeDurations } from "../../enums/time-duration.enum";
import { CachedData, useCache } from "../../hooks/cache.hook";
import { FetchFunction, useEntityLoader } from "../../hooks/entity-loader.hook";

jest.mock("../../hooks/cache.hook");

describe("useEntityLoader Hook", () => {
  const originalError = console.error;

  beforeEach(() => {
    // Mock console.error to suppress error logs
    console.error = jest.fn();
  });

  afterEach(() => {
    // Restore original console.error after each test
    console.error = originalError;
    jest.clearAllMocks();
  });

  const cacheKey = "test-key";
  const data = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];
  const fetchFunction: jest.MockedFunction<
    FetchFunction<{ id: number; name: string }>
  > = jest.fn().mockResolvedValue({
    status: 200,
    data,
  } as AxiosResponse<{ id: number; name: string }[]>);

  let getCachedData: jest.Mock;
  let setCachedData: jest.Mock;

  beforeAll(() => {
    getCachedData = jest.fn();
    setCachedData = jest.fn();

    (useCache as jest.Mock).mockReturnValue({
      getCachedData,
      setCachedData,
    });
  });

  it("should load data from fetch function if cache is not available", async () => {
    getCachedData.mockReturnValueOnce(undefined);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEntityLoader<{ id: number; name: string }>({
        fetchFunction,
        cacheKey,
        labelField: "name",
        valueField: "id",
        cacheExpiration: TimeDurations.OneDay,
      })
    );

    await waitForNextUpdate({ timeout: 10000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.items).toEqual([
      { label: "Item 1", value: 1 },
      { label: "Item 2", value: 2 },
    ]);

    expect(fetchFunction).toHaveBeenCalled();
    expect(setCachedData).toHaveBeenCalledWith(cacheKey, data);
  }, 15000);

  it("should handle fetch function errors gracefully", async () => {
    getCachedData.mockReturnValueOnce(undefined);
    fetchFunction.mockRejectedValueOnce(new Error("Fetch error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useEntityLoader<{ id: number; name: string }>({
        fetchFunction,
        cacheKey,
        labelField: "name",
        valueField: "id",
        cacheExpiration: TimeDurations.OneDay,
      })
    );

    await waitForNextUpdate({ timeout: 10000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.items).toEqual([]);

    expect(fetchFunction).toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
  }, 15000);

  it("should update items when cacheKey changes", async () => {
    const newCacheKey = "new-test-key";
    const newData = [{ id: 3, name: "Item 3" }];

    getCachedData.mockReturnValueOnce(undefined);

    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ fetchFunction, cacheKey }) =>
        useEntityLoader<{ id: number; name: string }>({
          fetchFunction,
          cacheKey,
          labelField: "name",
          valueField: "id",
          cacheExpiration: TimeDurations.OneDay,
        }),
      {
        initialProps: { fetchFunction, cacheKey },
      }
    );

    await waitForNextUpdate({ timeout: 10000 });

    fetchFunction.mockResolvedValueOnce({
      status: 200,
      data: newData,
    } as AxiosResponse<{ id: number; name: string }[]>);

    rerender({ fetchFunction, cacheKey: newCacheKey });

    await waitForNextUpdate({ timeout: 10000 });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.items).toEqual([{ label: "Item 3", value: 3 }]);

    expect(fetchFunction).toHaveBeenCalled();
    expect(setCachedData).toHaveBeenCalledWith(newCacheKey, newData);
  }, 15000);
});
