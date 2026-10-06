import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import { searchPlaces } from "../utils/geonames";

vi.mock("../utils/geonames", () => ({ searchPlaces: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

const type = (value) =>
  fireEvent.change(screen.getByLabelText("Search a place"), {
    target: { value },
  });

describe("Search", () => {
  it("shows a loading state and then selectable results", async () => {
    searchPlaces.mockResolvedValue([
      { geonameId: 1, name: "Mexico City", countryCode: "MX", adminName1: "CDMX" },
    ]);
    const onSelect = vi.fn();
    render(<Search onSelect={onSelect} />);

    type("mexico");
    expect(screen.getByText("Searching…")).toBeTruthy();

    fireEvent.click(await screen.findByText("Mexico City"));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ geonameId: 1 })
    );
    expect(screen.getByLabelText("Search a place").value).toBe("");
    expect(searchPlaces).toHaveBeenCalledTimes(1);
  });

  it("shows an empty state", async () => {
    searchPlaces.mockResolvedValue([]);
    render(<Search onSelect={() => {}} />);

    type("zzzz");
    expect(await screen.findByText("No places found.")).toBeTruthy();
  });

  it("shows an error state", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    searchPlaces.mockRejectedValue(new Error("boom"));
    render(<Search onSelect={() => {}} />);

    type("paris");
    expect(await screen.findByText(/not available/)).toBeTruthy();
  });

  it("does not search for a single character", async () => {
    render(<Search onSelect={() => {}} />);

    type("a");
    await new Promise((r) => setTimeout(r, 350));
    expect(searchPlaces).not.toHaveBeenCalled();
  });
});
