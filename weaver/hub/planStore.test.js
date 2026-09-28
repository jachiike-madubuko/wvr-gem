import { describe, expect, test } from "bun:test";
import { createPlan, deletePlan, saveAsDraft, savePlan } from "./planStore.js";

test("createPlan starts draft", () => {
  const plan = createPlan({ title: "October", activeIds: ["space"], students: [], cadence: {} });
  expect(plan.status).toBe("draft");
  expect(plan.id).toBeTruthy();
});

test("save and draft and delete", () => {
  let store = [];
  const plan = createPlan({ title: "A", activeIds: [], students: [], cadence: {} });
  store = saveAsDraft(store, plan);
  expect(store[0].status).toBe("draft");
  store = savePlan(store, plan);
  expect(store[0].status).toBe("saved");
  store = deletePlan(store, plan.id);
  expect(store).toEqual([]);
});
