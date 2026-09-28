# Group Builder Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calendar shows interest-group membership over time. Cadence is a builder control box. Group builder is a max-4 drag galaxy with suggest/shuffle/reset and in-memory save/draft/delete.

**Architecture:** Pure modules for cadence, assignment, and plans. HTML owns drag UI and the calendar bars. Drop `cadence` from nav tasks.

**Tech Stack:** Vanilla JS ESM, bun test, existing hub HTML.

## Global Constraints

- Max 4 active galaxies.
- Cadence is not a nav task.
- Cadence modes: `time` (`days` | `weeks` | `range`) or `count` (`lessons` | `plans`).
- Default cadence: time / weeks / 2.
- Start: `preset` or `blank`.
- Suggest = preference then balance. Shuffle = random top-5 then balance.
- `...` lists unapproved submissions.
- Save / Save as draft / Delete. In-memory only.
- Calendar bars = one per active galaxy across the cadence window.
- No React. No localStorage. bun only. First names only.
- Spec: `docs/superpowers/specs/2026-09-27-group-builder-timeline-design.md`

## File map

- Create: `weaver/hub/cadence.js`, `weaver/hub/cadence.test.js`
- Create: `weaver/hub/assign.js`, `weaver/hub/assign.test.js`
- Create: `weaver/hub/planStore.js`, `weaver/hub/planStore.test.js`
- Modify: `weaver/hub/navState.js`, `weaver/hub/navState.test.js` (drop cadence)
- Modify: `weaver/hub/calendarModel.js` (add `blocksFromGroups`)
- Modify: `galaxy_ui_classroom_hub.html`

---

### Task 1: Cadence, assign, plan, nav

**Files:**
- Create: `weaver/hub/cadence.js`, `weaver/hub/cadence.test.js`
- Create: `weaver/hub/assign.js`, `weaver/hub/assign.test.js`
- Create: `weaver/hub/planStore.js`, `weaver/hub/planStore.test.js`
- Modify: `weaver/hub/navState.js`, `weaver/hub/navState.test.js`
- Modify: `weaver/hub/calendarModel.js`, `weaver/hub/calendarModel.test.js`

**Interfaces:**
- Produces: `createCadence`, `setCadenceMode`, `setTimeCadence`, `setCountCadence`, `cadenceWindow`, `MAX_ACTIVE`, `toggleActiveGalaxy`, `assignStudent`, `suggestAssignments`, `shuffleAssignments`, `snapshotStudents`, `createPlan`, `savePlan`, `saveAsDraft`, `deletePlan`, `blocksFromGroups`
- Nav: `TASKS` is `{ none, builder, approval }` only. `openTask(..., "cadence")` throws.

- [ ] **Step 1: Write the failing tests**

`weaver/hub/cadence.test.js`:

```javascript
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
```

`weaver/hub/assign.test.js`:

```javascript
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
```

`weaver/hub/planStore.test.js`:

```javascript
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
```

Add to `navState.test.js`:

```javascript
test("cadence is not a task", () => {
  expect(() => openTask(createNavState(), "cadence")).toThrow("invalid task");
});
```

Add to `calendarModel.test.js`:

```javascript
test("blocksFromGroups one bar per galaxy", () => {
  const blocks = blocksFromGroups(
    [{ id: "space", label: "Space", color: "#0ea5e9" }],
    { start: "2026-10-01", end: "2026-10-14" }
  );
  expect(blocks).toEqual([
    { id: "group-space", title: "Space", kind: "unit", start: "2026-10-01", end: "2026-10-14", color: "#0ea5e9", task: "builder" },
  ]);
});
```

- [ ] **Step 2: Run tests, expect FAIL** (missing modules / cadence still valid)

Run: `bun test weaver/hub/`

- [ ] **Step 3: Minimal implementation**

`cadence.js`:

```javascript
export function createCadence(seed = {}) {
  return {
    mode: seed.mode ?? "time",
    timeUnit: seed.timeUnit ?? "weeks",
    timeCount: seed.timeCount ?? 2,
    rangeStart: seed.rangeStart ?? null,
    rangeEnd: seed.rangeEnd ?? null,
    countUnit: seed.countUnit ?? "lessons",
    count: seed.count ?? 1,
  };
}

export function setCadenceMode(cadence, mode) {
  if (mode !== "time" && mode !== "count") throw new Error("invalid cadence");
  return { ...cadence, mode };
}

export function setTimeCadence(cadence, patch) {
  return { ...cadence, mode: "time", ...patch };
}

export function setCountCadence(cadence, patch) {
  return { ...cadence, mode: "count", ...patch };
}

function addDays(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function cadenceWindow(cadence, anchorIso) {
  if (cadence.mode === "time" && cadence.timeUnit === "range" && cadence.rangeStart && cadence.rangeEnd) {
    return { start: cadence.rangeStart, end: cadence.rangeEnd };
  }
  const n = cadence.mode === "count" ? cadence.count : cadence.timeCount;
  const days = cadence.mode === "count" || cadence.timeUnit === "weeks" ? n * 7 : n;
  return { start: anchorIso, end: addDays(anchorIso, days - 1) };
}
```

`assign.js`:

```javascript
export const MAX_ACTIVE = 4;

export function toggleActiveGalaxy(activeIds, id) {
  if (activeIds.includes(id)) return activeIds.filter((x) => x !== id);
  if (activeIds.length >= MAX_ACTIVE) return activeIds;
  return [...activeIds, id];
}

export function assignStudent(students, studentId, packId, activeIds) {
  let nextActive = activeIds.includes(packId) ? activeIds : toggleActiveGalaxy(activeIds, packId);
  if (!nextActive.includes(packId)) {
    return { students: students.map((s) => ({ ...s })), activeIds };
  }
  return {
    activeIds: nextActive,
    students: students.map((s) => (s.id === studentId ? { ...s, assignedPack: packId } : { ...s })),
  };
}

export function snapshotStudents(students) {
  return students.map((s) => ({ ...s, preferences: [...s.preferences] }));
}

function packIdForLabel(packs, label) {
  return (packs.find((p) => p.label === label) || {}).id;
}

export function suggestAssignments(students, packs, activeIds) {
  const counts = Object.fromEntries(activeIds.map((id) => [id, 0]));
  return students.map((s) => {
    let target = null;
    for (const pref of s.preferences) {
      const id = packIdForLabel(packs, pref);
      if (id && activeIds.includes(id)) { target = id; break; }
    }
    if (!target) target = activeIds.slice().sort((a, b) => counts[a] - counts[b])[0] || null;
    if (target) counts[target] += 1;
    return { ...s, assignedPack: target };
  });
}

export function shuffleAssignments(students, packs, activeIds, rand = Math.random) {
  const counts = Object.fromEntries(activeIds.map((id) => [id, 0]));
  return students.map((s) => {
    const allowed = s.preferences
      .map((label) => packIdForLabel(packs, label))
      .filter((id) => id && activeIds.includes(id));
    let target;
    if (allowed.length) target = allowed[Math.floor(rand() * allowed.length)];
    else target = activeIds.slice().sort((a, b) => counts[a] - counts[b])[0] || null;
    if (target) counts[target] += 1;
    return { ...s, assignedPack: target };
  });
}
```

`planStore.js`:

```javascript
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
```

Drop `cadence` from `TASKS` and `TASK_IDS` in `navState.js`. `panelWidth`: builder wide, approval standard.

Add to `calendarModel.js`:

```javascript
export function blocksFromGroups(groups, window) {
  return groups.map((g) => ({
    id: `group-${g.id}`,
    title: g.label,
    kind: "unit",
    start: window.start,
    end: window.end,
    color: g.color,
    task: "builder",
  }));
}
```

- [ ] **Step 4: `bun test weaver/hub/` PASS**
- [ ] **Step 5: Commit**

```bash
git add weaver/hub
git commit -m "$(cat <<'EOF'
feat: add cadence, assign, and plan models

EOF
)"
```

---

### Task 2: Builder galaxies and cadence box

**Files:**
- Modify: `galaxy_ui_classroom_hub.html`

**Interfaces:**
- Consumes: Task 1 exports via `window.HubAssign`, `window.HubCadence`
- Produces: mini-galaxy builder, pill strip (max 4), cadence box, Suggest / Shuffle / Reset, blank/preset start

- [ ] **Step 1: Boot modules**

In the existing module script, also import assign + cadence and set `window.HubAssign`, `window.HubCadence`.

- [ ] **Step 2: Sidebar**

Delete the Set cadences button (`tab-btn-cadence`). Keep Group builder and Interests approval.

- [ ] **Step 3: Replace `#view-builder` body**

Keep `id="view-builder"`. Replace the column-grid builder with:

1. Top row: start `Preset` | `Blank`, then Suggest, Shuffle, Reset.
2. Cadence box: mode `Time` | `Lesson/unit`. Time shows number + `days|weeks|range`. Range shows two date inputs. Count shows number + `lessons|plans`.
3. Pill strip of all packs. Active pills are selected (max 4). A `...` button at the end (`id="unapprovedToggle"`).
4. `#galaxyBoard`: one `.mini-galaxy` per active id. Each is a drop target. Students in that pack are chips. Unassigned tray `#unassignedGalaxy` for `assignedPack === null`.
5. Drag chip onto another galaxy or onto a pill.

Wire:

```javascript
function startPreset() {
  STATE.startMode = "preset";
  STATE.activePackIds = STATE.packs.slice(0, 4).map((p) => p.id);
  STATE.students.forEach((s) => { if (!STATE.activePackIds.includes(s.assignedPack)) s.assignedPack = STATE.activePackIds[0]; });
  STATE.baseline = window.HubAssign.snapshotStudents(STATE.students);
  renderGroupBuilder();
}

function startBlank() {
  STATE.startMode = "blank";
  STATE.activePackIds = [];
  STATE.students.forEach((s) => { s.assignedPack = null; });
  STATE.baseline = window.HubAssign.snapshotStudents(STATE.students);
  renderGroupBuilder();
}
```

Use `HubAssign.toggleActiveGalaxy`, `assignStudent`, `suggestAssignments`, `shuffleAssignments`. Reset copies `STATE.baseline` back onto students.

Remove `#view-cadence` from `#mcPanel` (leave the node `hidden` in the document if easier; no nav). `openTask('cadence')` is gone.

- [ ] **Step 4: Browser check**

Max 4 pills. Drag student onto a fifth pill: no change. Drag onto a new pill when under 4: galaxy appears. Suggest and Shuffle change assignments. Reset restores baseline.

- [ ] **Step 5: Commit**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
feat: rebuild Group builder as a four-galaxy board

EOF
)"
```

---

### Task 3: Unapproved list and plan buttons

**Files:**
- Modify: `galaxy_ui_classroom_hub.html`

**Interfaces:**
- Consumes: `createPlan`, `savePlan`, `saveAsDraft`, `deletePlan`
- Produces: `...` side list, Save / Save as draft / Delete

- [ ] **Step 1: `...` list**

`#unapprovedDrawer` slides beside the pill strip. Rows = `STATE.submissions.filter(s => !s.approved)`. Click approves (`approved = true`) and ensures a pack exists with that topic label (add to `STATE.packs` if missing, do not auto-activate). Close on second `...` click or Escape (after drawer/modal/task).

- [ ] **Step 2: Plan buttons**

Under the cadence box: Save, Save as draft, Delete.

```javascript
function currentPlanPayload() {
  return window.HubPlan.createPlan({
    title: "October plan",
    activeIds: STATE.activePackIds,
    students: STATE.students,
    cadence: STATE.cadence,
  });
}
```

Keep `STATE.planId`. First saveAsDraft/save creates and upserts. Delete clears `STATE.planId`, runs `startBlank`, toast.

Expose `window.HubPlan` from the module script.

- [ ] **Step 3: Browser check**

`...` shows flagged/unapproved topics. Approve adds a pill. Save then Delete returns to blank.

- [ ] **Step 4: Commit**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
feat: add unapproved interest list and plan save

EOF
)"
```

---

### Task 4: Calendar is the group timeline

**Files:**
- Modify: `galaxy_ui_classroom_hub.html` (`renderMissionCalendar`)

**Interfaces:**
- Consumes: `blocksFromGroups`, `cadenceWindow`
- Produces: calendar bars from active galaxies + cadence window

- [ ] **Step 1: Replace octoberBlocks() in renderMissionCalendar**

```javascript
const window = window.HubCadence.cadenceWindow(STATE.cadence, "2026-10-01");
const groups = STATE.packs.filter((p) => STATE.activePackIds.includes(p.id));
const blocks = window.HubCal.blocksFromGroups(groups, window);
```

Keep week/month chrome. Click still `onCalendarBlockClick('builder')`.

- [ ] **Step 2: Browser check**

Month view shows one bar per active galaxy spanning the cadence window. Opening builder and changing cadence then flipping grain redraws bar length.

- [ ] **Step 3: `bun test` + grep**

`rg "toggleTask\\('cadence'\\)|tab-btn-cadence" galaxy_ui_classroom_hub.html` must be empty.

- [ ] **Step 4: Commit**

```bash
git add galaxy_ui_classroom_hub.html weaver/hub
git commit -m "$(cat <<'EOF'
feat: show interest-group timeline on the calendar

EOF
)"
```
