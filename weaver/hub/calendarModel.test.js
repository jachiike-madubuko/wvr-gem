import { describe, expect, test } from "bun:test";
import {
  OCTOBER_2026,
  WEEKDAYS,
  layoutWeekBars,
  monthWeeks,
  octoberBlocks,
  shiftFocus,
  titleForGrain,
  weekContaining,
} from "./calendarModel.js";

describe("monthWeeks", () => {
  test("October 2026 starts on Thursday and includes Sep 27", () => {
    const weeks = monthWeeks(2026, 9);
    expect(WEEKDAYS).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    expect(weeks[0][0]).toBe("2026-09-27");
    expect(weeks[0][4]).toBe("2026-10-01");
    expect(weeks.at(-1)[6]).toBe("2026-10-31");
  });
});

describe("weekContaining", () => {
  test("returns the Sunday-start week for 2026-10-12", () => {
    expect(weekContaining(2026, 9, "2026-10-12")).toEqual([
      "2026-10-11",
      "2026-10-12",
      "2026-10-13",
      "2026-10-14",
      "2026-10-15",
      "2026-10-16",
      "2026-10-17",
    ]);
  });
});

describe("layoutWeekBars", () => {
  test("spans the October cycle across a clipped week", () => {
    const week = weekContaining(2026, 9, "2026-10-12");
    const bars = layoutWeekBars(octoberBlocks(), week);
    const cycle = bars.find((b) => b.block.id === "cycle-oct");
    expect(cycle.colStart).toBe(0);
    expect(cycle.colSpan).toBe(7);
    expect(cycle.continuesStart).toBe(true);
    expect(cycle.continuesEnd).toBe(true);
  });

  test("places the survey on 2026-10-28", () => {
    const week = weekContaining(2026, 9, "2026-10-28");
    const bars = layoutWeekBars(octoberBlocks(), week);
    const survey = bars.find((b) => b.block.id === "survey-oct");
    expect(survey.colStart).toBe(3);
    expect(survey.colSpan).toBe(1);
    expect(survey.block.task).toBe("approval");
  });
});

describe("titleForGrain", () => {
  test("month title is October 2026", () => {
    expect(titleForGrain("month", 2026, 9, [])).toBe("October 2026");
  });

  test("week title uses the focused range", () => {
    const week = weekContaining(2026, 9, "2026-10-12");
    expect(titleForGrain("week", 2026, 9, week)).toBe("Oct 11 – Oct 17, 2026");
  });
});

describe("shiftFocus", () => {
  test("week delta moves seven days", () => {
    const next = shiftFocus(OCTOBER_2026, "week", 1);
    expect(next.weekStart).toBe("2026-10-18");
    expect(next.month).toBe(9);
  });

  test("month delta keeps the same weekday-aligned week when possible", () => {
    const next = shiftFocus(OCTOBER_2026, "month", 1);
    expect(next.year).toBe(2026);
    expect(next.month).toBe(10);
  });
});

describe("octoberBlocks", () => {
  test("cycle opens cadence, pack lessons open builder", () => {
    const blocks = octoberBlocks();
    expect(blocks.find((b) => b.id === "cycle-oct").task).toBe("cadence");
    expect(blocks.find((b) => b.id === "space-2026-10-12").task).toBe("builder");
  });
});
