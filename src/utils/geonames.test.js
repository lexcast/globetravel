import { afterEach, describe, expect, it, vi } from "vitest";
import { searchPlaces } from "./geonames";

const mockFetch = (body, ok = true) =>
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 500, json: async () => body })
  );

afterEach(() => vi.unstubAllGlobals());

describe("searchPlaces", () => {
  it("maps England, Scotland and Wales to their own codes", async () => {
    mockFetch({
      geonames: [
        { geonameId: 1, countryCode: "GB", adminCode1: "ENG" },
        { geonameId: 2, countryCode: "GB", adminCode1: "NIR" },
        { geonameId: 3, countryCode: "MX", adminCode1: "09" },
      ],
    });

    const results = await searchPlaces("london");
    expect(results.map((r) => r.countryCode)).toEqual(["ENG", "GB", "MX"]);
    expect(fetch.mock.calls[0][0]).toContain("q=london");
  });

  it("throws on GeoNames error responses", async () => {
    mockFetch({ status: { message: "daily limit exceeded", value: 18 } });
    await expect(searchPlaces("x")).rejects.toThrow("daily limit exceeded");

    mockFetch({}, false);
    await expect(searchPlaces("x")).rejects.toThrow("500");
  });

  it("returns an empty list when there are no results", async () => {
    mockFetch({ totalResultsCount: 0 });
    await expect(searchPlaces("zzz")).resolves.toEqual([]);
  });
});
