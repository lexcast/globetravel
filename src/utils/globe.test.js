import { describe, expect, it } from "vitest";
import { greatCircleCurve, RADIUS } from "./globe";

const singapore = { lat: "1.28967", lng: "103.85007" };
const losAngeles = { lat: "34.05223", lng: "-118.24368" };

describe("greatCircleCurve", () => {
  it("never dips below the surface on long routes", () => {
    const curve = greatCircleCurve(singapore, losAngeles, () => 0.4);
    const radii = curve.getPoints(1000).map((p) => p.length());

    expect(Math.min(...radii)).toBeGreaterThan(RADIUS + 0.35);
  });

  it("follows the altitude profile", () => {
    const lift = (t) => 10 * Math.sin(Math.PI * t);
    const curve = greatCircleCurve(singapore, losAngeles, lift);

    expect(curve.getPoint(0).length()).toBeCloseTo(RADIUS, 5);
    expect(curve.getPoint(0.5).length()).toBeCloseTo(RADIUS + 10, 0);
  });
});
