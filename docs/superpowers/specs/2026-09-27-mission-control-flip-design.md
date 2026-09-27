# Mission Control Flip Card

Date: 2026-09-27
Status: draft for review
Product: Weaver Classroom Hub (`galaxy_ui_classroom_hub.html`)

## Problem

The hub has five sidebar destinations: cluster map, group builder, curate topics, rotation cadence, and student path preview. That splits one teacher job (see the room, then plan the room) across five pages. The galaxy should stay a simple map. All planning work belongs on one other face.

## Goal

One classroom-wide card. Front is the galaxy. Flip the stage to Mission Control. Mission Control is a calendar with week and month grain, plus one exclusive side panel for Group builder, Interests approval, and Set cadences.

## Locked decisions

- Spatial model: one classroom card. Not one card per interest pack. Not a nested second flip.
- Calendar grain: one grid, two zooms. Month shows rotation pace. Week shows daily group pace. Segmented control switches grain.
- Flip is the only face change. No five-item tool list as primary navigation.
- Side panel is exclusive. One task open at a time. Clicking the active task closes it.
- Group builder panel is wide: `min(40rem, 50vw)`. Approval and cadence panels are `24rem`.
- Calendar stays visible when a panel is open. The grid compresses. It does not unmount.
- Student path preview is out of this spec. Keep the existing markup and JS. Remove it from primary navigation. Do not delete the code.
- Do not introduce React into the hub. Port calendar math from `weaver/_ds_bundle.js` `CalendarScreen` into vanilla JS. Match EventPill tokens (`--cal-unit`, `--cal-math`, `--cal-pill-h`).
- Topbar and sidebar do not flip. Only the main stage flips.
- No URL routing. No localStorage. In-memory state only.
- Demo fixture stays Room 204, October 2026, 24 first names, 8 active packs.

## Approaches considered

1. **Routes as pages.** Keep `switchView` and add a calendar page. Rejected. The flip is the product, not decoration on top of five tabs.
2. **Per-pack flip cards.** Galaxy stays a map; each pack flips to its own schedule. Rejected. You chose one classroom card. Nested flips fight "keep the galaxy simple."
3. **One stage flip + calendar + exclusive task panel (chosen).** Two faces. Calendar is the Mission Control face. The three existing work views become panel tasks. Lowest new surface area. Reuses current builder, curate, and cadence UIs.

## Architecture

Two faces share one `navState`: `{ face, grain, task }`.

- `face`: `galaxy` | `missionControl`
- `grain`: `month` | `week`
- `task`: `null` | `builder` | `approval` | `cadence`

`applyNav(state)` is the only DOM writer for chrome. It sets `data-face` on the stage, `data-panel` on the Mission Control layout, active classes on sidebar buttons, and which `.mc-task` is shown.

Calendar math lives in `weaver/hub/calendarModel.js`. Navigation rules live in `weaver/hub/navState.js`. The HTML file owns rendering, drag-and-drop, canvas, and drawers.

```
Sidebar (stable)     Topbar (stable)
        \                /
         \              /
        Flip stage (rotateY)
        /                \
   Galaxy face      Mission Control face
   cluster canvas   calendar + optional task panel
```

## Components

**Sidebar.** Brand and workspace stay. Replace the five Classroom Tools pills with:

- Faces: Galaxy, Mission Control
- Tasks (visible only when `face === missionControl`): Group builder, Interests approval, Set cadences

**Topbar.** Search, harmony badge, cycle badge, theme toggle stay. Cycle badge is a second flip control: click flips to Mission Control at month grain. A text button labeled "Flip" sits in `.topbar-actions` and toggles face.

**Flip stage.** Wraps current `<main class="app-main">`. Front face is today's cluster map (`#view-cluster`). Back face is `#view-mission`. CSS `transform-style: preserve-3d`, `rotateY(180deg)`, 520ms, `--ease-pin`. `prefers-reduced-motion: reduce` uses a 180ms opacity crossfade and no rotate.

**Mission Control calendar.** Sunday-start 7-column grid. Month shows every week of October 2026. Week shows the week containing `2026-10-12`. Prev / Today / Next move the focused week (week grain) or month (month grain). October is the only month with fixture blocks. Other months render an empty grid.

Block kinds:

- `unit` bar: "October cycle" spanning `2026-10-01` to `2026-10-31`. Click opens Set cadences.
- `lesson` bar: pack sessions on weekdays in the focused week (Space, Robotics, Ballet, and so on). Click opens Group builder.
- `lesson` bar: "Curiosity survey" on `2026-10-28`. Click opens Interests approval.

Pills use the same geometry as the design-system calendar: `--cal-date-row`, `--cal-pill-h`, `--cal-pill-gap`, `--cal-week-min-h`. Units use `--cal-unit`. Pack lessons use the pack color as the pill face. Survey uses `--cal-mix`.

**Task panel.** `#mcPanel` is the only side sheet. Moving `#view-builder`, `#view-curate`, and `#view-cadence` into it is a relocate, not a rewrite. Existing functions (`renderGroupBuilder`, `renderCurateView`, cadence modal) keep their IDs. `#view-preview` stays in the document, hidden, with no nav button.

## Data flow

1. Teacher clicks Galaxy, Mission Control, Flip, or the cycle badge.
2. `flipFace` or a direct `face` write updates `STATE.nav`.
3. Opening a task from Galaxy sets `face` to `missionControl` and `task` to that id in one `applyNav` call. The card flips, then the panel width animates.
4. `applyNav` updates chrome, then calls `renderMissionCalendar()` when the face is Mission Control, and the matching render function when a task is open.
5. Canvas resize runs when the face returns to Galaxy.

`confirmCycleLaunch` flips to Galaxy after the existing toast/suggest flow. It does not call `switchView('cluster')`.

## Error handling

- Unknown grain or task throws in the state module. The HTML never writes those strings except through the module.
- Missing calendar mount node: `renderMissionCalendar` returns without throwing.
- Flip during canvas drag: set `STATE.isDraggingCanvas = false` before flipping.
- Escape closes the student drawer or new-cycle modal if open. Else closes the task panel. Else flips from Mission Control back to Galaxy.
- Reduced motion still changes face and panel. Only the 3D rotate is skipped.

## Testing

Unit tests with `bun test` on `navState.js` and `calendarModel.js`. No DOM library. Browser checks are manual: open `galaxy_ui_classroom_hub.html`, flip, switch grain, open each task, confirm the calendar is still visible, confirm student path is gone from the sidebar.

## Out of scope

- Student path preview as a destination
- Per-pack flip cards
- Persisted nav state
- Real backend, auth, or live submissions
- React rewrite of the hub
- Editing calendar blocks by drag (click-to-open task only)
- Months other than October getting fixture events

## Success criteria

1. A teacher can go from galaxy to Mission Control and back with one flip. No other primary nav.
2. Month grain shows the October cycle bar and the survey day. Week grain shows weekday pack sessions.
3. Each of the three tasks opens in a side panel without leaving the calendar face.
4. Group builder remains usable: roster tray plus group columns still drag-and-drop, in the wide panel.
5. Student path is not reachable from the sidebar.
6. First names only. Zero new PII fields.
