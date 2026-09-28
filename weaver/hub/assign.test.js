import { describe, expect, test } from "bun:test";
import { MAX_ACTIVE, applyPreset, assignStudent, pickTopPacks, restoreSnapshot, shuffleAssignments, snapshotStudents, suggestAssignments, toggleActiveGalaxy } from "./assign.js";

const kids = [
  { id: "s1", assignedPack: "space", preferences: ["Space", "Robotics", "Ballet", "Marine Biology", "Chemistry"] },
  { id: "s2", assignedPack: "ballet", preferences: ["Ballet", "Space", "Robotics", "Botany", "Chemistry"] },
  { id: "s3", assignedPack: "space", preferences: ["Robotics", "Space", "Ballet", "Chemistry", "Botany"] },
];
const packs = [
  { id: "space", label: "Space" },
  { id: "robotics", label: "Robotics" },
  { id: "ballet", label: "Ballet" },
  { id: "marine", label: "Marine Biology" },
  { id: "botany", label: "Botany" },
];

test("max active is 4", () => {
  expect(MAX_ACTIVE).toBe(4);
  let ids = [];
  for (const id of ["space", "robotics", "ballet", "marine", "botany"]) {
    ids = toggleActiveGalaxy(ids, id);
  }
  expect(ids).toEqual(["space", "robotics", "ballet", "marine"]);
});

test("toggle off removes", () => {
  expect(toggleActiveGalaxy(["space", "ballet"], "space")).toEqual(["ballet"]);
});

test("assign to inactive galaxy activates it", () => {
  const next = assignStudent(kids, "s1", "robotics", ["space"]);
  expect(next.activeIds).toEqual(["space", "robotics"]);
  expect(next.students.find((s) => s.id === "s1").assignedPack).toBe("robotics");
});

test("assign to fifth galaxy is a no-op", () => {
  const active = ["space", "robotics", "ballet", "marine"];
  const next = assignStudent(kids, "s1", "botany", active);
  expect(next.activeIds).toEqual(active);
  expect(next.students.find((s) => s.id === "s1").assignedPack).toBe("space");
});

test("suggest prefers first matching active pack then balances", () => {
  const next = suggestAssignments(kids, packs, ["space", "ballet"]);
  expect(next.find((s) => s.id === "s1").assignedPack).toBe("space");
  expect(next.find((s) => s.id === "s2").assignedPack).toBe("ballet");
});

test("shuffle stays inside top 5 that are active", () => {
  const next = shuffleAssignments(kids, packs, ["space", "ballet"], () => 0);
  for (const kid of next) {
    const labels = ["Space", "Ballet"];
    const orig = kids.find((k) => k.id === kid.id);
    const allowed = orig.preferences.filter((p) => labels.includes(p));
    const pack = packs.find((p) => p.id === kid.assignedPack);
    expect(allowed).toContain(pack.label);
  }
});

test("shuffle rebalances so group sizes differ by at most 1 after a biased random pick", () => {
  const evenKids = [
    { id: "a", assignedPack: null, preferences: ["Space", "Ballet"] },
    { id: "b", assignedPack: null, preferences: ["Space", "Ballet"] },
    { id: "c", assignedPack: null, preferences: ["Space", "Ballet"] },
    { id: "d", assignedPack: null, preferences: ["Space", "Ballet"] },
  ];
  const next = shuffleAssignments(evenKids, packs, ["space", "ballet"], () => 0);
  const sizes = ["space", "ballet"].map((id) => next.filter((s) => s.assignedPack === id).length);
  expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(1);
  expect(sizes.reduce((a, b) => a + b, 0)).toBe(4);
});

test("snapshot clones assignedPack", () => {
  const snap = snapshotStudents(kids);
  snap[0].assignedPack = "x";
  expect(kids[0].assignedPack).toBe("space");
});

test("restoreSnapshot restores students and activeIds and nulls packs not in restored activeIds", () => {
  const current = [
    { id: "s1", assignedPack: "space", preferences: ["Space"] },
    { id: "s2", assignedPack: "botany", preferences: ["Botany"] },
  ];
  const snapshot = {
    students: [
      { id: "s1", assignedPack: "space", preferences: ["Space"] },
      { id: "s2", assignedPack: "robotics", preferences: ["Robotics"] },
    ],
    activeIds: ["space", "ballet"],
  };
  const next = restoreSnapshot(current, ["space"], snapshot);
  expect(next.activeIds).toEqual(["space", "ballet"]);
  expect(next.students.find((s) => s.id === "s1").assignedPack).toBe("space");
  expect(next.students.find((s) => s.id === "s2").assignedPack).toBe(null);
  expect(next.students.every((s) => s.assignedPack === null || next.activeIds.includes(s.assignedPack))).toBe(true);
});

test("pickTopPacks chooses packs with the most kids and breaks ties by original pack order", () => {
  const roster = [
    { id: "a", assignedPack: "botany", preferences: [] },
    { id: "b", assignedPack: "space", preferences: [] },
    { id: "c", assignedPack: "space", preferences: [] },
    { id: "d", assignedPack: "ballet", preferences: [] },
    { id: "e", assignedPack: "ballet", preferences: [] },
    { id: "f", assignedPack: "marine", preferences: [] },
    { id: "g", assignedPack: "robotics", preferences: [] },
  ];
  expect(pickTopPacks(roster, packs, 4)).toEqual(["space", "robotics", "ballet", "marine"]);
});

test("applyPreset keeps assignedPack for kids in the chosen 4 and unassigns the rest", () => {
  const roster = [
    { id: "s1", assignedPack: "space", preferences: [] },
    { id: "s2", assignedPack: "botany", preferences: [] },
    { id: "s3", assignedPack: "ballet", preferences: [] },
    { id: "s4", assignedPack: "robotics", preferences: [] },
    { id: "s5", assignedPack: "marine", preferences: [] },
    { id: "s6", assignedPack: "space", preferences: [] },
  ];
  const next = applyPreset(roster, packs);
  expect(next.activeIds).toEqual(["space", "robotics", "ballet", "marine"]);
  expect(next.students.find((s) => s.id === "s1").assignedPack).toBe("space");
  expect(next.students.find((s) => s.id === "s2").assignedPack).toBe(null);
  expect(next.students.find((s) => s.id === "s3").assignedPack).toBe("ballet");
});
