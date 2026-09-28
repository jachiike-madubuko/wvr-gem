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
