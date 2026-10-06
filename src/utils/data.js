import { SPECIAL_CODES } from "./emoji";
import TRAVEL_TYPES from "./travelTypes";

const UK_CODE = "GB";

export const pickCity = ({ geonameId, name, countryCode, adminName1, lat, lng }) => ({
  geonameId,
  name,
  countryCode,
  adminName1,
  lat,
  lng,
});

export const hasCity = (cities, city) =>
  cities.some((c) => c.geonameId === city.geonameId);

export const hasTravel = (travels, type, start, end) =>
  travels.some(
    (t) =>
      t.type === type &&
      t.start.geonameId === start.geonameId &&
      t.end.geonameId === end.geonameId
  );

export const createTravel = (type, start, end) => ({
  id: crypto.randomUUID(),
  type,
  start: pickCity(start),
  end: pickCity(end),
});

// Visited countries, in order of appearance, derived from cities and travels.
export const deriveCountries = (cities, travels) => {
  const codes = [
    ...cities.map((c) => c.countryCode),
    ...travels.flatMap((t) => [t.start.countryCode, t.end.countryCode]),
  ].filter(Boolean);

  return Array.from(new Set(codes));
};

// Adds the UK flag next to England/Scotland/Wales when it isn't there already.
export const withUKFlag = (countries) => {
  const result = [...countries];
  const firstUKIndex = result.findIndex((c) => SPECIAL_CODES.includes(c));

  if (firstUKIndex !== -1 && !result.includes(UK_CODE)) {
    result.splice(firstUKIndex, 0, UK_CODE);
  }

  return result;
};

const isCity = (c) =>
  !!c && c.geonameId != null && !!c.name && c.lat != null && c.lng != null;

// Parses and validates an exported globetravel.json file.
export const parseImport = (text) => {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("The file is not valid JSON.");
  }

  if (!data || !Array.isArray(data.cities) || !Array.isArray(data.travels)) {
    throw new Error("The file doesn't look like a Globetravel export.");
  }

  if (!data.cities.every(isCity)) {
    throw new Error("The file contains invalid cities.");
  }

  const validTravel = (t) =>
    !!t && t.type in TRAVEL_TYPES && isCity(t.start) && isCity(t.end);

  if (!data.travels.every(validTravel)) {
    throw new Error("The file contains invalid travels.");
  }

  const cities = data.cities
    .filter((c, i, all) => all.findIndex((o) => o.geonameId === c.geonameId) === i)
    .map(pickCity);

  const ids = new Set();
  const travels = data.travels.map((t) => {
    const id = t.id && !ids.has(t.id) ? t.id : crypto.randomUUID();
    ids.add(id);
    return { id, type: t.type, start: pickCity(t.start), end: pickCity(t.end) };
  });

  return { cities, travels };
};
