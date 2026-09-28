# Group Builder Timeline

Date: 2026-09-27
Status: locked
Product: Weaver Classroom Hub

## Goal

Mission Control calendar shows who is in which interest group over time. Groups sit under a unit or a lesson plan. Cadence is a control box on Group builder, not its own task. Group builder is a simplified drag-and-drop galaxy. Max 4 active galaxies.

## Locked decisions

- Kill the Set cadences task. `TASKS.cadence` is removed. Tasks left: `builder`, `approval`.
- Cadence lives in a control box on Group builder.
- Cadence mode is `time` or `count`.
  - Time: `days` | `weeks` (number) or `range` (start + end ISO dates).
  - Count: number + toggle `lessons` | `plans`.
- Default cadence: time / weeks / 2.
- Default start: `preset` (current October assignments). Alternate: `blank` (all unassigned).
- Active galaxies: 0 to 4. Selecting a fifth is a no-op.
- Drag a student onto a pill that is not active: activate that galaxy (if under 4) and assign the student.
- Drag galaxy-to-galaxy: reassign.
- Suggest: prefer each kid's top listed active pack, then fill smallest groups.
- Shuffle: pick at random from each kid's top 5 that are active, then rebalance sizes. If none of the top 5 are active, assign to the smallest group.
- Reset: restore the snapshot taken at last preset/blank/suggest/shuffle, or the last save. Snapshot is `plan.baseline`.
- `...` beside the pill strip opens a side list of submissions that are not approved. Clicking one approves it and adds it as a selectable pill (not auto-activated).
- Plans are in-memory only. Status: `draft` | `saved`. Buttons: Save, Save as draft, Delete.
- Calendar bars: one bar per active galaxy across the cadence window. Label is the pack name. Click opens Group builder. Keep the existing week/month grid.
- No React. No localStorage. First names only. bun tests only.

## Out of scope

- Backend persistence
- More than 4 galaxies
- Rewriting Interests approval
- Per-pack flip cards
