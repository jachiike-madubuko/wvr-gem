/* @ds-bundle: {"format":4,"namespace":"WeaverDesignSystem_0700a8","components":[{"name":"EventPill","sourcePath":"components/classroom/EventPill.jsx"},{"name":"GroupColumn","sourcePath":"components/classroom/GroupColumn.jsx"},{"name":"PACK_COLORS","sourcePath":"components/classroom/PackAvatar.jsx"},{"name":"PackAvatar","sourcePath":"components/classroom/PackAvatar.jsx"},{"name":"PinCard","sourcePath":"components/classroom/PinCard.jsx"},{"name":"StudentChip","sourcePath":"components/classroom/StudentChip.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"Segmented","sourcePath":"components/core/Segmented.jsx"},{"name":"Table","sourcePath":"components/core/Table.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"IconDisc","sourcePath":"components/navigation/IconDisc.jsx"},{"name":"SidebarNav","sourcePath":"components/navigation/SidebarNav.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/classroom/EventPill.jsx":"9e0fe7aca6da","components/classroom/GroupColumn.jsx":"a1d1a4be5ccb","components/classroom/PackAvatar.jsx":"5ed9efe4f3cb","components/classroom/PinCard.jsx":"eaf0a305b0ba","components/classroom/StudentChip.jsx":"2c2ce25cd48f","components/core/Badge.jsx":"08570cd4134d","components/core/Button.jsx":"76e3b85b6115","components/core/Chip.jsx":"7b21e3318ac8","components/core/Input.jsx":"2b9962459131","components/core/Panel.jsx":"e2b96e113d7d","components/core/Segmented.jsx":"39a53e198a11","components/core/Table.jsx":"8a5e653973eb","components/core/Toast.jsx":"0ab2c95cce01","components/navigation/IconDisc.jsx":"a9295948ee9e","components/navigation/SidebarNav.jsx":"73f2a0184f12","components/navigation/TopBar.jsx":"9668abad4f27","ui_kits/student-path/StudentPath.jsx":"bbe011d66be5","ui_kits/teacher-app/CalendarScreen.jsx":"9197de06b723","ui_kits/teacher-app/GroupBuilder.jsx":"1db666ee8868","ui_kits/teacher-app/OtherScreens.jsx":"9b69c6ade003","ui_kits/teacher-app/PlanDrawer.jsx":"0adfc680c554","ui_kits/teacher-app/QuickAdd.jsx":"03b41171e05a","ui_kits/teacher-app/data.js":"0161cbd6e738"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WeaverDesignSystem_0700a8 = window.WeaverDesignSystem_0700a8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/classroom/EventPill.jsx
try { (() => {
const SUBJECT_FACE = {
  math: {
    background: "var(--cal-math)",
    color: "#fff"
  },
  ela: {
    background: "var(--cal-ela)",
    color: "#fff"
  },
  science: {
    background: "var(--cal-science)",
    color: "#fff"
  },
  ss: {
    background: "var(--cal-ss)",
    color: "#fff"
  },
  art: {
    background: "var(--cal-art)",
    color: "#fff"
  },
  mix: {
    background: "var(--cal-mix)",
    color: "#fff"
  }
};
function radius(roundStart, roundEnd) {
  if (roundStart && roundEnd) return "var(--radius-pill)";
  if (roundStart) return "var(--radius-pill) 0 0 var(--radius-pill)";
  if (roundEnd) return "0 var(--radius-pill) var(--radius-pill) 0";
  return "0";
}

/** A calendar bar. Units are gold; a lesson takes its first subject's colour, math+ELA becomes mix violet. */
function EventPill({
  label,
  kind = "lesson",
  subjects = ["math"],
  status = "planned",
  generating = false,
  roundStart = true,
  roundEnd = true,
  style,
  onClick
}) {
  const face = kind === "unit" ? {
    background: "var(--cal-unit)",
    color: "var(--cal-unit-ink)"
  } : subjects.includes("math") && subjects.includes("ela") ? SUBJECT_FACE.mix : SUBJECT_FACE[subjects[0]] || SUBJECT_FACE.math;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "block",
      width: "100%",
      height: "var(--cal-pill-h)",
      padding: "0 var(--space-2)",
      textAlign: "left",
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-semibold)",
      fontFamily: "var(--font-sans)",
      border: "1px solid transparent",
      cursor: "pointer",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      borderRadius: radius(roundStart, roundEnd),
      boxShadow: status === "generated" ? "var(--ring-generated)" : "none",
      animation: generating ? "weaver-pulse 2s var(--ease-standard) infinite" : "none",
      ...face,
      ...style
    }
  }, label);
}
Object.assign(__ds_scope, { EventPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/classroom/EventPill.jsx", error: String((e && e.message) || e) }); }

// components/classroom/GroupColumn.jsx
try { (() => {
/** Dashed drop zone for one interest group. Highlights to the locked blue while dragging over. */
function GroupColumn({
  label,
  count,
  over = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 140,
      borderRadius: "var(--radius-shell)",
      padding: "var(--space-4)",
      border: "2px dashed " + (over ? "var(--ink)" : "transparent"),
      background: over ? "var(--locked)" : "var(--surface-muted)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: "var(--ink-faint)",
      fontVariantNumeric: "tabular-nums"
    }
  }, count)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start",
      gap: "var(--space-2)",
      minHeight: 64
    }
  }, children));
}
Object.assign(__ds_scope, { GroupColumn });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/classroom/GroupColumn.jsx", error: String((e && e.message) || e) }); }

// components/classroom/PackAvatar.jsx
try { (() => {
const PACK_COLORS = {
  pack_soccer: "#2fb86e",
  pack_cooking: "#f07167",
  pack_video_games: "#4f7cff",
  pack_music: "#a855f7",
  pack_skate: "#f59e0b",
  pack_space: "#0ea5e9",
  pack_animals: "#84cc16",
  pack_fashion: "#ec4899",
  pack_basketball: "#ef4444",
  pack_coding: "#6366f1"
};
const SIZES = {
  sm: 24,
  md: 36,
  lg: 44
};

/** Two-letter interest-pack disc. The pack's colour is its identity everywhere it appears. */
function PackAvatar({
  short,
  color,
  packId,
  size = "md",
  style
}) {
  const px = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: px,
      height: px,
      borderRadius: "999px",
      background: color || PACK_COLORS[packId] || "var(--signal-blue)",
      color: "#fff",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-bold)",
      fontSize: px <= 24 ? "var(--text-micro)" : "var(--text-tiny)",
      letterSpacing: "0.02em",
      boxShadow: "var(--shadow-chip)",
      ...style
    }
  }, short);
}
Object.assign(__ds_scope, { PACK_COLORS, PackAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/classroom/PackAvatar.jsx", error: String((e && e.message) || e) }); }

// components/classroom/PinCard.jsx
try { (() => {
const FACE = {
  hook: {
    bg: "var(--pin-hook)",
    ink: "var(--pin-hook-ink)",
    minH: 248,
    kicker: "Start"
  },
  try: {
    bg: "var(--pin-try)",
    ink: "var(--pin-try-ink)",
    minH: 318,
    kicker: "Try"
  },
  check: {
    bg: "var(--pin-check)",
    ink: "var(--pin-check-ink)",
    minH: 196,
    kicker: "Check"
  },
  next: {
    bg: "var(--pin-next)",
    ink: "var(--pin-next-ink)",
    minH: 276,
    kicker: "Next"
  }
};
function Lock() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 32 32",
    width: "44",
    height: "44",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "14",
    width: "20",
    height: "14",
    rx: "4",
    fill: "#d4d4d8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14V11a6 6 0 0 1 12 0v3",
    fill: "none",
    stroke: "#d4d4d8",
    strokeWidth: "3",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "21",
    r: "2.2",
    fill: "#3f3f46"
  }));
}

/** One pin in the student path: four block kinds, three gate states, unlocked in order. */
function PinCard({
  kind = "hook",
  index = 0,
  title,
  body,
  action = "Done",
  state = "current",
  index1,
  onComplete,
  style
}) {
  const face = FACE[kind] || FACE.hook;
  const num = index1 != null ? index1 : index + 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: state === "current" ? "student-glow var(--dur-glow) ease-in-out infinite" : "none",
      borderRadius: "var(--radius-pin)"
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "var(--radius-pin)",
      background: face.bg,
      color: face.ink,
      minHeight: face.minH,
      filter: state === "done" ? "saturate(0.92)" : "none",
      animation: "student-pin-in var(--dur-pin-in) var(--ease-pin) both",
      animationDelay: index * 70 + "ms",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-kicker)",
      opacity: 0.7
    }
  }, face.kicker), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 24,
      height: 24,
      borderRadius: "999px",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-black)",
      background: face.ink,
      color: face.bg
    }
  }, state === "done" ? "✓" : num)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "var(--space-2) 0 0",
      fontFamily: "var(--font-serif-display)",
      fontSize: "var(--text-pin-title)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: "var(--leading-snug)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      flex: 1,
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-medium)",
      lineHeight: "var(--leading-snug)",
      opacity: 0.9
    }
  }, body), state === "current" ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onComplete,
    style: {
      marginTop: "var(--space-3)",
      width: "100%",
      borderRadius: "var(--radius-pill)",
      border: 0,
      padding: "0.625rem var(--space-3)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      cursor: "pointer",
      background: face.ink,
      color: face.bg,
      animation: "student-cta-pop var(--dur-cta-pop) var(--ease-pin) both"
    }
  }, action) : /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      opacity: state === "done" ? 0.7 : 0.4
    }
  }, state === "done" ? "Done" : "Locked")), state === "locked" ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "color-mix(in srgb, var(--student-lock) 70%, transparent)",
      backdropFilter: "blur(1.5px)"
    }
  }, /*#__PURE__*/React.createElement(Lock, null)) : null));
}
Object.assign(__ds_scope, { PinCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/classroom/PinCard.jsx", error: String((e && e.message) || e) }); }

// components/classroom/StudentChip.jsx
try { (() => {
/** Draggable first-name pill. First names are the only student identity Weaver ever renders. */
function StudentChip({
  name,
  tone = "default",
  note,
  draggable = true,
  style
}) {
  const face = tone === "outlier" ? {
    background: "var(--highlight)",
    color: "var(--ink)",
    boxShadow: "none"
  } : {
    background: "var(--surface)",
    color: "var(--ink)",
    boxShadow: "var(--shadow-chip)"
  };
  return /*#__PURE__*/React.createElement("span", {
    draggable: draggable,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      borderRadius: "var(--radius-pill)",
      padding: "0.375rem 0.75rem",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      fontFamily: "var(--font-sans)",
      cursor: draggable ? "grab" : "default",
      ...face,
      ...style
    }
  }, name, note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--weight-regular)",
      color: "var(--ink-soft)"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { StudentChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/classroom/StudentChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    background: "var(--surface-muted)",
    color: "var(--ink-soft)"
  },
  balanced: {
    background: "var(--changed)",
    color: "var(--signal-mint)"
  },
  locked: {
    background: "var(--locked)",
    color: "var(--ink-soft)"
  },
  highlight: {
    background: "var(--highlight)",
    color: "var(--ink)"
  },
  error: {
    background: "var(--error-surface)",
    color: "var(--signal-coral)"
  }
};

/** Read-only status pill: group balance, locked standards, inline errors. */
function Badge({
  tone = "neutral",
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "var(--radius-pill)",
      padding: "0.25rem 0.75rem",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-medium)",
      fontFamily: "var(--font-sans)",
      ...TONES[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  primary: {
    background: "var(--action-primary)",
    color: "var(--action-primary-ink)",
    border: "1px solid transparent"
  },
  create: {
    background: "var(--action-create)",
    color: "#fff",
    border: "1px solid transparent"
  },
  unit: {
    background: "var(--action-unit)",
    color: "var(--action-unit-ink)",
    border: "1px solid transparent"
  },
  outline: {
    background: "transparent",
    color: "var(--ink)",
    border: "1px solid var(--line)"
  },
  muted: {
    background: "var(--surface-muted)",
    color: "var(--ink-soft)",
    border: "1px solid transparent"
  },
  ghost: {
    background: "transparent",
    color: "var(--ink-soft)",
    border: "1px solid transparent"
  }
};
const SIZES = {
  sm: {
    padding: "0.375rem 0.75rem",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--weight-semibold)"
  },
  md: {
    padding: "0.375rem 0.75rem",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--weight-medium)"
  },
  lg: {
    padding: "0.625rem 1rem",
    fontSize: "var(--text-sm)",
    fontWeight: "var(--weight-medium)"
  }
};

/** Pill button. Weaver has no square buttons — every action is a full-radius pill. */
function Button({
  variant = "primary",
  size = "lg",
  disabled = false,
  as = "button",
  href,
  icon,
  children,
  onClick,
  style,
  ...rest
}) {
  const Tag = as === "a" ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({}, Tag === "a" ? {
    href
  } : {
    type: "button",
    disabled
  }, {
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      justifyContent: "center",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-sans)",
      lineHeight: 1.2,
      textDecoration: "none",
      cursor: disabled ? "default" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background 120ms var(--ease-standard), color 120ms var(--ease-standard)",
      ...SIZES[size],
      ...VARIANTS[variant],
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
const TONES = {
  ink: {
    on: {
      background: "var(--ink)",
      color: "var(--accent-contrast)"
    },
    off: {
      background: "var(--surface-muted)",
      color: "var(--ink-soft)"
    }
  },
  standard: {
    on: {
      background: "var(--cal-mix)",
      color: "#fff"
    },
    off: {
      background: "var(--surface-muted)",
      color: "var(--ink-faint)",
      border: "1px dashed var(--line)"
    }
  },
  theme: {
    on: {
      background: "var(--cal-art)",
      color: "#fff"
    },
    off: {
      background: "var(--surface-muted)",
      color: "var(--ink-soft)"
    }
  },
  unit: {
    on: {
      background: "var(--cal-unit)",
      color: "var(--cal-unit-ink)"
    },
    off: {
      background: "var(--surface-muted)",
      color: "var(--ink-soft)"
    }
  },
  create: {
    on: {
      background: "var(--action-create)",
      color: "#fff"
    },
    off: {
      background: "var(--surface-muted)",
      color: "var(--ink-soft)"
    }
  }
};

/** Toggleable pill. Carries subjects, interest packs, standards and themes. */
function Chip({
  tone = "ink",
  on = false,
  size = "md",
  prefix,
  count,
  children,
  onClick,
  title,
  style
}) {
  const face = (TONES[tone] || TONES.ink)[on ? "on" : "off"];
  const pad = size === "sm" ? "0.25rem 0.625rem" : "0.375rem 0.75rem";
  const fs = size === "sm" ? "var(--text-tiny)" : "var(--text-xs)";
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: title,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      borderRadius: "var(--radius-pill)",
      padding: pad,
      fontSize: fs,
      fontWeight: "var(--weight-medium)",
      fontFamily: "var(--font-sans)",
      border: "1px solid transparent",
      cursor: "pointer",
      lineHeight: 1.3,
      ...face,
      ...style
    }
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      opacity: 0.8
    }
  }, prefix) : null, children, count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums",
      opacity: 0.8
    }
  }, count) : null);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/** Pill text field on the inset surface. "underline" is the Quick Add title field. */
function Input({
  variant = "pill",
  label,
  value,
  placeholder,
  type = "text",
  disabled = false,
  trailing,
  onChange,
  width,
  style
}) {
  const base = {
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)",
    color: "var(--ink)",
    outline: "none",
    width: "100%",
    background: "var(--surface-muted)"
  };
  const faces = {
    pill: {
      ...base,
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-pill)",
      padding: "0.5rem 1rem"
    },
    search: {
      ...base,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-pill)",
      padding: "0 1rem",
      height: "2.25rem",
      color: "var(--ink-faint)"
    },
    underline: {
      ...base,
      background: "transparent",
      border: 0,
      borderBottom: "1px solid color-mix(in srgb, var(--ink) 30%, transparent)",
      borderRadius: 0,
      padding: "0 0 0.5rem",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-medium)"
    },
    otp: {
      ...base,
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-pill)",
      padding: "0.5rem 1rem",
      letterSpacing: "var(--tracking-otp)"
    }
  };
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: width || "100%"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    style: {
      ...faces[variant],
      ...style
    }
  }), trailing ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "var(--text-tiny)",
      color: "var(--ink-faint)",
      pointerEvents: "none"
    }
  }, trailing) : null);
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: "var(--text-xs)",
      color: "var(--ink-soft)",
      width: width || "100%"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: "var(--space-1)"
    }
  }, field));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
/** The one container in Weaver: paper surface, 1.5rem radius, one soft shadow, no border. */
function Panel({
  kicker,
  title,
  description,
  actions,
  size = "shell",
  padding,
  children,
  style
}) {
  const radius = size === "card" ? "var(--radius-card)" : "var(--radius-shell)";
  const pad = padding || (size === "card" ? "var(--space-5)" : "var(--space-6)");
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      borderRadius: radius,
      padding: pad,
      boxShadow: "var(--shadow-panel)",
      ...style
    }
  }, kicker || title || description || actions ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, kicker ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-kicker)"
    }
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "var(--space-1) 0 0",
      fontSize: size === "card" ? "var(--text-2xl)" : "var(--text-3xl)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-heading)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-2) 0 0",
      maxWidth: "36rem",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, description) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)"
    }
  }, actions) : null) : null, children);
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/Segmented.jsx
try { (() => {
/** Hairline-bordered pill group with one black active segment (month|week, lesson|unit). */
function Segmented({
  options = [],
  value,
  onChange,
  activeTone = "ink"
}) {
  const activeFace = activeTone === "unit" ? {
    background: "var(--cal-unit)",
    color: "var(--cal-unit-ink)"
  } : activeTone === "create" ? {
    background: "var(--action-create)",
    color: "#fff"
  } : {
    background: "var(--ink)",
    color: "var(--accent-contrast)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      gap: 0,
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--line)",
      padding: "0.125rem"
    }
  }, options.map(opt => {
    const id = typeof opt === "string" ? opt : opt.id;
    const label = typeof opt === "string" ? opt : opt.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onChange && onChange(id),
      style: {
        borderRadius: "var(--radius-pill)",
        border: "1px solid transparent",
        padding: "0.25rem 0.75rem",
        fontSize: "var(--text-sm)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        textTransform: "capitalize",
        ...(active ? activeFace : {
          background: "transparent",
          color: "var(--ink-soft)"
        })
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/core/Table.jsx
try { (() => {
/** Hairline table inside a rounded clip. Header is the inset surface in 11px uppercase. */
function Table({
  columns = [],
  rows = [],
  caption,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderRadius: "var(--radius-shell)",
      border: "1px solid var(--line)",
      background: "var(--surface)"
    }
  }, caption || action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-2) var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--ink-faint)"
    }
  }, caption), action) : null, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      textAlign: "left",
      borderCollapse: "collapse",
      fontSize: "var(--text-sm)"
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      background: "var(--surface-muted)"
    }
  }, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c,
    style: {
      padding: "var(--space-3) var(--space-4)",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-medium)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--ink-faint)"
    }
  }, c)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderTop: "1px solid var(--line)"
    }
  }, row.map((cell, j) => /*#__PURE__*/React.createElement("td", {
    key: j,
    style: {
      padding: "var(--space-3) var(--space-4)",
      color: j === 0 ? "var(--ink)" : "var(--ink-soft)",
      fontWeight: j === 0 ? "var(--weight-medium)" : "var(--weight-regular)"
    }
  }, cell)))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Table.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
/** Bottom-centre black capsule. The only global status surface in the app. */
function Toast({
  children,
  spinner = true,
  fixed = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      background: "var(--ink)",
      color: "#fff",
      borderRadius: "var(--radius-pill)",
      padding: "0.625rem 1rem",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)",
      fontFamily: "var(--font-sans)",
      boxShadow: "var(--shadow-popover)",
      ...(fixed ? {
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50
      } : null),
      ...style
    }
  }, spinner ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: "1rem",
      height: "1rem",
      borderRadius: "999px",
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff",
      animation: "weaver-spin 1s linear infinite"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/navigation/IconDisc.jsx
try { (() => {
/** 36px hairline disc holding a single glyph — the theme toggle and mobile menu button. */
function IconDisc({
  glyph,
  label,
  onClick,
  active = false,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    title: label,
    "aria-label": label,
    style: {
      display: "grid",
      placeItems: "center",
      width: "2.25rem",
      height: "2.25rem",
      borderRadius: "999px",
      border: "1px solid var(--line)",
      cursor: "pointer",
      background: active ? "var(--ink)" : "var(--surface)",
      color: active ? "var(--accent-contrast)" : "var(--ink-soft)",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true
  }, glyph));
}
Object.assign(__ds_scope, { IconDisc });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/IconDisc.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SidebarNav.jsx
try { (() => {
/** Fixed 15.5rem rail: brand, workspace, black-pill active nav. Four items, no icons, no badges. */
function SidebarNav({
  items = [],
  active,
  workspace = "My classroom",
  brand = "Weaver",
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      width: "var(--sidebar-w)",
      flex: "0 0 var(--sidebar-w)",
      borderRight: "1px solid var(--line)",
      background: "var(--surface)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      borderBottom: "1px solid var(--line)",
      padding: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      placeItems: "center",
      width: 32,
      height: 32,
      borderRadius: "999px",
      background: "var(--ink)",
      color: "var(--accent-contrast)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "W"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.9375rem",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, brand)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-4) 0"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--ink-faint)"
    }
  }, "Workspace"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-1) 0 0",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)"
    }
  }, workspace)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.125rem",
      padding: "var(--space-4) var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 var(--space-1)",
      padding: "0 var(--space-2)",
      fontSize: "var(--text-micro)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--ink-faint)"
    }
  }, "Menu"), items.map(item => {
    const id = typeof item === "string" ? item : item.id;
    const label = typeof item === "string" ? item : item.label;
    const on = id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      onClick: () => onSelect && onSelect(id),
      style: {
        textAlign: "left",
        borderRadius: "var(--radius-pill)",
        border: 0,
        cursor: "pointer",
        padding: "0.5rem var(--space-3)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        fontFamily: "var(--font-sans)",
        background: on ? "var(--ink)" : "transparent",
        color: on ? "var(--accent-contrast)" : "var(--ink-soft)"
      }
    }, label);
  })));
}
Object.assign(__ds_scope, { SidebarNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SidebarNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
/** Sticky 3.5rem chrome: translucent canvas, blurred, disabled search, right-aligned utilities. */
function TopBar({
  search = "Search lessons…",
  shortcut = "⌘K",
  right,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      height: "var(--topbar-h)",
      padding: "0 var(--space-5)",
      borderBottom: "1px solid color-mix(in srgb, var(--line) 70%, transparent)",
      background: "color-mix(in srgb, var(--canvas) 90%, transparent)",
      backdropFilter: "blur(var(--blur-chrome))",
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      position: "relative",
      flex: 1,
      minWidth: 0,
      maxWidth: "28rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sr-only"
  }, "Search"), /*#__PURE__*/React.createElement("input", {
    type: "search",
    placeholder: search,
    disabled: true,
    style: {
      height: "2.25rem",
      width: "100%",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      padding: "0 1rem",
      fontSize: "var(--text-sm)",
      fontFamily: "var(--font-sans)",
      color: "var(--ink-faint)",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "0.75rem",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "var(--text-tiny)",
      color: "var(--ink-faint)",
      pointerEvents: "none"
    }
  }, shortcut)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)"
    }
  }, right));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/student-path/StudentPath.jsx
try { (() => {
const {
  PinCard,
  PackAvatar
} = window.WeaverDesignSystem_0700a8;
function StudentPath({
  payload,
  standards
}) {
  const [doneIds, setDoneIds] = React.useState([]);
  const [burst, setBurst] = React.useState(false);
  const total = payload.blocks.length;
  const doneCount = doneIds.length;
  const finished = doneCount >= total;
  function complete(block) {
    setDoneIds(ids => ids.includes(block.id) ? ids : [...ids, block.id]);
    setBurst(true);
    window.setTimeout(() => setBurst(false), 900);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      margin: "0 auto",
      minHeight: "100dvh",
      maxWidth: "var(--student-max-w)",
      overflowX: "hidden",
      background: "var(--student-bg)",
      color: "#fff",
      paddingBottom: "7rem"
    }
  }, burst ? /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: "none",
      position: "absolute",
      left: 0,
      right: 0,
      top: 64,
      zIndex: 30,
      display: "flex",
      justifyContent: "center",
      gap: "var(--space-3)",
      fontSize: "1.875rem"
    }
  }, ["✦", "★", "✧", "●", "✦", "★"].map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-block",
      animation: "student-burst var(--dur-burst) ease-out both",
      animationDelay: i * 40 + "ms"
    }
  }, m))) : null, /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(var(--blur-chrome))",
      padding: "var(--space-3) var(--space-3) var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(PackAvatar, {
    short: payload.short,
    color: payload.color,
    size: "md"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "rgba(255,255,255,0.5)"
    }
  }, finished ? "You finished" : doneCount + " of " + total)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-student)",
      color: "rgba(255,255,255,0.45)"
    }
  }, payload.packLabel), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif-display)",
      fontSize: "var(--text-student-h1)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, payload.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      display: "flex",
      gap: "var(--space-2)",
      overflowX: "auto",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "#fff",
      color: "#000",
      padding: "0.25rem 0.75rem",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "All"), standards.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.id,
    style: {
      flexShrink: 0,
      borderRadius: "var(--radius-pill)",
      background: "rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.8)",
      padding: "0.25rem 0.75rem",
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-medium)",
      whiteSpace: "nowrap"
    }
  }, s.plain)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "start",
      gap: "var(--space-2)",
      padding: "0 var(--space-2)"
    }
  }, payload.blocks.map((block, index) => {
    const state = doneIds.includes(block.id) ? "done" : index === doneCount ? "current" : "locked";
    return /*#__PURE__*/React.createElement(PinCard, {
      key: block.id,
      kind: block.kind,
      index: index,
      title: block.title,
      body: block.body,
      action: block.action,
      state: state,
      onComplete: () => complete(block)
    });
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Progress",
    style: {
      position: "fixed",
      bottom: "1rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      borderRadius: "var(--radius-pill)",
      background: "var(--student-nav)",
      padding: "0.75rem 2rem",
      boxShadow: "var(--shadow-student-nav)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-tiny)",
      fontWeight: "var(--weight-black)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "#fff"
    }
  }, "Pins"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.8125rem",
      fontWeight: "var(--weight-bold)",
      fontVariantNumeric: "tabular-nums",
      color: "rgba(255,255,255,0.8)"
    }
  }, doneCount, "/", total), /*#__PURE__*/React.createElement(PackAvatar, {
    short: payload.short,
    color: payload.color,
    size: "sm"
  })));
}
Object.assign(window, {
  StudentPath
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/student-path/StudentPath.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/CalendarScreen.jsx
try { (() => {
(() => {
  const {
    Panel,
    Button,
    Segmented,
    EventPill,
    Toast
  } = window.WeaverDesignSystem_0700a8;
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const DATE_ROW = 32,
    PILL_H = 20,
    PILL_GAP = 2;
  function monthWeeks(year, month) {
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    const weeks = [];
    for (let w = 0; w < 6; w++) {
      const dates = [];
      for (let d = 0; d < 7; d++) {
        const cur = new Date(start);
        cur.setDate(start.getDate() + w * 7 + d);
        dates.push(cur.toISOString().slice(0, 10));
      }
      weeks.push(dates);
      if (dates[6] > new Date(year, month + 1, 0).toISOString().slice(0, 10)) break;
    }
    return weeks;
  }
  function layoutWeekBars(blocks, dates) {
    const laneEnds = [],
      out = [];
    blocks.filter(b => b.start <= dates[6] && b.end >= dates[0]).sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)).forEach(b => {
      const s = b.start < dates[0] ? dates[0] : b.start;
      const e = b.end > dates[6] ? dates[6] : b.end;
      const colStart = dates.indexOf(s),
        colEnd = dates.indexOf(e);
      if (colStart < 0 || colEnd < 0) return;
      let lane = laneEnds.findIndex(last => last < s);
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
        continuesEnd: b.end > dates[6]
      });
    });
    return out;
  }
  function CalendarScreen({
    blocks,
    view,
    onView,
    onOpenBlock,
    onQuickAdd,
    generatingId,
    busy
  }) {
    const year = 2026,
      month = 10;
    const weeks = React.useMemo(() => monthWeeks(year, month), []);
    const rows = view === "week" ? weeks.slice(1, 2) : weeks;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      kicker: "Calendar",
      title: view === "week" ? "Nov 8 – Nov 14, 2026" : "November 2026",
      description: "Room 204 \u2014 2nd grade. Click a day or drag a range to drop a lesson. Save maps the month. More options opens a side panel.",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Segmented, {
        options: ["month", "week"],
        value: view,
        onChange: onView
      }), /*#__PURE__*/React.createElement(Button, {
        variant: "create",
        size: "md",
        onClick: () => onQuickAdd("2026-11-16", "lesson")
      }, "New lesson"), /*#__PURE__*/React.createElement(Button, {
        variant: "unit",
        size: "md",
        onClick: () => onQuickAdd("2026-11-16", "unit")
      }, "New unit"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        size: "md"
      }, "Prev"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        size: "md"
      }, "Today"), /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        size: "md"
      }, "Next"))
    }), /*#__PURE__*/React.createElement(Panel, {
      padding: "var(--space-5)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(7,1fr)",
        gap: 1,
        textAlign: "center",
        fontSize: "var(--text-xs)",
        color: "var(--ink-faint)"
      }
    }, WEEKDAYS.map(d => /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        padding: "var(--space-1) 0",
        fontWeight: "var(--weight-medium)"
      }
    }, d))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-1)",
        overflow: "hidden",
        borderRadius: "var(--radius-grid)",
        border: "1px solid var(--line)",
        background: "var(--line)"
      }
    }, rows.map(dates => {
      const bars = layoutWeekBars(blocks, dates);
      const lanes = bars.reduce((n, b) => Math.max(n, b.lane + 1), 0);
      const minH = Math.max(view === "week" ? 220 : 96, DATE_ROW + lanes * (PILL_H + PILL_GAP) + 8);
      return /*#__PURE__*/React.createElement("div", {
        key: dates[0],
        style: {
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 1,
          background: "var(--line)",
          minHeight: minH
        }
      }, dates.map(date => {
        const inMonth = Number(date.slice(5, 7)) === month + 1;
        const isToday = date === "2026-11-12";
        return /*#__PURE__*/React.createElement("div", {
          key: date,
          onClick: () => onQuickAdd(date, "lesson"),
          style: {
            minHeight: minH,
            padding: "0.375rem",
            cursor: "pointer",
            userSelect: "none",
            background: inMonth ? "var(--surface)" : "color-mix(in srgb, var(--surface-muted) 40%, var(--surface))",
            boxShadow: isToday ? "var(--ring-today)" : "none"
          }
        }, /*#__PURE__*/React.createElement("span", {
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "999px",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-semibold)",
            background: isToday ? "var(--signal-blue)" : "transparent",
            color: isToday ? "#fff" : inMonth ? "var(--ink)" : "var(--ink-faint)"
          }
        }, Number(date.slice(8))));
      }), bars.map(({
        block,
        lane,
        colStart,
        colSpan,
        continuesStart,
        continuesEnd
      }) => /*#__PURE__*/React.createElement("div", {
        key: block.id + dates[0],
        style: {
          position: "absolute",
          gridColumn: colStart + 1 + " / span " + colSpan,
          left: 4,
          right: 4,
          top: DATE_ROW + lane * (PILL_H + PILL_GAP),
          zIndex: 10
        }
      }, /*#__PURE__*/React.createElement(EventPill, {
        label: block.title,
        kind: block.kind,
        subjects: block.subjects,
        status: block.status,
        generating: generatingId === block.id,
        roundStart: !continuesStart,
        roundEnd: !continuesEnd,
        onClick: e => onOpenBlock(block)
      }))));
    }))), busy ? /*#__PURE__*/React.createElement(Toast, null, "Claude is writing packets") : null);
  }
  Object.assign(window, {
    CalendarScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/CalendarScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/GroupBuilder.jsx
try { (() => {
(() => {
  const {
    Panel,
    Button,
    Chip,
    Badge,
    PackAvatar,
    StudentChip,
    GroupColumn,
    Table
  } = window.WeaverDesignSystem_0700a8;
  function buildAssignment(students, packIds) {
    const counts = {};
    packIds.forEach(p => counts[p] = 0);
    const assignment = {};
    students.forEach(s => {
      const match = s.interests.find(i => packIds.includes(i));
      const target = match || packIds.slice().sort((a, b) => counts[a] - counts[b])[0];
      assignment[s.id] = target;
      counts[target] += 1;
    });
    return assignment;
  }
  function GroupBuilder({
    compact = false,
    packs,
    students,
    selected,
    onSelected,
    assignment,
    onAssignment,
    note
  }) {
    const [dragOver, setDragOver] = React.useState(null);
    const [dragged, setDragged] = React.useState(null);
    const counts = {};
    Object.values(assignment).forEach(id => counts[id] = (counts[id] || 0) + 1);
    const sizes = selected.map(id => counts[id] || 0);
    const balanced = sizes.length > 2 && Math.max(...sizes) - Math.min(...sizes) <= 2;
    const outliers = students.filter(s => !s.interests.some(i => selected.includes(i)));
    const packOf = id => packs.find(p => p.packId === id);
    function togglePack(packId) {
      const on = selected.includes(packId);
      const next = on ? selected.filter(id => id !== packId) : selected.length < 4 ? [...selected, packId] : selected;
      onSelected(next);
      onAssignment(buildAssignment(students, next));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-lg)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-tight)"
      }
    }, "Groups"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 0",
        maxWidth: "34rem",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Suggest groups picks the three best interests. Add a new group from outliers if you want a fourth packet.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: balanced ? "balanced" : "neutral"
    }, selected.length < 3 ? "Need 3 groups" : balanced ? "Balanced" : "Uneven — drag to fix"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => onAssignment(buildAssignment(students, selected))
    }, "Suggest groups"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      onClick: () => onAssignment(buildAssignment(students, selected))
    }, "Reshuffle"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline"
    }, "Undo my edits"))), note ? /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        borderRadius: "var(--radius-card)",
        background: "var(--locked)",
        padding: "var(--space-2) var(--space-3)",
        fontSize: "var(--text-xs)",
        color: "var(--ink-soft)"
      }
    }, note) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        padding: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "0 0 var(--space-2)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, "Interests \xB7 pick 3, or 4 with outliers"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, packs.map(p => /*#__PURE__*/React.createElement(Chip, {
      key: p.packId,
      on: selected.includes(p.packId),
      count: selected.includes(p.packId) ? counts[p.packId] || 0 : undefined,
      title: p.label,
      onClick: () => togglePack(p.packId)
    }, compact ? p.short : p.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(" + Math.max(selected.length, 1) + ",1fr)",
        gap: "var(--space-3)"
      }
    }, selected.map(packId => /*#__PURE__*/React.createElement("div", {
      key: packId,
      onDragOver: e => {
        e.preventDefault();
        setDragOver(packId);
      },
      onDragLeave: () => setDragOver(c => c === packId ? null : c),
      onDrop: e => {
        e.preventDefault();
        if (dragged) onAssignment({
          ...assignment,
          [dragged]: packId
        });
        setDragOver(null);
        setDragged(null);
      }
    }, /*#__PURE__*/React.createElement(GroupColumn, {
      label: (packOf(packId) || {}).label || packId,
      count: counts[packId] || 0,
      over: dragOver === packId
    }, students.filter(s => assignment[s.id] === packId).map(s => /*#__PURE__*/React.createElement("span", {
      key: s.id,
      onDragStart: () => setDragged(s.id)
    }, /*#__PURE__*/React.createElement(StudentChip, {
      name: s.firstName
    }))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        padding: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, "Outliers"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 0",
        fontSize: "var(--text-xs)",
        color: "var(--ink-soft)"
      }
    }, "Kids whose interests sit outside the selected groups. Make a one-off studio packet for them.")), outliers.length && selected.length < 4 ? /*#__PURE__*/React.createElement(Button, {
      variant: "unit",
      size: "sm"
    }, "New group") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, outliers.length === 0 ? /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "None right now.") : outliers.map(s => /*#__PURE__*/React.createElement(StudentChip, {
      key: s.id,
      name: s.firstName,
      tone: "outlier",
      draggable: false,
      note: s.interests.map(i => (packOf(i) || {}).label || i).join(", ") || "no tags"
    })))), !compact ? /*#__PURE__*/React.createElement(Table, {
      caption: "Class interest grid",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "outline",
        size: "sm"
      }, "Add student"),
      columns: ["Name", "Interests", "Group"],
      rows: students.map(s => [s.firstName, /*#__PURE__*/React.createElement("div", {
        key: "i",
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 4
        }
      }, packs.slice(0, 10).map(p => /*#__PURE__*/React.createElement(Chip, {
        key: p.packId,
        size: "sm",
        on: s.interests.includes(p.packId),
        title: p.label
      }, p.short))), /*#__PURE__*/React.createElement("span", {
        key: "g",
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement(PackAvatar, {
        size: "sm",
        short: (packOf(assignment[s.id]) || {}).short || "—",
        color: (packOf(assignment[s.id]) || {}).color
      }), (packOf(assignment[s.id]) || {}).label || "—")])
    }) : null);
  }
  Object.assign(window, {
    GroupBuilder,
    buildAssignment
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/GroupBuilder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/OtherScreens.jsx
try { (() => {
(() => {
  const {
    Panel,
    Button,
    Chip,
    Badge,
    Table,
    Input,
    PackAvatar
  } = window.WeaverDesignSystem_0700a8;
  function LessonsScreen({
    packs,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      kicker: "Library",
      title: "Lessons",
      description: "Variation sets you have generated in this session, plus the demo fixture.",
      actions: /*#__PURE__*/React.createElement(Button, {
        onClick: () => onNavigate("calendar")
      }, "New lesson \u2192")
    }), /*#__PURE__*/React.createElement(Table, {
      columns: ["Title", "Grade", "Packs", "Actions"],
      rows: [["Passes and points", "Grade 2", "Basketball, Cooking, Video Games", /*#__PURE__*/React.createElement("div", {
        key: "a",
        style: {
          display: "flex",
          gap: "var(--space-2)"
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: "#run",
        onClick: e => {
          e.preventDefault();
          onNavigate("run");
        },
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Run of show"), /*#__PURE__*/React.createElement("a", {
        href: "#print",
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Export"))], ["Add within 100", "Grade 2", "Basketball, Cooking, Video Games", /*#__PURE__*/React.createElement("div", {
        key: "b",
        style: {
          display: "flex",
          gap: "var(--space-2)"
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: "#run",
        onClick: e => {
          e.preventDefault();
          onNavigate("run");
        },
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Run of show"), /*#__PURE__*/React.createElement("a", {
        href: "#print",
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Export"))], ["Equivalent ratios — rates", "Grade 7", "Soccer, Cooking, Video Games", /*#__PURE__*/React.createElement("div", {
        key: "c",
        style: {
          display: "flex",
          gap: "var(--space-2)"
        }
      }, /*#__PURE__*/React.createElement("a", {
        href: "#run",
        onClick: e => {
          e.preventDefault();
          onNavigate("run");
        },
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Run of show"), /*#__PURE__*/React.createElement("a", {
        href: "#print",
        style: {
          fontSize: "var(--text-xs)",
          fontWeight: "var(--weight-medium)"
        }
      }, "Export"))]]
    }));
  }
  function RunOfShowScreen({
    standards,
    onNavigate
  }) {
    const cards = [["What kids are doing", "Counting shots, cups or coins in groups of ten, then writing the number sentence that matches their own packet."], ["What you watch for", "Kids stuck on the first problem. Off-task groups."], ["Exit ticket", "Add two two-digit numbers within 100 and explain the grouping in one sentence."]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      kicker: "Run of show",
      title: "Passes and points",
      size: "card"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 0",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Grade 2 \xB7 Room 204 \xB7 November 12"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-3)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, standards.map(s => /*#__PURE__*/React.createElement(Badge, {
      key: s.id,
      tone: "locked"
    }, s.plain)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-3)"
      }
    }, cards.map(([h, b]) => /*#__PURE__*/React.createElement(Panel, {
      key: h,
      size: "card"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)"
      }
    }, h), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-2) 0 0",
        fontSize: "var(--text-sm)",
        lineHeight: "var(--leading-relaxed)",
        color: "var(--ink-soft)"
      }
    }, b)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: () => onNavigate("student")
    }, "Open a student path"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Print packets"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNavigate("calendar")
    }, "Back to calendar")));
  }
  function SettingsScreen({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      kicker: "Settings",
      title: "Account",
      description: "Theme lives in the top bar. Classroom notes and account live here."
    }), /*#__PURE__*/React.createElement(Panel, {
      size: "card"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)"
      }
    }, "Classroom context"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 var(--space-3)",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Prompt-only notes for generation. Never stored on a recipe. First names only."), /*#__PURE__*/React.createElement("textarea", {
      rows: 3,
      defaultValue: "Two kids read a grade below. Morning block is 40 minutes. No devices on Fridays.",
      style: {
        width: "100%",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--line)",
        background: "var(--surface-muted)",
        padding: "var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        color: "var(--ink)",
        outline: "none",
        resize: "vertical"
      }
    })), /*#__PURE__*/React.createElement(Panel, {
      size: "card"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)"
      }
    }, "More options panel"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 var(--space-3)",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Where the plan panel opens from a calendar chip."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Chip, {
      on: true
    }, "Side panel"), /*#__PURE__*/React.createElement(Chip, null, "Full screen"))), /*#__PURE__*/React.createElement(Panel, {
      size: "card"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)"
      }
    }, "Account"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 var(--space-3)",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Sign in or upgrade a temporary session so your work stays attached."), /*#__PURE__*/React.createElement(Button, {
      onClick: () => onNavigate("login")
    }, "Open login \u2192")), /*#__PURE__*/React.createElement(Panel, {
      size: "card"
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)"
      }
    }, "Researcher"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 var(--space-3)",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Requires ", /*#__PURE__*/React.createElement("code", {
      style: {
        fontSize: "var(--text-xs)",
        fontFamily: "var(--font-mono)"
      }
    }, "teachers.is_researcher"), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Feedback inbox"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Privacy scan log"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Inference usage"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm"
    }, "Session recordings"))));
  }
  function LoginScreen({
    onNavigate
  }) {
    const [sent, setSent] = React.useState(false);
    const [email, setEmail] = React.useState("");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "34rem"
      }
    }, /*#__PURE__*/React.createElement(Panel, {
      kicker: "Sign in",
      title: "Weaver",
      description: "We email a 6-digit code. No password to forget. Founder PIN also works."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-5)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)",
        alignItems: "center"
      }
    }, sent ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        width: "100%",
        borderRadius: "var(--radius-card)",
        background: "var(--changed)",
        padding: "var(--space-2) var(--space-3)",
        fontSize: "var(--text-sm)",
        color: "var(--signal-mint)"
      }
    }, "Check ", email || "you@school.edu", " for a 6-digit code. If the link looks like Google, ignore it and type the code here."), /*#__PURE__*/React.createElement(Input, {
      width: "180px",
      variant: "otp",
      placeholder: "123456"
    }), /*#__PURE__*/React.createElement(Button, {
      onClick: () => onNavigate("calendar")
    }, "Verify")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
      width: "18rem",
      placeholder: "you@school.edu or PIN",
      value: email,
      onChange: e => setEmail(e.target.value)
    }), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setSent(true)
    }, "Email me a link"))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-6) 0 0",
        fontSize: "var(--text-xs)",
        color: "var(--ink-faint)"
      }
    }, "Weaver stores lesson content and class interest tags. It never asks for, and has nowhere to put, a student name, email, or roster.")));
  }
  Object.assign(window, {
    LessonsScreen,
    RunOfShowScreen,
    SettingsScreen,
    LoginScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/OtherScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/PlanDrawer.jsx
try { (() => {
(() => {
  const {
    Button,
    Chip,
    Segmented,
    Input,
    IconDisc,
    PackAvatar
  } = window.WeaverDesignSystem_0700a8;
  const THEME_PRESETS = ["Space", "Soccer", "Kitchen", "Animals", "Video games"];
  const PLAN_SUBJECTS = [{
    id: "math",
    label: "Math"
  }, {
    id: "ela",
    label: "ELA"
  }, {
    id: "science",
    label: "Science"
  }, {
    id: "ss",
    label: "Social studies"
  }, {
    id: "art",
    label: "Art"
  }];
  const PIN_TINT = {
    hook: "var(--pin-hook-tint)",
    try: "var(--pin-try-tint)",
    check: "var(--pin-check-tint)",
    next: "var(--pin-next-tint)"
  };
  function StudentBoardPreview({
    variations,
    packs
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        columnCount: 2,
        columnGap: "var(--space-3)"
      }
    }, variations.map(v => {
      const pack = packs.find(p => p.packId === v.packId) || {};
      return /*#__PURE__*/React.createElement("article", {
        key: v.packId,
        style: {
          marginBottom: "var(--space-3)",
          breakInside: "avoid",
          overflow: "hidden",
          borderRadius: "var(--radius-board)",
          border: "1px solid rgba(0,0,0,0.1)",
          background: "#fff",
          boxShadow: "var(--shadow-board)"
        }
      }, /*#__PURE__*/React.createElement("header", {
        style: {
          padding: "0.625rem var(--space-3)",
          color: "#fff",
          background: pack.color || "var(--signal-blue)"
        }
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontFamily: "var(--font-serif-display)",
          fontSize: "1.5rem",
          fontWeight: 900,
          letterSpacing: "0.05em"
        }
      }, pack.short), /*#__PURE__*/React.createElement("h2", {
        style: {
          margin: "2px 0 0",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--weight-semibold)"
        }
      }, v.title)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "rgba(0,0,0,0.1)"
        }
      }, v.blocks.map((b, i) => /*#__PURE__*/React.createElement("div", {
        key: b.id,
        style: {
          padding: "0.625rem",
          background: PIN_TINT[b.kind]
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-2)"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          marginTop: 2,
          display: "flex",
          width: 20,
          height: 20,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "999px",
          background: "#000",
          color: "#fff",
          fontSize: "var(--text-micro)",
          fontWeight: "var(--weight-bold)"
        }
      }, i + 1), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: "var(--text-tiny)",
          fontWeight: "var(--weight-bold)",
          textTransform: "uppercase",
          lineHeight: 1.2
        }
      }, b.title)), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "0.375rem 0 0",
          fontSize: "var(--text-tiny)",
          lineHeight: "var(--leading-snug)"
        }
      }, b.body), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: "var(--space-1) 0 0",
          fontSize: "var(--text-micro)",
          fontWeight: "var(--weight-semibold)"
        }
      }, b.action)))));
    }));
  }
  function PlanDrawer({
    block,
    mode,
    standards,
    variations,
    packs,
    busy,
    generated,
    onGenerate,
    onClose,
    onMinimize,
    onMaximize,
    onNavigate,
    children
  }) {
    const [theme, setTheme] = React.useState("");
    const [title, setTitle] = React.useState(block.title);
    const [unpinned, setUnpinned] = React.useState([]);
    const [kind, setKind] = React.useState(block.kind);
    const [subjects, setSubjects] = React.useState(block.subjects);
    const shell = mode === "max" ? {
      position: "absolute",
      inset: 0,
      zIndex: 40
    } : {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      width: "var(--drawer-w)",
      borderLeft: "1px solid var(--line)",
      boxShadow: "var(--shadow-popover)"
    };
    const range = new Date(block.start + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        ...shell
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-2)",
        borderBottom: "1px solid var(--line)",
        padding: "var(--space-3) var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, kind === "unit" ? "Unit" : "Lesson", " \xB7 ", range), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "2px 0 0",
        fontSize: "var(--text-base)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-tight)"
      }
    }, title)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexShrink: 0,
        gap: "0.375rem"
      }
    }, /*#__PURE__*/React.createElement(IconDisc, {
      glyph: "\u2193",
      label: "Minimize",
      onClick: onMinimize
    }), /*#__PURE__*/React.createElement(IconDisc, {
      glyph: mode === "max" ? "→" : "↗",
      label: mode === "max" ? "Side panel" : "Maximize",
      onClick: onMaximize
    }), /*#__PURE__*/React.createElement(IconDisc, {
      glyph: "\xD7",
      label: "Close",
      onClick: onClose
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: 0,
        flex: 1,
        overflowY: "auto",
        padding: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement(Segmented, {
      options: [{
        id: "lesson",
        label: "Lesson"
      }, {
        id: "unit",
        label: "Unit"
      }],
      value: kind,
      activeTone: kind === "unit" ? "unit" : "create",
      onChange: setKind
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-3)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Starts",
      type: "date",
      width: "150px",
      value: block.start
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Ends",
      type: "date",
      width: "150px",
      value: block.end
    }), /*#__PURE__*/React.createElement(Input, {
      label: kind === "unit" ? "Unit name" : "Lesson name",
      width: "200px",
      value: title,
      onChange: e => setTitle(e.target.value),
      placeholder: "e.g. Story problems"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-4)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, PLAN_SUBJECTS.map(s => {
      const on = subjects.includes(s.id);
      const backed = s.id === "math" || s.id === "ela";
      return /*#__PURE__*/React.createElement(Chip, {
        key: s.id,
        on: on,
        onClick: () => setSubjects(on ? subjects.filter(x => x !== s.id) : [...subjects, s.id])
      }, s.label, !backed && on ? " · later" : "");
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, "Optional theme"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, THEME_PRESETS.map(p => {
      const on = theme === p;
      return /*#__PURE__*/React.createElement(Chip, {
        key: p,
        tone: "theme",
        on: on,
        prefix: on ? "× " : "+ ",
        onClick: () => setTheme(on ? "" : p)
      }, p);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)",
        maxWidth: "26rem"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Or type your own, then click away",
      value: theme,
      onChange: e => setTheme(e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, "Standards for this date"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, standards.map(c => {
      const on = !unpinned.includes(c.id);
      return /*#__PURE__*/React.createElement(Chip, {
        key: c.id,
        tone: "standard",
        on: on,
        prefix: on ? "× " : "+ ",
        title: on ? "Remove from this lesson" : "Add back",
        onClick: () => setUnpinned(u => on ? [...u, c.id] : u.filter(id => id !== c.id))
      }, c.plain);
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-5)",
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      disabled: busy,
      onClick: onGenerate
    }, busy ? "Claude is writing packets…" : "Generate 3 packets"), generated ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNavigate("run")
    }, "Run of show"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNavigate("student")
    }, "Open student path"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Print packets")) : null), generated ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)",
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-wide)",
        color: "var(--ink-faint)"
      }
    }, "Student board \xB7 tap a tile to edit"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-1) 0 0",
        fontSize: "var(--text-sm)",
        color: "var(--ink-soft)"
      }
    }, "Room 204 cache \xB7 $0"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-3)",
        borderRadius: "var(--radius-inset)",
        background: "#111",
        padding: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(StudentBoardPreview, {
      variations: variations,
      packs: packs
    }))) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-6)"
      }
    }, children)));
  }
  Object.assign(window, {
    PlanDrawer,
    StudentBoardPreview
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/PlanDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/QuickAdd.jsx
try { (() => {
(() => {
  const {
    Button,
    Chip,
    Segmented,
    Input
  } = window.WeaverDesignSystem_0700a8;
  const QUICK_SUBJECTS = [{
    id: "math",
    label: "Math"
  }, {
    id: "ela",
    label: "ELA"
  }, {
    id: "science",
    label: "Science"
  }, {
    id: "ss",
    label: "Social studies"
  }];
  function RowIcon({
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        marginTop: 2,
        display: "flex",
        width: 20,
        height: 20,
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink-faint)"
      }
    }, children);
  }
  function QuickAdd({
    draft,
    onChange,
    onSave,
    onMore,
    onClose
  }) {
    const [datesOpen, setDatesOpen] = React.useState(draft.start !== draft.end);
    const label = new Date(draft.start + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
    const range = draft.start === draft.end ? label : label + " – " + new Date(draft.end + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
    function toggleSubject(id) {
      const on = draft.subjects.includes(id);
      const subjects = on ? draft.subjects.filter(s => s !== id) : [...draft.subjects, id];
      if (!subjects.length) return;
      onChange({
        ...draft,
        subjects
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      role: "dialog",
      "aria-label": "Quick add lesson",
      style: {
        position: "absolute",
        left: 120,
        top: 96,
        zIndex: 50,
        width: "var(--quickadd-w)",
        borderRadius: "var(--radius-quick)",
        border: "1px solid var(--line)",
        background: "var(--surface)",
        padding: "var(--space-4)",
        boxShadow: "var(--shadow-popover)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink-faint)",
        cursor: "grab"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "8",
      viewBox: "0 0 14 8",
      fill: "currentColor",
      "aria-hidden": true
    }, /*#__PURE__*/React.createElement("rect", {
      y: "0",
      width: "14",
      height: "2",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      y: "6",
      width: "14",
      height: "2",
      rx: "1"
    }))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Close",
      onClick: onClose,
      style: {
        width: 32,
        height: 32,
        borderRadius: "999px",
        border: 0,
        background: "transparent",
        color: "var(--ink-soft)",
        cursor: "pointer",
        fontSize: 16
      }
    }, "\xD7")), /*#__PURE__*/React.createElement(Input, {
      variant: "underline",
      placeholder: "Add title",
      value: draft.title,
      onChange: e => onChange({
        ...draft,
        title: e.target.value
      })
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Segmented, {
      options: [{
        id: "lesson",
        label: "Lesson"
      }, {
        id: "unit",
        label: "Unit"
      }],
      value: draft.kind,
      activeTone: draft.kind === "unit" ? "unit" : "create",
      onChange: kind => onChange({
        ...draft,
        kind,
        title: kind === "unit" ? "New Unit" : "New Lesson",
        end: kind === "unit" ? "2026-11-20" : draft.start
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-3)",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.375rem"
      }
    }, QUICK_SUBJECTS.map(s => /*#__PURE__*/React.createElement(Chip, {
      key: s.id,
      size: "sm",
      on: draft.subjects.includes(s.id),
      onClick: () => toggleSubject(s.id)
    }, s.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-4)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        fontSize: "var(--text-sm)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(RowIcon, null, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 2"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => setDatesOpen(v => !v),
      style: {
        border: 0,
        background: "transparent",
        padding: 0,
        textAlign: "left",
        color: "var(--ink)",
        fontSize: "var(--text-sm)",
        fontFamily: "var(--font-sans)",
        cursor: "pointer"
      }
    }, range), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-xs)",
        color: "var(--ink-faint)"
      }
    }, "All day"), datesOpen ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-2)",
        display: "flex",
        gap: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      width: "140px",
      type: "date",
      value: draft.start,
      onChange: e => onChange({
        ...draft,
        start: e.target.value
      })
    }), /*#__PURE__*/React.createElement(Input, {
      width: "140px",
      type: "date",
      value: draft.end,
      onChange: e => onChange({
        ...draft,
        end: e.target.value
      })
    })) : null)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(RowIcon, null, /*#__PURE__*/React.createElement("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "5",
      width: "18",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 10h18M8 3v4M16 3v4"
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Room 204 \u2014 2nd grade"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "var(--space-5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "md",
      onClick: onMore
    }, "More options"), /*#__PURE__*/React.createElement(Button, {
      variant: "create",
      size: "lg",
      onClick: onSave,
      style: {
        padding: "0.5rem 1.25rem",
        fontWeight: "var(--weight-semibold)"
      }
    }, "Save")));
  }
  Object.assign(window, {
    QuickAdd
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/QuickAdd.jsx", error: String((e && e.message) || e) }); }

// ui_kits/teacher-app/data.js
try { (() => {
window.WEAVER_DATA = {
  packs: [{
    packId: "pack_soccer",
    label: "Soccer",
    short: "SC",
    color: "#2fb86e"
  }, {
    packId: "pack_cooking",
    label: "Cooking",
    short: "CK",
    color: "#f07167"
  }, {
    packId: "pack_video_games",
    label: "Video Games",
    short: "VG",
    color: "#4f7cff"
  }, {
    packId: "pack_music",
    label: "Music",
    short: "MU",
    color: "#a855f7"
  }, {
    packId: "pack_skate",
    label: "Skateboarding",
    short: "SK",
    color: "#f59e0b"
  }, {
    packId: "pack_space",
    label: "Space",
    short: "SP",
    color: "#0ea5e9"
  }, {
    packId: "pack_animals",
    label: "Animals",
    short: "AN",
    color: "#84cc16"
  }, {
    packId: "pack_fashion",
    label: "Fashion",
    short: "FA",
    color: "#ec4899"
  }, {
    packId: "pack_basketball",
    label: "Basketball",
    short: "BB",
    color: "#ef4444"
  }, {
    packId: "pack_coding",
    label: "Coding",
    short: "CD",
    color: "#6366f1"
  }, {
    packId: "pack_custom_worms_0",
    label: "Worms & spiders",
    short: "WS",
    color: "#4d7c0f"
  }],
  students: [{
    id: "stu_jordan",
    firstName: "Jordan",
    interests: ["pack_basketball", "pack_soccer"]
  }, {
    id: "stu_avery",
    firstName: "Avery",
    interests: ["pack_video_games", "pack_coding"]
  }, {
    id: "stu_sam",
    firstName: "Sam",
    interests: ["pack_cooking", "pack_animals"]
  }, {
    id: "stu_riley",
    firstName: "Riley",
    interests: ["pack_basketball", "pack_music"]
  }, {
    id: "stu_casey",
    firstName: "Casey",
    interests: ["pack_soccer", "pack_video_games"]
  }, {
    id: "stu_quinn",
    firstName: "Quinn",
    interests: ["pack_cooking", "pack_fashion"]
  }, {
    id: "stu_morgan",
    firstName: "Morgan",
    interests: ["pack_basketball"]
  }, {
    id: "stu_jamie",
    firstName: "Jamie",
    interests: ["pack_video_games", "pack_skate"]
  }, {
    id: "stu_taylor",
    firstName: "Taylor",
    interests: ["pack_cooking", "pack_soccer"]
  }, {
    id: "stu_drew",
    firstName: "Drew",
    interests: ["pack_music", "pack_coding"]
  }, {
    id: "stu_skyler",
    firstName: "Skyler",
    interests: ["pack_basketball", "pack_video_games"]
  }, {
    id: "stu_parker",
    firstName: "Parker",
    interests: ["pack_animals", "pack_space"]
  }, {
    id: "stu_cameron",
    firstName: "Cameron",
    interests: ["pack_soccer", "pack_cooking"]
  }, {
    id: "stu_alex",
    firstName: "Alex",
    interests: ["pack_video_games"]
  }, {
    id: "stu_rowan",
    firstName: "Rowan",
    interests: ["pack_fashion", "pack_music"]
  }, {
    id: "stu_sage",
    firstName: "Sage",
    interests: ["pack_soccer", "pack_space"]
  }, {
    id: "stu_maya",
    firstName: "Maya",
    interests: ["pack_custom_worms_0"]
  }, {
    id: "stu_nico",
    firstName: "Nico",
    interests: ["pack_custom_worms_0", "pack_animals"]
  }],
  // November 2026 — the demo month. Sunday-start grid.
  blocks: [{
    id: "blk_1",
    title: "Story problems",
    start: "2026-11-02",
    end: "2026-11-02",
    kind: "lesson",
    subjects: ["math"],
    status: "planned"
  }, {
    id: "blk_2",
    title: "Opinion writing",
    start: "2026-11-04",
    end: "2026-11-04",
    kind: "lesson",
    subjects: ["ela"],
    status: "planned"
  }, {
    id: "blk_3",
    title: "Place value",
    start: "2026-11-09",
    end: "2026-11-13",
    kind: "unit",
    subjects: ["math"],
    status: "planned"
  }, {
    id: "blk_4",
    title: "Add within 100",
    start: "2026-11-10",
    end: "2026-11-10",
    kind: "lesson",
    subjects: ["math"],
    status: "generated"
  }, {
    id: "blk_5",
    title: "Passes and points",
    start: "2026-11-12",
    end: "2026-11-12",
    kind: "lesson",
    subjects: ["math", "ela"],
    status: "generated"
  }, {
    id: "blk_6",
    title: "Habitats",
    start: "2026-11-17",
    end: "2026-11-17",
    kind: "lesson",
    subjects: ["science"],
    status: "planned"
  }, {
    id: "blk_7",
    title: "Class vote",
    start: "2026-11-19",
    end: "2026-11-19",
    kind: "lesson",
    subjects: ["ss"],
    status: "planned"
  }],
  standards: [{
    id: "2.OA.A.1",
    plain: "add within 100"
  }, {
    id: "2.NBT.B.5",
    plain: "add and subtract within 100 fluently"
  }, {
    id: "W.2.1",
    plain: "write an opinion with a reason"
  }],
  variations: [{
    packId: "pack_basketball",
    title: "Passes and points",
    blocks: [{
      id: "b1",
      kind: "hook",
      title: "Court count",
      body: "Your team took 24 shots in the first half and 18 in the second.",
      action: "Count the shots"
    }, {
      id: "b2",
      kind: "try",
      title: "Two more quarters",
      body: "At the same pace, how many shots in four quarters? Show how you grouped them.",
      action: "Try it"
    }, {
      id: "b3",
      kind: "check",
      title: "Show it",
      body: "Write the number sentence you used.",
      action: "Check my work"
    }, {
      id: "b4",
      kind: "next",
      title: "Tell a teammate",
      body: "Say your reason out loud, then write one sentence about why your total makes sense.",
      action: "Say it"
    }]
  }, {
    packId: "pack_cooking",
    title: "Cups and batches",
    blocks: [{
      id: "c1",
      kind: "hook",
      title: "Two batches",
      body: "One batch needs 24 cups of flour. You make a second batch.",
      action: "Count the cups"
    }, {
      id: "c2",
      kind: "try",
      title: "Scale it up",
      body: "How many cups for four batches? Group by tens first.",
      action: "Try it"
    }, {
      id: "c3",
      kind: "check",
      title: "Show it",
      body: "Write the number sentence you used.",
      action: "Check my work"
    }, {
      id: "c4",
      kind: "next",
      title: "Tell a helper",
      body: "Explain why your total makes sense in one sentence.",
      action: "Say it"
    }]
  }, {
    packId: "pack_video_games",
    title: "Coins and levels",
    blocks: [{
      id: "v1",
      kind: "hook",
      title: "Coin run",
      body: "You collect 24 coins on level one and 18 on level two.",
      action: "Count the coins"
    }, {
      id: "v2",
      kind: "try",
      title: "Four levels",
      body: "At the same rate, how many coins after four levels?",
      action: "Try it"
    }, {
      id: "v3",
      kind: "check",
      title: "Show it",
      body: "Write the number sentence you used.",
      action: "Check my work"
    }, {
      id: "v4",
      kind: "next",
      title: "Tell a player",
      body: "Write one sentence explaining your total.",
      action: "Say it"
    }]
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/teacher-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.EventPill = __ds_scope.EventPill;

__ds_ns.GroupColumn = __ds_scope.GroupColumn;

__ds_ns.PACK_COLORS = __ds_scope.PACK_COLORS;

__ds_ns.PackAvatar = __ds_scope.PackAvatar;

__ds_ns.PinCard = __ds_scope.PinCard;

__ds_ns.StudentChip = __ds_scope.StudentChip;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.IconDisc = __ds_scope.IconDisc;

__ds_ns.SidebarNav = __ds_scope.SidebarNav;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
