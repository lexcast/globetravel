import { describe, expect, it } from "vitest";
import { deriveCountries, hasTravel, parseImport, withUKFlag } from "./data";

const city = (geonameId, countryCode) => ({
  geonameId,
  name: `City ${geonameId}`,
  countryCode,
  adminName1: "",
  lat: "0",
  lng: "0",
});

const travel = (id, type, start, end) => ({ id, type, start, end });

describe("deriveCountries", () => {
  it("collects unique countries from cities and both ends of travels", () => {
    const cities = [city(1, "MX"), city(2, "MX")];
    const travels = [travel("a", "flight", city(3, "US"), city(4, "JP"))];

    expect(deriveCountries(cities, travels)).toEqual(["MX", "US", "JP"]);
  });

  it("drops a country once nothing references it", () => {
    const travels = [travel("a", "bus", city(1, "MX"), city(2, "GT"))];

    expect(deriveCountries([], travels)).toEqual(["MX", "GT"]);
    expect(deriveCountries([], [])).toEqual([]);
  });

  it("ignores places without a country code", () => {
    expect(deriveCountries([city(1, undefined)], [])).toEqual([]);
  });
});

describe("withUKFlag", () => {
  it("inserts GB before the first UK nation", () => {
    expect(withUKFlag(["MX", "SCT", "ENG"])).toEqual(["MX", "GB", "SCT", "ENG"]);
  });

  it("does nothing when GB is already there or there are no UK nations", () => {
    expect(withUKFlag(["GB", "ENG"])).toEqual(["GB", "ENG"]);
    expect(withUKFlag(["MX"])).toEqual(["MX"]);
  });
});

describe("hasTravel", () => {
  const travels = [travel("a", "flight", city(1, "MX"), city(2, "US"))];

  it("matches same type and direction only", () => {
    expect(hasTravel(travels, "flight", city(1), city(2))).toBe(true);
    expect(hasTravel(travels, "bus", city(1), city(2))).toBe(false);
    expect(hasTravel(travels, "flight", city(2), city(1))).toBe(false);
  });
});

describe("parseImport", () => {
  it("parses a valid export and strips unknown fields", () => {
    const text = JSON.stringify({
      cities: [{ ...city(1, "MX"), population: 100 }],
      travels: [travel("a", "flight", city(1, "MX"), city(2, "US"))],
      countries: ["MX", "US"],
    });

    const { cities, travels } = parseImport(text);
    expect(cities).toEqual([city(1, "MX")]);
    expect(travels).toEqual([
      travel("a", "flight", city(1, "MX"), city(2, "US")),
    ]);
  });

  it("dedupes cities and gives duplicated travel ids a new id", () => {
    const t = travel("a", "flight", city(1, "MX"), city(2, "US"));
    const { cities, travels } = parseImport(
      JSON.stringify({ cities: [city(1, "MX"), city(1, "MX")], travels: [t, t] })
    );

    expect(cities).toHaveLength(1);
    expect(travels).toHaveLength(2);
    expect(travels[0].id).toBe("a");
    expect(travels[1].id).not.toBe("a");
  });

  it("rejects invalid files", () => {
    expect(() => parseImport("not json")).toThrow(/not valid JSON/);
    expect(() => parseImport("{}")).toThrow(/Globetravel export/);
    expect(() =>
      parseImport(JSON.stringify({ cities: [{ name: "x" }], travels: [] }))
    ).toThrow(/invalid cities/);
    expect(() =>
      parseImport(
        JSON.stringify({
          cities: [],
          travels: [travel("a", "rocket", city(1), city(2))],
        })
      )
    ).toThrow(/invalid travels/);
  });
});
