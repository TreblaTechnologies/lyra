import { renderHook } from "@testing-library/react-hooks";
import { useCache, CachedData } from "../../hooks/cache.hook";
import { TimeDurations } from "../../enums/time-duration.enum";

describe("useCache Hook", () => {
  const cacheKey = "test-key";
  const data = [{ id: 1, name: "Item 1" }];

  beforeEach(() => {
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value;
        }),
        clear: jest.fn(() => {
          store = {};
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
      };
    })();
    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  it("should cache data correctly", () => {
    const { result } = renderHook(() => useCache());

    result.current.setCachedData(cacheKey, data);

    const [key, value] = (global.localStorage.setItem as jest.Mock).mock
      .calls[0];
    const parsedValue = JSON.parse(value);

    expect(key).toBe(cacheKey);
    expect(parsedValue.data).toEqual(data);
    expect(parsedValue.timestamp).toBeCloseTo(Date.now(), -2);
  });

  it("should retrieve cached data correctly", () => {
    const cachedData: CachedData = { timestamp: Date.now(), data };
    (global.localStorage.getItem as jest.Mock).mockReturnValueOnce(
      JSON.stringify(cachedData)
    );

    const { result } = renderHook(() => useCache());

    const retrievedData = result.current.getCachedData(
      cacheKey,
      TimeDurations.OneDay
    );

    expect(retrievedData).toEqual(cachedData);
    expect(global.localStorage.getItem).toHaveBeenCalledWith(cacheKey);
  });

  it("should return undefined if cache is expired", () => {
    const cachedData: CachedData = {
      timestamp: Date.now() - TimeDurations.OneDay * 2,
      data,
    };
    (global.localStorage.getItem as jest.Mock).mockReturnValueOnce(
      JSON.stringify(cachedData)
    );

    const { result } = renderHook(() => useCache());

    const retrievedData = result.current.getCachedData(
      cacheKey,
      TimeDurations.OneDay
    );

    expect(retrievedData).toBeUndefined();
  });

  it("should return undefined if no cache exists", () => {
    (global.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

    const { result } = renderHook(() => useCache());

    const retrievedData = result.current.getCachedData(
      cacheKey,
      TimeDurations.OneDay
    );

    expect(retrievedData).toBeUndefined();
  });
});
