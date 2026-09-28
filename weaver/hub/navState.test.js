import { describe, expect, test } from "bun:test";
import {
  FACES,
  GRAINS,
  TASKS,
  chromeFor,
  closeTask,
  createNavState,
  flipFace,
  openTask,
  panelWidth,
  setGrain,
} from "./navState.js";

describe("createNavState", () => {
  test("defaults to galaxy, month, no task", () => {
    expect(createNavState()).toEqual({
      face: FACES.galaxy,
      grain: GRAINS.month,
      task: TASKS.none,
    });
  });
});

describe("flipFace", () => {
  test("galaxy becomes missionControl and keeps grain", () => {
    const next = flipFace(createNavState());
    expect(next.face).toBe(FACES.missionControl);
    expect(next.grain).toBe(GRAINS.month);
  });

  test("leaving missionControl closes the task", () => {
    const open = openTask(createNavState({ face: FACES.missionControl }), TASKS.builder);
    expect(flipFace(open).task).toBe(TASKS.none);
  });
});

describe("setGrain", () => {
  test("accepts week and month", () => {
    expect(setGrain(createNavState(), GRAINS.week).grain).toBe(GRAINS.week);
  });

  test("rejects unknown grain", () => {
    expect(() => setGrain(createNavState(), "day")).toThrow("invalid grain");
  });
});

describe("openTask", () => {
  test("flips to missionControl when opened from galaxy", () => {
    const next = openTask(createNavState(), TASKS.approval);
    expect(next.face).toBe(FACES.missionControl);
    expect(next.task).toBe(TASKS.approval);
  });

  test("toggles the same task closed", () => {
    const open = openTask(createNavState({ face: FACES.missionControl }), TASKS.cadence);
    expect(openTask(open, TASKS.cadence).task).toBe(TASKS.none);
  });

  test("rejects unknown task", () => {
    expect(() => openTask(createNavState(), "preview")).toThrow("invalid task");
  });
});

describe("panelWidth", () => {
  test("builder is wide, others standard, none closed", () => {
    expect(panelWidth(TASKS.builder)).toBe("wide");
    expect(panelWidth(TASKS.approval)).toBe("standard");
    expect(panelWidth(TASKS.cadence)).toBe("standard");
    expect(panelWidth(TASKS.none)).toBe("closed");
  });
});

describe("chromeFor", () => {
  test("hides the task rail on galaxy", () => {
    const chrome = chromeFor(createNavState());
    expect(chrome.showTasks).toBe(false);
    expect(chrome.galaxyActive).toBe(true);
    expect(chrome.panel).toBe("closed");
  });

  test("shows the task rail on missionControl", () => {
    const chrome = chromeFor(createNavState({ face: FACES.missionControl, task: TASKS.builder }));
    expect(chrome.showTasks).toBe(true);
    expect(chrome.mcActive).toBe(true);
    expect(chrome.panel).toBe("wide");
    expect(chrome.taskActive).toBe(TASKS.builder);
  });
});

describe("closeTask", () => {
  test("clears task and keeps face", () => {
    const next = closeTask(createNavState({ face: FACES.missionControl, task: TASKS.builder }));
    expect(next.task).toBe(TASKS.none);
    expect(next.face).toBe(FACES.missionControl);
  });
});
