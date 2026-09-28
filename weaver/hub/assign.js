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
