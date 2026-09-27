# Mission Control Flip Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the five-tab Classroom Hub with a two-face flip: galaxy on the front, Mission Control (week/month calendar + exclusive task panel) on the back.

**Architecture:** Extract a pure nav state machine and calendar model as ESM modules tested with `bun test`. The existing vanilla HTML file owns chrome, canvas, and the three relocated task views. No React in the hub.

**Tech Stack:** Static HTML, vanilla JS (ESM), Weaver design tokens in `weaver/styles.css`, Bun for tests.

## Global Constraints

- One classroom flip card. Not per-pack flips.
- Calendar has two grains only: `month` and `week`.
- Task panel is exclusive: `null` | `builder` | `approval` | `cadence`.
- Group builder panel width is `min(40rem, 50vw)`. Approval and cadence are `24rem`.
- Calendar stays mounted and visible when a panel is open.
- Student path preview stays in the file, hidden, with no nav entry.
- No React in `galaxy_ui_classroom_hub.html`. No URL routing. No localStorage.
- Demo fixture: Room 204, October 2026, 24 first names, 8 packs.
- `bun` / `bunx` only. Never npm / npx.
- First names only. Zero new PII fields.
- Spec: `docs/superpowers/specs/2026-09-27-mission-control-flip-design.md`

## File map

- Create: `package.json` — `bun test` script, `"type": "module"`
- Create: `weaver/hub/navState.js` — face / grain / task rules
- Create: `weaver/hub/navState.test.js`
- Create: `weaver/hub/calendarModel.js` — month weeks, bar layout, October fixtures
- Create: `weaver/hub/calendarModel.test.js`
- Modify: `galaxy_ui_classroom_hub.html` — flip stage, sidebar, calendar face, relocate tasks, `applyNav`
- Do not modify: `weaver/_ds_bundle.js` (reference only)
- Do not delete: `#view-preview` markup or `renderStudentPathPreview`

---

### Task 1: Navigation state machine

**Files:**
- Create: `package.json`
- Create: `weaver/hub/navState.js`
- Test: `weaver/hub/navState.test.js`

**Interfaces:**
- Consumes: nothing
- Produces: `FACES`, `GRAINS`, `TASKS`, `createNavState(seed)`, `flipFace(state)`, `setGrain(state, grain)`, `openTask(state, task)`, `closeTask(state)`, `panelWidth(task)`, `chromeFor(state)`

- [ ] **Step 1: Write the failing test**

```javascript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test weaver/hub/navState.test.js`

Expected: FAIL with `Cannot find module './navState.js'` or `package.json` missing.

- [ ] **Step 3: Write package.json and minimal implementation**

`package.json`:

```json
{
  "name": "wvr-gem",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "bun test"
  }
}
```

`weaver/hub/navState.js`:

```javascript
export const FACES = {
  galaxy: "galaxy",
  missionControl: "missionControl",
};

export const GRAINS = {
  month: "month",
  week: "week",
};

export const TASKS = {
  none: null,
  builder: "builder",
  approval: "approval",
  cadence: "cadence",
};

const TASK_IDS = new Set([TASKS.builder, TASKS.approval, TASKS.cadence]);

export function createNavState(seed = {}) {
  return {
    face: seed.face ?? FACES.galaxy,
    grain: seed.grain ?? GRAINS.month,
    task: seed.task ?? TASKS.none,
  };
}

export function flipFace(state) {
  const face = state.face === FACES.galaxy ? FACES.missionControl : FACES.galaxy;
  return {
    ...state,
    face,
    task: face === FACES.galaxy ? TASKS.none : state.task,
  };
}

export function setGrain(state, grain) {
  if (grain !== GRAINS.week && grain !== GRAINS.month) {
    throw new Error("invalid grain");
  }
  return { ...state, grain };
}

export function openTask(state, task) {
  if (!TASK_IDS.has(task)) {
    throw new Error("invalid task");
  }
  if (state.face === FACES.missionControl && state.task === task) {
    return { ...state, task: TASKS.none };
  }
  return {
    ...state,
    face: FACES.missionControl,
    task,
  };
}

export function closeTask(state) {
  return { ...state, task: TASKS.none };
}

export function panelWidth(task) {
  if (task === TASKS.builder) return "wide";
  if (task === TASKS.approval || task === TASKS.cadence) return "standard";
  return "closed";
}

export function chromeFor(state) {
  return {
    face: state.face,
    grain: state.grain,
    panel: panelWidth(state.task),
    showTasks: state.face === FACES.missionControl,
    galaxyActive: state.face === FACES.galaxy,
    mcActive: state.face === FACES.missionControl,
    taskActive: state.task,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test weaver/hub/navState.test.js`

Expected: PASS, 11 tests.

- [ ] **Step 5: Commit**

```bash
git add package.json weaver/hub/navState.js weaver/hub/navState.test.js
git commit -m "$(cat <<'EOF'
feat: add Mission Control nav state machine

EOF
)"
```

---

### Task 2: Calendar model

**Files:**
- Create: `weaver/hub/calendarModel.js`
- Test: `weaver/hub/calendarModel.test.js`

**Interfaces:**
- Consumes: nothing
- Produces: `WEEKDAYS`, `monthWeeks(year, month)`, `weekContaining(year, month, isoDate)`, `layoutWeekBars(blocks, dates)`, `titleForGrain(grain, year, month, weekDates)`, `shiftFocus(focus, grain, delta)`, `OCTOBER_2026`, `octoberBlocks()`

`focus` shape: `{ year: number, month: number, weekStart: string }` where `month` is 0-based and `weekStart` is the Sunday ISO date of the focused week.

- [ ] **Step 1: Write the failing test**

```javascript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test weaver/hub/calendarModel.test.js`

Expected: FAIL with `Cannot find module './calendarModel.js'`

- [ ] **Step 3: Write minimal implementation**

`weaver/hub/calendarModel.js`:

```javascript
export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const OCTOBER_2026 = {
  year: 2026,
  month: 9,
  weekStart: "2026-10-11",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SHORT_MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function monthWeeks(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const lastIso = toISO(new Date(year, month + 1, 0));
  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const dates = [];
    for (let d = 0; d < 7; d++) {
      const cur = new Date(start);
      cur.setDate(start.getDate() + w * 7 + d);
      dates.push(toISO(cur));
    }
    weeks.push(dates);
    if (dates[6] >= lastIso) break;
  }
  return weeks;
}

export function weekContaining(year, month, isoDate) {
  const weeks = monthWeeks(year, month);
  const hit = weeks.find((week) => week.includes(isoDate));
  if (hit) return hit;
  const date = fromISO(isoDate);
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const cur = new Date(start);
    cur.setDate(start.getDate() + i);
    return toISO(cur);
  });
}

export function layoutWeekBars(blocks, dates) {
  const laneEnds = [];
  const out = [];
  blocks
    .filter((b) => b.start <= dates[6] && b.end >= dates[0])
    .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end))
    .forEach((b) => {
      const s = b.start < dates[0] ? dates[0] : b.start;
      const e = b.end > dates[6] ? dates[6] : b.end;
      const colStart = dates.indexOf(s);
      const colEnd = dates.indexOf(e);
      if (colStart < 0 || colEnd < 0) return;
      let lane = laneEnds.findIndex((last) => last < s);
      if (lane < 0) {
        lane = laneEnds.length;
        laneEnds.push(e);
      } else {
        laneEnds[lane] = e;
      }
      out.push({
        block: b,
        lane,
        colStart,
        colSpan: colEnd - colStart + 1,
        continuesStart: b.start < dates[0],
        continuesEnd: b.end > dates[6],
      });
    });
  return out;
}

export function titleForGrain(grain, year, month, weekDates) {
  if (grain === "month") return `${MONTH_NAMES[month]} ${year}`;
  const start = fromISO(weekDates[0]);
  const end = fromISO(weekDates[6]);
  return `${SHORT_MONTH[start.getMonth()]} ${start.getDate()} – ${SHORT_MONTH[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

export function shiftFocus(focus, grain, delta) {
  if (grain === "week") {
    const start = fromISO(focus.weekStart);
    start.setDate(start.getDate() + delta * 7);
    return {
      year: start.getFullYear(),
      month: start.getMonth(),
      weekStart: toISO(start),
    };
  }
  const next = new Date(focus.year, focus.month + delta, 1);
  const weeks = monthWeeks(next.getFullYear(), next.getMonth());
  return {
    year: next.getFullYear(),
    month: next.getMonth(),
    weekStart: weeks[1] ? weeks[1][0] : weeks[0][0],
  };
}

const PACK_DAYS = [
  { id: "space", label: "Space", color: "#0ea5e9", date: "2026-10-12" },
  { id: "robotics", label: "Robotics", color: "#6366f1", date: "2026-10-13" },
  { id: "ballet", label: "Ballet", color: "#ec4899", date: "2026-10-14" },
  { id: "marine", label: "Marine Biology", color: "#2fb86e", date: "2026-10-15" },
  { id: "fossils", label: "Archaeology", color: "#f59e0b", date: "2026-10-16" },
];

export function octoberBlocks() {
  return [
    {
      id: "cycle-oct",
      title: "October cycle",
      kind: "unit",
      start: "2026-10-01",
      end: "2026-10-31",
      color: null,
      task: "cadence",
    },
    {
      id: "survey-oct",
      title: "Curiosity survey",
      kind: "lesson",
      start: "2026-10-28",
      end: "2026-10-28",
      color: "var(--cal-mix)",
      task: "approval",
    },
    ...PACK_DAYS.map((pack) => ({
      id: `${pack.id}-${pack.date}`,
      title: pack.label,
      kind: "lesson",
      start: pack.date,
      end: pack.date,
      color: pack.color,
      task: "builder",
    })),
  ];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test weaver/hub/calendarModel.test.js`

Expected: PASS.

If `monthWeeks` last day fails because the trailing week includes November, tighten the break so the final Saturday is `2026-10-31` (October 2026 ends on Saturday). Do not loosen the test.

- [ ] **Step 5: Commit**

```bash
git add weaver/hub/calendarModel.js weaver/hub/calendarModel.test.js
git commit -m "$(cat <<'EOF'
feat: add Mission Control calendar model

EOF
)"
```

---

### Task 3: Flip stage and sidebar chrome

**Files:**
- Modify: `galaxy_ui_classroom_hub.html` (styles near line 11–900, sidebar near 907–946, main near 974, preview near 1278)
- Test: `weaver/hub/navState.test.js` (already covers `chromeFor`; no new module)

**Interfaces:**
- Consumes: `chromeFor`, `FACES`, `TASKS` from Task 1
- Produces: DOM ids `flipStage`, `flipCard`, `view-mission`, `mcLayout`, `mcCalendar`, `mcPanel`, `mcTaskRail`, `tab-btn-galaxy`, `tab-btn-mission`, `tab-btn-builder`, `tab-btn-approval`, `tab-btn-cadence`, `topbarFlipBtn`

- [ ] **Step 1: Add flip and Mission Control CSS before `/* Utility Helpers */`**

```css
    :root {
      --mc-panel-standard: 24rem;
      --mc-panel-wide: min(40rem, 50vw);
      --flip-dur: 520ms;
    }

    .flip-stage {
      perspective: 1600px;
      flex: 1;
      min-width: 0;
    }

    .flip-card {
      position: relative;
      width: 100%;
      min-height: calc(100vh - var(--topbar-h));
      transform-style: preserve-3d;
      transition: transform var(--flip-dur) var(--ease-pin);
    }

    .flip-stage[data-face="missionControl"] .flip-card {
      transform: rotateY(180deg);
    }

    .flip-face {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .flip-face-front {
      position: relative;
    }

    .flip-face-back {
      position: absolute;
      inset: 0;
      transform: rotateY(180deg);
      overflow: auto;
      padding: var(--space-5) var(--space-6) 5rem;
    }

    .mc-layout {
      display: grid;
      grid-template-columns: 1fr 0fr;
      min-height: 100%;
      gap: 0;
      transition: grid-template-columns 200ms var(--ease-standard);
    }

    .mc-layout[data-panel="standard"] {
      grid-template-columns: 1fr var(--mc-panel-standard);
    }

    .mc-layout[data-panel="wide"] {
      grid-template-columns: 1fr var(--mc-panel-wide);
    }

    .mc-calendar {
      min-width: 0;
    }

    .mc-panel {
      min-width: 0;
      overflow: auto;
      border-left: 1px solid var(--line);
      background: var(--surface);
    }

    .mc-layout[data-panel="closed"] .mc-panel {
      border-left: 0;
      overflow: hidden;
    }

    .mc-task { display: none; }
    .mc-task.active { display: block; }

    #mcTaskRail[hidden] { display: none; }

    @media (prefers-reduced-motion: reduce) {
      .flip-card {
        transition: opacity 180ms var(--ease-standard);
        transform: none !important;
      }
      .flip-stage[data-face="missionControl"] .flip-face-front { opacity: 0; pointer-events: none; }
      .flip-stage[data-face="galaxy"] .flip-face-back { opacity: 0; pointer-events: none; }
      .flip-face-back { transform: none; position: relative; }
    }
```

- [ ] **Step 2: Replace the five Classroom Tools buttons with Faces + Tasks**

Replace the `<nav class="sidebar-nav">` block with:

```html
      <nav class="sidebar-nav">
        <p class="sidebar-kicker" style="padding: 0 var(--space-3); margin-bottom: var(--space-1);">Faces</p>

        <button type="button" class="nav-pill-btn active" id="tab-btn-galaxy" onclick="setFace('galaxy')">
          <span>Galaxy</span>
          <span class="nav-badge-count" id="navCountCluster">8</span>
        </button>

        <button type="button" class="nav-pill-btn" id="tab-btn-mission" onclick="setFace('missionControl')">
          <span>Mission Control</span>
          <span class="nav-badge-count">Cal</span>
        </button>

        <div id="mcTaskRail" hidden>
          <p class="sidebar-kicker" style="padding: 0 var(--space-3); margin: var(--space-3) 0 var(--space-1);">Tasks</p>

          <button type="button" class="nav-pill-btn" id="tab-btn-builder" onclick="toggleTask('builder')">
            <span>Group builder</span>
            <span class="nav-badge-count" id="navCountStudents">24</span>
          </button>

          <button type="button" class="nav-pill-btn" id="tab-btn-approval" onclick="toggleTask('approval')">
            <span>Interests approval</span>
            <span class="nav-badge-count" id="navCountCurate">8</span>
          </button>

          <button type="button" class="nav-pill-btn" id="tab-btn-cadence" onclick="toggleTask('cadence')">
            <span>Set cadences</span>
            <span class="nav-badge-count">14d</span>
          </button>
        </div>
      </nav>
```

Delete the Student path nav button. Do not delete `#view-preview`.

- [ ] **Step 3: Wrap main in the flip card and add the Mission Control face**

Change `<main class="app-main">` to:

```html
      <main class="app-main" style="padding: 0; gap: 0;">
        <div class="flip-stage" id="flipStage" data-face="galaxy">
          <div class="flip-card" id="flipCard">
            <div class="flip-face flip-face-front">
              <div style="padding: var(--space-5) var(--space-6) 5rem;">
                <!-- existing #view-cluster stays here, still class view-container active -->
```

Close the front face after `#view-cluster`. Then add the back face. Move `#view-builder`, `#view-curate`, and `#view-cadence` into `#mcPanel` as `.mc-task`. Leave `#view-preview` after `</div></div></main>` (outside the card), with `hidden` plus the existing `view-container` class and no `active`.

Back face skeleton:

```html
            <div class="flip-face flip-face-back" id="view-mission">
              <div class="mc-layout" id="mcLayout" data-panel="closed">
                <div class="mc-calendar" id="mcCalendar"></div>
                <aside class="mc-panel" id="mcPanel" aria-label="Mission Control task">
                  <!-- relocate #view-builder, #view-curate, #view-cadence here -->
                </aside>
              </div>
            </div>
```

On each relocated view: add `mc-task` to the class list, drop `view-container`, keep the same ids.

- [ ] **Step 4: Add the Flip button in `.topbar-actions` before the theme toggle**

```html
          <button type="button" class="btn-pill outline" id="topbarFlipBtn" onclick="toggleFace()">Flip</button>
```

Make the cycle badge a button:

```html
          <button type="button" class="wvr-badge locked" id="cycleBadgeBtn" onclick="setFace('missionControl')">October cycle · 14d left</button>
```

- [ ] **Step 5: Manual chrome check**

Open `galaxy_ui_classroom_hub.html` in the browser. Galaxy still renders. Sidebar shows Galaxy + Mission Control. Tasks rail is absent until JS in Task 5 hides/shows it; if you have not wired JS yet, `#mcTaskRail` stays `hidden`. That is expected.

- [ ] **Step 6: Commit**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
feat: add flip stage and Mission Control chrome

EOF
)"
```

---

### Task 4: Render the calendar face

**Files:**
- Modify: `galaxy_ui_classroom_hub.html` (script tag at end of file)
- Test: reuse `weaver/hub/calendarModel.test.js`

**Interfaces:**
- Consumes: `monthWeeks`, `weekContaining`, `layoutWeekBars`, `titleForGrain`, `shiftFocus`, `OCTOBER_2026`, `octoberBlocks`, `WEEKDAYS`
- Produces: `renderMissionCalendar()`, `onCalendarBlockClick(task)`, `shiftCalendar(delta)`, `setCalendarGrain(grain)`

- [ ] **Step 1: Add module import + STATE.nav at the top of the existing script**

Because the hub script is classic (not `type="module"`), load the ESM files first, then boot after they attach to `window`.

Insert **before** the existing `<script>` (the large inline one):

```html
  <script type="module">
    import * as HubNav from "./weaver/hub/navState.js";
    import * as HubCal from "./weaver/hub/calendarModel.js";
    window.HubNav = HubNav;
    window.HubCal = HubCal;
    window.dispatchEvent(new Event("hub-modules-ready"));
  </script>
```

Do not convert the existing inline script to a module. Keep `onclick` handlers working.

- [ ] **Step 2: Write `renderMissionCalendar` in the inline script**

Add to `STATE`:

```javascript
      nav: null,
      calendarFocus: null,
```

Add these functions. They no-op until `HubCal` exists:

```javascript
    function ensureHub() {
      return window.HubNav && window.HubCal;
    }

    function renderMissionCalendar() {
      const root = document.getElementById("mcCalendar");
      if (!root || !ensureHub()) return;
      const { grain } = STATE.nav;
      const focus = STATE.calendarFocus;
      const weeks = window.HubCal.monthWeeks(focus.year, focus.month);
      const weekDates = window.HubCal.weekContaining(focus.year, focus.month, focus.weekStart);
      const rows = grain === "week" ? [weekDates] : weeks;
      const title = window.HubCal.titleForGrain(grain, focus.year, focus.month, weekDates);
      const blocks = (focus.year === 2026 && focus.month === 9)
        ? window.HubCal.octoberBlocks()
        : [];
      const today = "2026-10-12";

      root.innerHTML = `
        <section class="wvr-panel">
          <header class="wvr-panel-header">
            <div>
              <p class="wvr-kicker">Mission Control</p>
              <h1 class="wvr-title">${title}</h1>
              <p class="wvr-description">Month shows rotation pace. Week shows daily group pace. Open a task from the rail or a calendar bar.</p>
            </div>
            <div class="wvr-header-actions">
              <button type="button" class="btn-pill ${grain === "month" ? "primary" : "outline"}" onclick="setCalendarGrain('month')">Month</button>
              <button type="button" class="btn-pill ${grain === "week" ? "primary" : "outline"}" onclick="setCalendarGrain('week')">Week</button>
              <button type="button" class="btn-pill outline" onclick="shiftCalendar(-1)">Prev</button>
              <button type="button" class="btn-pill outline" onclick="goCalendarToday()">Today</button>
              <button type="button" class="btn-pill outline" onclick="shiftCalendar(1)">Next</button>
            </div>
          </header>
          <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px;text-align:center;font-size:var(--text-xs);color:var(--ink-faint);">
            ${window.HubCal.WEEKDAYS.map((d) => `<span style="padding:var(--space-1) 0;font-weight:var(--weight-medium);">${d}</span>`).join("")}
          </div>
          <div style="margin-top:var(--space-1);overflow:hidden;border-radius:var(--radius-grid);border:1px solid var(--line);background:var(--line);">
            ${rows.map((dates) => renderWeekRow(dates, blocks, focus, grain, today)).join("")}
          </div>
        </section>
      `;
    }

    function renderWeekRow(dates, blocks, focus, grain, today) {
      const bars = window.HubCal.layoutWeekBars(blocks, dates);
      const lanes = bars.reduce((n, b) => Math.max(n, b.lane + 1), 0);
      const minH = Math.max(grain === "week" ? 220 : 96, 32 + lanes * 22 + 8);
      const cells = dates.map((date) => {
        const inMonth = Number(date.slice(5, 7)) === focus.month + 1;
        const isToday = date === today;
        return `<div style="min-height:${minH}px;padding:0.375rem;background:${inMonth ? "var(--surface)" : "color-mix(in srgb, var(--surface-muted) 40%, var(--surface))"};box-shadow:${isToday ? "var(--ring-today)" : "none"};">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:999px;font-size:var(--text-xs);font-weight:var(--weight-semibold);background:${isToday ? "var(--signal-blue)" : "transparent"};color:${isToday ? "#fff" : inMonth ? "var(--ink)" : "var(--ink-faint)"};">${Number(date.slice(8))}</span>
        </div>`;
      }).join("");
      const pills = bars.map((bar) => {
        const face = bar.block.kind === "unit"
          ? "background:var(--cal-unit);color:var(--cal-unit-ink);"
          : `background:${bar.block.color || "var(--cal-math)"};color:#fff;`;
        const radius = `${bar.continuesStart ? "0" : "var(--radius-pill)"} ${bar.continuesEnd ? "0" : "var(--radius-pill)"} ${bar.continuesEnd ? "0" : "var(--radius-pill)"} ${bar.continuesStart ? "0" : "var(--radius-pill)"}`;
        return `<button type="button" onclick="onCalendarBlockClick('${bar.block.task}')" style="position:absolute;grid-column:${bar.colStart + 1} / span ${bar.colSpan};left:4px;right:4px;top:${32 + bar.lane * 22}px;z-index:10;height:var(--cal-pill-h);padding:0 var(--space-2);text-align:left;font-size:var(--text-micro);font-weight:var(--weight-semibold);font-family:var(--font-sans);border:0;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;border-radius:${radius};${face}">${bar.block.title}</button>`;
      }).join("");
      return `<div style="position:relative;display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--line);min-height:${minH}px;">${cells}${pills}</div>`;
    }

    function setCalendarGrain(grain) {
      STATE.nav = window.HubNav.setGrain(STATE.nav, grain);
      applyNav();
    }

    function shiftCalendar(delta) {
      STATE.calendarFocus = window.HubCal.shiftFocus(STATE.calendarFocus, STATE.nav.grain, delta);
      applyNav();
    }

    function goCalendarToday() {
      STATE.calendarFocus = { ...window.HubCal.OCTOBER_2026 };
      applyNav();
    }

    function onCalendarBlockClick(task) {
      STATE.nav = window.HubNav.openTask(STATE.nav, task);
      applyNav();
    }
```

- [ ] **Step 3: Open the page and flip via console if `applyNav` is not wired yet**

If Task 5 is not done, temporarily set `document.getElementById('flipStage').dataset.face = 'missionControl'` and call `renderMissionCalendar()` after `hub-modules-ready`. Confirm October month grid and week range `Oct 11 – Oct 17, 2026`. Remove the temporary console steps once Task 5 lands. Do not commit a debug hook.

- [ ] **Step 4: Commit**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
feat: render Mission Control week and month calendar

EOF
)"
```

---

### Task 5: applyNav and relocate the three tasks

**Files:**
- Modify: `galaxy_ui_classroom_hub.html`

**Interfaces:**
- Consumes: `createNavState`, `flipFace`, `openTask`, `closeTask`, `chromeFor` from Task 1; `OCTOBER_2026` from Task 2; `renderMissionCalendar` from Task 4
- Produces: `applyNav()`, `setFace(face)`, `toggleFace()`, `toggleTask(task)`, `handleHubEscape()`

- [ ] **Step 1: Replace `switchView` with `applyNav`**

Delete `function switchView(viewId) { ... }`. Replace every remaining `switchView('cluster')` (apply curated set ~2196, confirm cycle launch ~2431) with `setFace('galaxy')`.

```javascript
    function applyNav() {
      if (!ensureHub() || !STATE.nav) return;
      const chrome = window.HubNav.chromeFor(STATE.nav);
      const stage = document.getElementById("flipStage");
      const layout = document.getElementById("mcLayout");
      const rail = document.getElementById("mcTaskRail");
      const flipBtn = document.getElementById("topbarFlipBtn");

      STATE.isDraggingCanvas = false;
      if (stage) stage.dataset.face = chrome.face;
      if (layout) layout.dataset.panel = chrome.panel;
      if (rail) rail.hidden = !chrome.showTasks;
      if (flipBtn) flipBtn.textContent = chrome.mcActive ? "Galaxy" : "Mission Control";

      document.getElementById("tab-btn-galaxy")?.classList.toggle("active", chrome.galaxyActive);
      document.getElementById("tab-btn-mission")?.classList.toggle("active", chrome.mcActive);

      ["builder", "approval", "cadence"].forEach((id) => {
        document.getElementById(`tab-btn-${id}`)?.classList.toggle("active", chrome.taskActive === id);
      });

      document.getElementById("view-builder")?.classList.toggle("active", chrome.taskActive === "builder");
      document.getElementById("view-curate")?.classList.toggle("active", chrome.taskActive === "approval");
      document.getElementById("view-cadence")?.classList.toggle("active", chrome.taskActive === "cadence");

      document.getElementById("view-preview")?.classList.remove("active");
      document.getElementById("view-preview")?.setAttribute("hidden", "");

      if (chrome.face === "galaxy") {
        resizeCanvas();
        renderCanvasPackChips();
      } else {
        renderMissionCalendar();
        if (chrome.taskActive === "builder") renderGroupBuilder();
        if (chrome.taskActive === "approval") renderCurateView();
      }
    }

    function setFace(face) {
      if (!ensureHub()) return;
      if (STATE.nav.face === face) return;
      STATE.nav = window.HubNav.flipFace(STATE.nav);
      applyNav();
    }

    function toggleFace() {
      STATE.nav = window.HubNav.flipFace(STATE.nav);
      applyNav();
    }

    function toggleTask(task) {
      STATE.nav = window.HubNav.openTask(STATE.nav, task);
      applyNav();
    }
```

`setFace` is a binary toggle. The two sidebar buttons each request the other face. If already on that face, return.

- [ ] **Step 2: Boot after modules are ready**

Replace the `DOMContentLoaded` listener with:

```javascript
    function bootHub() {
      STATE.nav = window.HubNav.createNavState();
      STATE.calendarFocus = { ...window.HubCal.OCTOBER_2026 };
      applyNav();
      initClusterCanvas();
      renderGroupBuilder();
      renderCurateView();
      renderStudentPathPreview();
    }

    if (window.HubNav && window.HubCal) {
      bootHub();
    } else {
      window.addEventListener("hub-modules-ready", bootHub, { once: true });
    }
```

- [ ] **Step 3: Escape handling**

Extend the existing keydown listener:

```javascript
      if (e.key === "Escape") {
        const drawer = document.getElementById("studentDrawer");
        const modal = document.getElementById("newCycleModal");
        if (drawer?.classList.contains("open")) {
          closeStudentDrawer();
          return;
        }
        if (modal?.classList.contains("open")) {
          closeNewCycleModal();
          return;
        }
        if (STATE.nav?.task) {
          STATE.nav = window.HubNav.closeTask(STATE.nav);
          applyNav();
          return;
        }
        if (STATE.nav?.face === "missionControl") {
          STATE.nav = window.HubNav.flipFace(STATE.nav);
          applyNav();
        }
      }
```

- [ ] **Step 4: Browser verification**

Open `galaxy_ui_classroom_hub.html`.

1. Galaxy loads. Sidebar has Galaxy (active) and Mission Control. No Student path pill.
2. Click Mission Control. Stage flips. Month calendar shows October cycle bar.
3. Click Week. Title is `Oct 11 – Oct 17, 2026`. Pack pills show on weekdays.
4. Click Group builder. Wide panel opens. Calendar remains visible. Drag one student between columns.
5. Click Interests approval. Panel switches (builder closes). Approve/unapprove still works. `applyCuratedSet` returns to Galaxy.
6. Click Set cadences. Interval select and history table still work. Launch cycle returns to Galaxy.
7. Click October cycle bar. Cadence panel opens. Click Curiosity survey bar. Approval panel opens. Click a pack pill. Builder opens.
8. Escape closes panel, then flips back.
9. Flip button label reads "Galaxy" on the back and "Mission Control" on the front.
10. Tasks rail is hidden on Galaxy.

- [ ] **Step 5: Commit**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
feat: wire flip navigation and exclusive task panel

EOF
)"
```

---

### Task 6: Regression sweep

**Files:**
- Modify: `galaxy_ui_classroom_hub.html` only if a check fails
- Test: `bun test`

**Interfaces:**
- Consumes: all prior public functions
- Produces: green unit suite and a passing browser checklist

- [ ] **Step 1: Run unit tests**

Run: `bun test`

Expected: PASS for `navState` and `calendarModel`.

- [ ] **Step 2: Grep for leftover tab navigation**

Run: `rg "switchView|tab-btn-cluster|tab-btn-preview|switchView\\(" galaxy_ui_classroom_hub.html`

Expected: no `switchView` calls. `tab-btn-preview` and `tab-btn-cluster` gone. `#view-preview` still present with `hidden`.

- [ ] **Step 3: Fix anything the sweep finds, then re-run `bun test`**

- [ ] **Step 4: Commit only if Step 3 changed files**

```bash
git add galaxy_ui_classroom_hub.html
git commit -m "$(cat <<'EOF'
fix: finish Mission Control flip regressions

EOF
)"
```

---

## Spec coverage

| Spec requirement | Task |
| --- | --- |
| One classroom flip, chrome stays | 3, 5 |
| Week + month grain | 2, 4 |
| Exclusive task panel + widths | 1, 3, 5 |
| Calendar stays visible | 3, 5 |
| Cycle / survey / pack clicks open tasks | 2, 4, 5 |
| Relocate builder, approval, cadence | 3, 5 |
| Hide student path from nav | 3, 5 |
| Escape + reduced motion | 3, 5 |
| Cycle launch returns to galaxy | 5 |
| Unit tests for state and calendar math | 1, 2, 6 |

## Self-review

- No TBD / "implement later" / "handle edge cases" steps.
- `openTask` / `flipFace` / `panelWidth` names match across Task 1 and Task 5.
- `approval` is the task id; the view id stays `view-curate`.
- October 2026 ends Saturday, so `monthWeeks` last cell is `2026-10-31`.
- `setFace` is a binary flip. Do not call `flipFace` when already on that face.
