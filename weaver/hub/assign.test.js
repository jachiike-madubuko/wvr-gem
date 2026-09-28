import { describe, expect, test } from "bun:test";
import { MAX_ACTIVE, assignStudent, shuffleAssignments, snapshotStudents, suggestAssignments, toggleActiveGalaxy } from "./assign.js";

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

test("snapshot clones assignedPack", () => {
  const snap = snapshotStudents(kids);
  snap[0].assignedPack = "x";
  expect(kids[0].assignedPack).toBe("space");
});
