import { SPECIAL_CODES } from "./emoji";

const API_URL = "https://secure.geonames.org/search";
const USERNAME = "lexcast";

// England, Scotland and Wales come as GB with the nation in adminCode1.
const normalize = (r) =>
  r.countryCode === "GB" && SPECIAL_CODES.includes(r.adminCode1)
    ? { ...r, countryCode: r.adminCode1 }
    : r;

export const searchPlaces = async (q, signal) => {
  const params = new URLSearchParams({
    username: USERNAME,
    maxRows: 5,
    q,
    type: "json",
  });
  const response = await fetch(`${API_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`GeoNames request failed (${response.status})`);
  }

  const data = await response.json();

  // GeoNames reports errors (e.g. quota exceeded) with a 200 and a status body.
  if (data.status) {
    throw new Error(data.status.message);
  }

  return (data.geonames ?? []).map(normalize);
};
