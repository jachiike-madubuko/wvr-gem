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
