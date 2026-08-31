import { initShell } from "../core/app-shell.js";
import { t } from "../core/i18n.js";

const PARAMETER_KEYS = ["p1", "p2", "p3"];

const scenes = [
  {
    textKey: "parasuramanSimple.steps.s1",
    hintKey: "parasuramanSimple.hints.s1",
    noteKey: "parasuramanSimple.notes.s1",
    perceived: 30,
    expected: 78,
    params: [0, 0, 0]
  },
  {
    textKey: "parasuramanSimple.steps.s2",
    hintKey: "parasuramanSimple.hints.s2",
    noteKey: "parasuramanSimple.notes.s2",
    perceived: 60,
    expected: 78,
    params: [0, 0, 0]
  },
  {
    textKey: "parasuramanSimple.steps.s3",
    hintKey: "parasuramanSimple.hints.s3",
    noteKey: "parasuramanSimple.notes.s3",
    perceived: 35,
    expected: 78,
    params: [0, 0, 0]
  },
  {
    textKey: "parasuramanSimple.steps.s4",
    hintKey: "parasuramanSimple.hints.s4",
    noteKey: "parasuramanSimple.notes.s4",
    perceived: 42,
    expected: 74,
    params: [0, 0, 0]
  },
  {
    textKey: "parasuramanSimple.steps.s5",
    hintKey: "parasuramanSimple.hints.s5",
    noteKey: "parasuramanSimple.notes.s5",
    perceived: 40,
    expected: 84,
    params: [0, 0, 0]
  },
  {
    textKey: "parasuramanSimple.steps.s6",
    hintKey: "parasuramanSimple.hints.s6",
    noteKey: "parasuramanSimple.notes.s6",
    perceived: 55,
    expected: 82,
    params: [46, 58, 41]
  },
  {
    textKey: "parasuramanSimple.steps.s7",
    hintKey: "parasuramanSimple.hints.s7",
    noteKey: "parasuramanSimple.notes.s7",
    perceived: 90,
    expected: 78,
    params: [78, 85, 82]
  },
  {
    textKey: "parasuramanSimple.steps.s8",
    hintKey: "parasuramanSimple.hints.s8",
    noteKey: "parasuramanSimple.notes.s8",
    perceived: 90,
    expected: 96,
    params: [72, 74, 70]
  }
];

const PARAMETER_FIRST_STEP_INDEX = 5;

const dom = {
  counter: document.getElementById("step-counter"),
  text: document.getElementById("step-text"),
  hint: document.getElementById("step-hint"),
  prev: document.getElementById("step-prev"),
  next: document.getElementById("step-next"),
  perceived: document.getElementById("point-perceived"),
  expected: document.getElementById("point-expected"),
  perceivedValue: document.getElementById("point-perceived-value"),
  expectedValue: document.getElementById("point-expected-value"),
  gap: document.getElementById("distance-gap"),
  gapValue: document.getElementById("distance-gap-value"),
  subjectiveNote: document.getElementById("subjective-note"),
  metricPerceived: document.getElementById("metric-perceived"),
  metricQuality: document.getElementById("metric-quality"),
  metricExpected: document.getElementById("metric-expected"),
  metricDistance: document.getElementById("metric-distance"),
  parameterRows: document.getElementById("parameter-rows"),
  parameterBlock: document.getElementById("parameter-block")
};

const state = {
  index: 0
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateEdgeButtons(prevButton, nextButton, index, total) {
  if (prevButton) {
    prevButton.hidden = index === 0;
  }
  if (nextButton) {
    nextButton.hidden = index === total - 1;
  }
}

function getCurrentScene() {
  return scenes[state.index];
}

function calculateDistance(perceived, expected) {
  return Math.round(Math.abs(perceived - expected));
}

function calculateQuality(perceived, expected) {
  if (perceived <= expected) {
    return Math.round(Math.max(0, 100 - (expected - perceived)));
  }
  return Math.round(100 + (perceived - expected));
}

function buildParameterRows() {
  dom.parameterRows.innerHTML = "";

  PARAMETER_KEYS.forEach((parameterKey) => {
    const row = document.createElement("div");
    row.className = "param-row";

    const label = document.createElement("span");
    label.textContent = t(`parasuramanSimple.parameters.${parameterKey}`);

    const bar = document.createElement("div");
    bar.className = "param-bar";

    const fill = document.createElement("div");
    fill.className = "param-fill";
    fill.dataset.paramFill = parameterKey;

    const value = document.createElement("span");
    value.className = "param-value";
    value.dataset.paramValue = parameterKey;

    bar.append(fill);
    row.append(label, bar, value);
    dom.parameterRows.append(row);
  });
}

// Un rótulo centrado sobre un punto al 0% o al 100% se saldría de la escala.
// Desplazarlo justo su propia posición lo mantiene siempre dentro: en el 0 se
// alinea por la izquierda, en el 50 queda centrado y en el 100 por la derecha.
function keepLabelInside(pointElement, percent) {
  const label = pointElement.querySelector(".point-label");
  if (label) {
    label.style.transform = `translateX(${-clamp(percent, 0, 100)}%)`;
  }
}

function movePoints(scene) {
  dom.perceived.style.left = `${scene.perceived}%`;
  dom.expected.style.left = `${scene.expected}%`;

  keepLabelInside(dom.perceived, scene.perceived);
  keepLabelInside(dom.expected, scene.expected);

  // Cada punto lleva su valor encima: el movimiento se lee sin ir a buscar la cifra.
  dom.perceivedValue.textContent = String(scene.perceived);
  dom.expectedValue.textContent = String(scene.expected);

  const gapLeft = Math.min(scene.perceived, scene.expected);
  const gapWidth = Math.abs(scene.perceived - scene.expected);

  dom.gap.style.left = `${gapLeft}%`;
  dom.gap.style.width = `${gapWidth}%`;
  dom.gap.style.display = gapWidth < 0.4 ? "none" : "block";
  dom.gapValue.textContent = calculateDistance(scene.perceived, scene.expected);
}

function paintParameters(scene) {
  PARAMETER_KEYS.forEach((parameterKey, idx) => {
    const value = clamp(scene.params[idx] ?? 0, 0, 100);
    const fill = dom.parameterRows.querySelector(`[data-param-fill='${parameterKey}']`);
    const text = dom.parameterRows.querySelector(`[data-param-value='${parameterKey}']`);

    if (fill) {
      fill.style.width = `${value}%`;
    }
    if (text) {
      text.textContent = `${value}`;
    }
  });
}

function renderScene() {
  const scene = getCurrentScene();
  const total = scenes.length;
  const distance = calculateDistance(scene.perceived, scene.expected);
  const quality = calculateQuality(scene.perceived, scene.expected);

  dom.counter.textContent = t("parasuramanSimple.counter", {
    current: state.index + 1,
    total
  });

  dom.text.textContent = t(scene.textKey);
  dom.hint.textContent = t(scene.hintKey);
  dom.subjectiveNote.textContent = t(scene.noteKey);

  movePoints(scene);
  paintParameters(scene);

  dom.metricPerceived.textContent = String(scene.perceived);
  dom.metricQuality.textContent = String(quality);
  dom.metricExpected.textContent = String(scene.expected);
  dom.metricDistance.textContent = String(distance);

  dom.parameterBlock.hidden = state.index < PARAMETER_FIRST_STEP_INDEX;

  updateEdgeButtons(dom.prev, dom.next, state.index, total);
}

function changeStep(stepDelta) {
  const nextIndex = clamp(state.index + stepDelta, 0, scenes.length - 1);
  if (nextIndex === state.index) {
    return;
  }
  state.index = nextIndex;
  renderScene();
}

function bindEvents() {
  dom.prev.addEventListener("click", () => {
    changeStep(-1);
  });

  dom.next.addEventListener("click", () => {
    changeStep(1);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      changeStep(-1);
    }
    if (event.key === "ArrowRight") {
      changeStep(1);
    }
  });

  window.addEventListener("pdca:language-change", () => {
    buildParameterRows();
    renderScene();
  });
}

function initPage() {
  initShell();
  buildParameterRows();
  renderScene();
  bindEvents();
}

initPage();
