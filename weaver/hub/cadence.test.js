import { describe, expect, test } from "bun:test";
import { cadenceWindow, createCadence, setCadenceMode, setCountCadence, setTimeCadence } from "./cadence.js";

test("defaults to time weeks 2", () => {
  expect(createCadence()).toEqual({
    mode: "time",
    timeUnit: "weeks",
    timeCount: 2,
    rangeStart: null,
    rangeEnd: null,
    countUnit: "lessons",
    count: 1,
  });
});

test("time days window from anchor", () => {
  const c = setTimeCadence(createCadence(), { timeUnit: "days", timeCount: 10 });
  expect(cadenceWindow(c, "2026-10-01")).toEqual({ start: "2026-10-01", end: "2026-10-10" });
});

test("time weeks window", () => {
  const c = setTimeCadence(createCadence(), { timeUnit: "weeks", timeCount: 2 });
  expect(cadenceWindow(c, "2026-10-01")).toEqual({ start: "2026-10-01", end: "2026-10-14" });
});

test("range uses explicit dates", () => {
  const c = setTimeCadence(createCadence(), { timeUnit: "range", rangeStart: "2026-10-05", rangeEnd: "2026-10-20" });
  expect(cadenceWindow(c, "2026-10-01")).toEqual({ start: "2026-10-05", end: "2026-10-20" });
});

test("count mode still returns a time window from anchor using count as weeks", () => {
  const c = setCountCadence(setCadenceMode(createCadence(), "count"), { countUnit: "lessons", count: 3 });
  expect(c.mode).toBe("count");
  expect(cadenceWindow(c, "2026-10-01")).toEqual({ start: "2026-10-01", end: "2026-10-21" });
});

test("rejects bad mode", () => {
  expect(() => setCadenceMode(createCadence(), "orbit")).toThrow("invalid cadence");
});
