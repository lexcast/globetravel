import { CatmullRomCurve3, Vector3 } from "three";
import { geoDistance, geoInterpolate } from "d3";
import mapUrl from '../assets/map.png'

const RADIUS = 80;

const visibilityForCoordinate = (t, e, n) => {
  const i = 4 * n.width,
    r = parseInt(((t + 180) / 360) * n.width + 0.5),
    s = n.height - parseInt(((e + 90) / 180) * n.height - 0.5),
    o = parseInt(i * (s - 1) + 4 * r) + 3;
  return n.data[o] > 90;
};

const getImageData = (t) => {
  const e = document.createElement("canvas").getContext("2d");
  return (
    (e.canvas.width = t.width),
    (e.canvas.height = t.height),
    e.drawImage(t, 0, 0, t.width, t.height),
    e.getImageData(0, 0, t.width, t.height)
  );
};

const loadMap = () =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = mapUrl;
  });

const polar2Cartesian = (lat, lng, rad = RADIUS, relAltitude = 0) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lng) * Math.PI) / 180;
  const r = rad * (1 + relAltitude);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
};

const toVector = (lat, lng, rad, relAltitude = 0) => {
  const c = polar2Cartesian(lat, lng, rad, relAltitude);
  return new Vector3(c.x, c.y, c.z);
};

// Sample spacing along the great circle; small enough that the straight
// segments between samples never cut below the surface.
const STEP = (2 * Math.PI) / 180;

// Curve following the great circle between two places, at a height above the
// surface given by `altitude(t)` for t in [0, 1].
const greatCircleCurve = (start, end, altitude) => {
  const from = [Number(start.lng), Number(start.lat)];
  const to = [Number(end.lng), Number(end.lat)];
  const angle = geoDistance(from, to);
  const interpolate = geoInterpolate(from, to);
  const segments = Math.max(2, Math.ceil(angle / STEP));

  const points = Array.from({ length: segments + 1 }, (_, i) => {
    const t = i / segments;
    const [lng, lat] = interpolate(t);
    return toVector(lat, lng, RADIUS + altitude(t, angle));
  });

  return new CatmullRomCurve3(points);
};

const date = new Date();
const timeZoneOffset = date.getTimezoneOffset() || 0;
const timeZoneMaxOffset = 60 * 12;
const ROTATION = [0, Math.PI * (timeZoneOffset / timeZoneMaxOffset), 0];

export {
  RADIUS,
  visibilityForCoordinate,
  getImageData,
  loadMap,
  polar2Cartesian,
  toVector,
  greatCircleCurve,
  ROTATION,
};
