import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("useLocalStorage", () => {
  it("returns the initial value and persists it", () => {
    const { result } = renderHook(() => useLocalStorage("key", [1]));

    expect(result.current[0]).toEqual([1]);
    expect(JSON.parse(localStorage.getItem("key"))).toEqual([1]);
  });

  it("reads an existing value", () => {
    localStorage.setItem("key", JSON.stringify({ a: 1 }));
    const { result } = renderHook(() => useLocalStorage("key", null));

    expect(result.current[0]).toEqual({ a: 1 });
  });

  it("applies consecutive functional updates on the latest value", () => {
    const { result } = renderHook(() => useLocalStorage("key", []));

    act(() => {
      result.current[1]((v) => [...v, "a"]);
      result.current[1]((v) => [...v, "b"]);
    });

    expect(result.current[0]).toEqual(["a", "b"]);
    expect(JSON.parse(localStorage.getItem("key"))).toEqual(["a", "b"]);
  });

  it("falls back to the initial value on corrupted data", () => {
    localStorage.setItem("key", "{not json");
    const { result } = renderHook(() => useLocalStorage("key", false));

    expect(result.current[0]).toBe(false);
  });
});
