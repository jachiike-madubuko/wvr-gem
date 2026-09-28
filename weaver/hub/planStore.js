export function createPlan({ title, activeIds, students, cadence }) {
  return {
    id: `plan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title,
    status: "draft",
    activeIds: [...activeIds],
    students: students.map((s) => ({ ...s })),
    cadence: { ...cadence },
    baseline: students.map((s) => ({ ...s })),
  };
}

export function saveAsDraft(store, plan) {
  const next = { ...plan, status: "draft" };
  return upsert(store, next);
}

export function savePlan(store, plan) {
  const next = { ...plan, status: "saved" };
  return upsert(store, next);
}

export function deletePlan(store, id) {
  return store.filter((p) => p.id !== id);
}

function upsert(store, plan) {
  const i = store.findIndex((p) => p.id === plan.id);
  if (i < 0) return [...store, plan];
  return store.map((p) => (p.id === plan.id ? plan : p));
}
