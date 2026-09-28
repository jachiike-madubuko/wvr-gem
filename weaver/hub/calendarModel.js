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
