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

export function snapshotAssign(students, activeIds) {
  return {
    students: snapshotStudents(students),
    activeIds: [...activeIds],
  };
}

export function restoreSnapshot(students, activeIds, snapshot) {
  const restoredIds = [...(snapshot.activeIds ?? activeIds)];
  const source = snapshot.students ?? students;
  return {
    activeIds: restoredIds,
    students: snapshotStudents(source).map((s) => ({
      ...s,
      assignedPack: restoredIds.includes(s.assignedPack) ? s.assignedPack : null,
    })),
  };
}

export function pickTopPacks(students, packs, n) {
  const scored = packs.map((p, index) => ({
    id: p.id,
    index,
    count: students.filter((s) => s.assignedPack === p.id).length,
  }));
  scored.sort((a, b) => b.count - a.count || a.index - b.index);
  return scored.slice(0, n).sort((a, b) => a.index - b.index).map((p) => p.id);
}

export function applyPreset(students, packs) {
  const activeIds = pickTopPacks(students, packs, MAX_ACTIVE);
  return {
    activeIds,
    students: students.map((s) => ({
      ...s,
      assignedPack: activeIds.includes(s.assignedPack) ? s.assignedPack : null,
    })),
  };
}

function packIdForLabel(packs, label) {
  return (packs.find((p) => p.label === label) || {}).id;
}

function allowedActiveIds(student, packs, activeIds) {
  return student.preferences
    .map((label) => packIdForLabel(packs, label))
    .filter((id) => id && activeIds.includes(id));
}

function rebalanceAssignments(students, packs, activeIds) {
  if (!activeIds.length) return students;
  const next = students.map((s) => ({ ...s, preferences: [...s.preferences] }));
  const limit = next.length * Math.max(activeIds.length, 1);
  for (let i = 0; i < limit; i++) {
    const counts = Object.fromEntries(activeIds.map((id) => [id, 0]));
    for (const s of next) {
      if (s.assignedPack && counts[s.assignedPack] !== undefined) counts[s.assignedPack] += 1;
    }
    const ordered = activeIds.slice().sort((a, b) => counts[a] - counts[b] || activeIds.indexOf(a) - activeIds.indexOf(b));
    const smallest = ordered[0];
    const largest = ordered[ordered.length - 1];
    if (counts[largest] - counts[smallest] <= 1) break;
    const mover = next.find((s) => {
      if (s.assignedPack !== largest) return false;
      const allowed = allowedActiveIds(s, packs, activeIds);
      const dests = allowed.length ? allowed : activeIds;
      return dests.includes(smallest);
    });
    if (!mover) break;
    mover.assignedPack = smallest;
  }
  return next;
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
  const assigned = students.map((s) => {
    const allowed = allowedActiveIds(s, packs, activeIds);
    let target;
    if (allowed.length) target = allowed[Math.floor(rand() * allowed.length)];
    else target = activeIds.slice().sort((a, b) => counts[a] - counts[b])[0] || null;
    if (target) counts[target] += 1;
    return { ...s, assignedPack: target };
  });
  return rebalanceAssignments(assigned, packs, activeIds);
}
