import { initShell } from "../core/app-shell.js";
import { t } from "../core/i18n.js";

const PARAMETER_DEFINITIONS = [
  { id: "outcomes", weight: 4, value: 60 },
  { id: "clarity", weight: 4, value: 58 },
  { id: "support", weight: 3, value: 53 },
  { id: "feedback", weight: 4, value: 50 },
  { id: "equity", weight: 3, value: 57 }
];

const guidedCase = {
  titleKey: "parasuraman.guided.case.title",
  descriptionKey: "parasuraman.guided.case.description",
  steps: [
    {
      key: "step1",
      options: [
        {
          id: "a",
          score: 0,
          expectedShift: 5,
          deltas: { outcomes: 1, clarity: -2, support: -3, feedback: -4, equity: -2 }
        },
        {
          id: "b",
          score: 3,
          expectedShift: 2,
          deltas: { outcomes: 4, clarity: 11, support: 8, feedback: 12, equity: 4 }
        },
        {
          id: "c",
          score: 1,
          expectedShift: 1,
          deltas: { outcomes: 0, clarity: 0, support: 0, feedback: 0, equity: 0 }
        }
      ]
    },
    {
      key: "step2",
      options: [
        {
          id: "a",
          score: 1,
          expectedShift: 2,
          deltas: { outcomes: 1, clarity: 0, support: -2, feedback: 0, equity: -4 }
        },
        {
          id: "b",
          score: 3,
          expectedShift: 1,
          deltas: { outcomes: 3, clarity: 4, support: 6, feedback: 4, equity: 7 }
        },
        {
          id: "c",
          score: 0,
          expectedShift: 0,
          deltas: { outcomes: -1, clarity: -3, support: -2, feedback: -4, equity: -2 }
        }
      ]
    },
    {
      key: "step3",
      options: [
        {
          id: "a",
          score: 3,
          expectedShift: 4,
          deltas: { outcomes: 4, clarity: 4, support: 5, feedback: 4, equity: 3 }
        },
        {
          id: "b",
          score: 0,
          expectedShift: 0,
          deltas: { outcomes: -2, clarity: -3, support: -3, feedback: -2, equity: -1 }
        },
        {
          id: "c",
          score: 1,
          expectedShift: 8,
          deltas: { outcomes: 0, clarity: 0, support: -1, feedback: -1, equity: -1 }
        }
      ]
    }
  ]
};

const dom = {
  tabs: Array.from(document.querySelectorAll("[data-mode-target]")),
  panels: Array.from(document.querySelectorAll("[data-mode-panel]")),
  expectedRange: document.getElementById("expected-range"),
  expectedOutput: document.getElementById("expected-output"),
  adaptationRange: document.getElementById("adaptation-rate"),
  adaptationOutput: document.getElementById("adaptation-output"),
  adaptationToggle: document.getElementById("adaptation-toggle"),
  parameterList: document.getElementById("parameter-list"),
  runCycleButton: document.getElementById("run-cycle"),
  autoCycleButton: document.getElementById("auto-cycle"),
  resetCycleButton: document.getElementById("reset-cycle"),
  expectedMarker: document.getElementById("expected-marker"),
  perceivedMarker: document.getElementById("perceived-marker"),
  distanceBar: document.getElementById("distance-bar"),
  metricExpected: document.getElementById("metric-expected"),
  metricPerceived: document.getElementById("metric-perceived"),
  metricDistance: document.getElementById("metric-distance"),
  metricQuality: document.getElementById("metric-quality"),
  qualityInsight: document.getElementById("quality-insight"),
  historyBody: document.getElementById("history-body"),
  guidedCaseTitle: document.getElementById("guided-case-title"),
  guidedCaseDescription: document.getElementById("guided-case-description"),
  guidedPrompt: document.getElementById("guided-prompt"),
  guidedOptions: document.getElementById("guided-options"),
  guidedProgress: document.getElementById("guided-progress"),
  guidedFeedback: document.getElementById("guided-feedback"),
  guidedSummary: document.getElementById("guided-summary"),
  guidedStartButton: document.getElementById("guided-start"),
  guidedApplyButton: document.getElementById("guided-apply")
};

const accessDom = {
  content: document.getElementById("advanced-content"),
  lock: document.getElementById("advanced-lock"),
  form: document.getElementById("advanced-password-form"),
  input: document.getElementById("advanced-password"),
  message: document.getElementById("advanced-password-message")
};

const ACCESS_PASSWORD = "demo";

const simpleState = {
  expected: 72,
  adaptationRate: 35,
  adaptationEnabled: true,
  perceived: 56,
  cycle: 0,
  history: [],
  params: {}
};

const guidedState = {
  started: false,
  expected: 74,
  perceived: 56,
  stepIndex: 0,
  score: 0,
  bonusScore: 0,
  history: [],
  params: {}
};

let autoRunning = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function createParameterStateFromDefaults() {
  const map = {};
  PARAMETER_DEFINITIONS.forEach((parameter) => {
    map[parameter.id] = {
      weight: parameter.weight,
      value: parameter.value
    };
  });
  return map;
}

function weightedAverage(parameterMap) {
  const entries = Object.values(parameterMap);
  const totalWeight = entries.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) {
    return 0;
  }
  const weightedValue = entries.reduce((sum, item) => sum + item.value * item.weight, 0);
  return round(weightedValue / totalWeight);
}

function smoothPerception(previousPerception, observedValue) {
  return round(previousPerception * 0.58 + observedValue * 0.42);
}

function setMode(modeName) {
  dom.tabs.forEach((tab) => {
    const isActive = tab.dataset.modeTarget === modeName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  dom.panels.forEach((panel) => {
    const isPanelActive = panel.dataset.modePanel === modeName;
    panel.hidden = !isPanelActive;
  });
}

function renderParameterList() {
  dom.parameterList.innerHTML = "";

  PARAMETER_DEFINITIONS.forEach((parameter) => {
    const values = simpleState.params[parameter.id];
    const wrapper = document.createElement("article");
    wrapper.className = "parameter-item";

    const title = document.createElement("h4");
    title.textContent = t(`parasuraman.parameters.${parameter.id}`);

    const weightLabel = document.createElement("label");
    const weightText = document.createElement("span");
    weightText.textContent = `${t("parasuraman.controls.weight")}: `;

    const weightInput = document.createElement("input");
    weightInput.type = "range";
    weightInput.min = "1";
    weightInput.max = "5";
    weightInput.step = "1";
    weightInput.value = String(values.weight);
    weightInput.dataset.parameterWeight = parameter.id;

    const weightOutput = document.createElement("output");
    weightOutput.textContent = String(values.weight);
    weightOutput.dataset.parameterWeightOutput = parameter.id;

    const weightRow = document.createElement("div");
    weightRow.className = "range-row";
    weightRow.append(weightInput, weightOutput);

    weightLabel.append(weightText, weightRow);

    const valueLabel = document.createElement("label");
    const valueText = document.createElement("span");
    valueText.textContent = `${t("parasuraman.controls.observed")}: `;

    const valueInput = document.createElement("input");
    valueInput.type = "range";
    valueInput.min = "0";
    valueInput.max = "100";
    valueInput.step = "1";
    valueInput.value = String(values.value);
    valueInput.dataset.parameterValue = parameter.id;

    const valueOutput = document.createElement("output");
    valueOutput.textContent = String(values.value);
    valueOutput.dataset.parameterValueOutput = parameter.id;

    const valueRow = document.createElement("div");
    valueRow.className = "range-row";
    valueRow.append(valueInput, valueOutput);

    valueLabel.append(valueText, valueRow);

    wrapper.append(title, weightLabel, valueLabel);
    dom.parameterList.append(wrapper);
  });

  bindParameterEvents();
}

function bindParameterEvents() {
  const sliders = dom.parameterList.querySelectorAll("input[type='range']");
  sliders.forEach((slider) => {
    slider.addEventListener("input", () => {
      const parameterWeight = slider.dataset.parameterWeight;
      const parameterValue = slider.dataset.parameterValue;

      if (parameterWeight) {
        simpleState.params[parameterWeight].weight = Number(slider.value);
        const output = dom.parameterList.querySelector(`[data-parameter-weight-output='${parameterWeight}']`);
        if (output) {
          output.textContent = slider.value;
        }
      }

      if (parameterValue) {
        simpleState.params[parameterValue].value = Number(slider.value);
        const output = dom.parameterList.querySelector(`[data-parameter-value-output='${parameterValue}']`);
        if (output) {
          output.textContent = slider.value;
        }
      }

      renderSimpleProjection();
    });
  });
}

function syncTopControlsFromState() {
  dom.expectedRange.value = String(simpleState.expected);
  dom.expectedOutput.textContent = String(simpleState.expected);

  dom.adaptationRange.value = String(simpleState.adaptationRate);
  dom.adaptationOutput.textContent = `${simpleState.adaptationRate}%`;

  dom.adaptationToggle.checked = simpleState.adaptationEnabled;
}

function getProjectedSimpleRecord() {
  const observedValue = weightedAverage(simpleState.params);
  const projectedPerceived =
    simpleState.cycle === 0 ? observedValue : smoothPerception(simpleState.perceived, observedValue);

  const distance = round(Math.abs(simpleState.expected - projectedPerceived));
  const quality = round(clamp(100 - distance, 0, 100));

  return {
    expected: simpleState.expected,
    perceived: projectedPerceived,
    distance,
    quality
  };
}

function renderScale(record) {
  const expectedX = `${record.expected}%`;
  const perceivedX = `${record.perceived}%`;

  dom.expectedMarker.style.left = expectedX;
  dom.perceivedMarker.style.left = perceivedX;

  const left = Math.min(record.expected, record.perceived);
  const width = Math.abs(record.expected - record.perceived);

  dom.distanceBar.style.left = `${left}%`;
  dom.distanceBar.style.width = `${width}%`;
  dom.distanceBar.style.display = width < 0.8 ? "none" : "block";
}

function chooseInsight(record, isAdapted) {
  if (isAdapted) {
    return t("parasuraman.insight.aboveExpected");
  }
  if (record.distance <= 10) {
    return t("parasuraman.insight.excellent");
  }
  if (record.distance >= 24) {
    return t("parasuraman.insight.low");
  }
  if (simpleState.cycle > 0) {
    return t("parasuraman.insight.stable");
  }
  return t("parasuraman.insight.neutral");
}

function renderSimpleMetrics(record, isAdapted = false) {
  dom.metricExpected.textContent = String(round(record.expected));
  dom.metricPerceived.textContent = String(round(record.perceived));
  dom.metricDistance.textContent = String(round(record.distance));
  dom.metricQuality.textContent = String(round(record.quality));
  dom.qualityInsight.textContent = chooseInsight(record, isAdapted);
  renderScale(record);
}

function renderHistory() {
  dom.historyBody.innerHTML = "";

  if (simpleState.history.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = t("parasuraman.history.empty");
    row.append(cell);
    dom.historyBody.append(row);
    return;
  }

  simpleState.history.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.cycle}</td>
      <td>${entry.expected}</td>
      <td>${entry.perceived}</td>
      <td>${entry.distance}</td>
      <td>${entry.quality}</td>
    `;
    dom.historyBody.append(row);
  });
}

function runSimpleCycle() {
  const observedValue = weightedAverage(simpleState.params);
  const perceivedValue =
    simpleState.cycle === 0 ? observedValue : smoothPerception(simpleState.perceived, observedValue);

  const expectedBefore = simpleState.expected;
  const distance = round(Math.abs(expectedBefore - perceivedValue));
  const quality = round(clamp(100 - distance, 0, 100));

  simpleState.cycle += 1;
  simpleState.perceived = perceivedValue;

  const row = {
    cycle: simpleState.cycle,
    expected: round(expectedBefore),
    perceived: round(perceivedValue),
    distance,
    quality
  };

  simpleState.history.unshift(row);
  if (simpleState.history.length > 12) {
    simpleState.history.pop();
  }

  let adapted = false;
  if (simpleState.adaptationEnabled && perceivedValue > expectedBefore) {
    const raise = (perceivedValue - expectedBefore) * (simpleState.adaptationRate / 100);
    simpleState.expected = round(clamp(expectedBefore + raise, 0, 100));
    adapted = true;
    syncTopControlsFromState();
  }

  renderSimpleMetrics(row, adapted);
  renderHistory();
}

function mutateSimpleParametersForAutoRun() {
  PARAMETER_DEFINITIONS.forEach((parameter) => {
    const currentValue = simpleState.params[parameter.id].value;
    const delta = Math.floor(Math.random() * 11) - 4;
    const nextValue = clamp(currentValue + delta, 0, 100);
    simpleState.params[parameter.id].value = nextValue;

    const input = dom.parameterList.querySelector(`[data-parameter-value='${parameter.id}']`);
    const output = dom.parameterList.querySelector(`[data-parameter-value-output='${parameter.id}']`);
    if (input) {
      input.value = String(nextValue);
    }
    if (output) {
      output.textContent = String(nextValue);
    }
  });
}

async function runAutoCycles(totalCycles = 5) {
  if (autoRunning) {
    return;
  }

  autoRunning = true;
  dom.autoCycleButton.disabled = true;
  dom.runCycleButton.disabled = true;

  for (let index = 0; index < totalCycles; index += 1) {
    mutateSimpleParametersForAutoRun();
    runSimpleCycle();
    await wait(430);
  }

  dom.runCycleButton.disabled = false;
  dom.autoCycleButton.disabled = false;
  autoRunning = false;
}

function resetSimpleModel() {
  simpleState.params = createParameterStateFromDefaults();
  simpleState.expected = 72;
  simpleState.adaptationRate = 35;
  simpleState.adaptationEnabled = true;
  simpleState.perceived = 56;
  simpleState.cycle = 0;
  simpleState.history = [];

  syncTopControlsFromState();
  renderParameterList();
  renderSimpleProjection();
  renderHistory();
}

function renderSimpleProjection() {
  const projected = getProjectedSimpleRecord();
  renderSimpleMetrics(projected, false);
}

function buildGuidedInitialParams() {
  const map = createParameterStateFromDefaults();
  map.outcomes.value = 55;
  map.clarity.value = 51;
  map.support.value = 52;
  map.feedback.value = 48;
  map.equity.value = 50;
  return map;
}

function resetGuidedModel() {
  guidedState.started = false;
  guidedState.expected = 74;
  guidedState.perceived = 56;
  guidedState.stepIndex = 0;
  guidedState.score = 0;
  guidedState.bonusScore = 0;
  guidedState.history = [];
  guidedState.params = buildGuidedInitialParams();
  renderGuided();
}

function renderGuidedOptions(step) {
  dom.guidedOptions.innerHTML = "";

  step.options.forEach((option) => {
    const optionRow = document.createElement("label");
    optionRow.className = "option-item";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "guided-option";
    input.value = option.id;

    const text = document.createElement("span");
    text.textContent = t(`parasuraman.guided.steps.${step.key}.${option.id}`);

    optionRow.append(input, text);
    dom.guidedOptions.append(optionRow);
  });
}

function renderGuidedSummary() {
  const maxMainScore = guidedCase.steps.length * 3;
  const maxBonus = guidedCase.steps.length - 1;
  const maxScore = maxMainScore + maxBonus;
  const total = guidedState.score + guidedState.bonusScore;
  const ratio = total / maxScore;

  let levelText = t("parasuraman.guided.summaryLow");
  if (ratio >= 0.75) {
    levelText = t("parasuraman.guided.summaryHigh");
  } else if (ratio >= 0.45) {
    levelText = t("parasuraman.guided.summaryMedium");
  }

  dom.guidedSummary.innerHTML = `
    <strong>${t("parasuraman.guided.summaryTitle")}</strong>
    <p>${levelText}</p>
    <p>${t("parasuraman.metrics.quality")}: ${round(
      guidedState.history[guidedState.history.length - 1]?.quality ?? 0
    )}</p>
    <p>${t("parasuraman.guided.scoreLabel")}: ${total}/${maxScore}</p>
  `;
}

function renderGuided() {
  dom.guidedCaseTitle.textContent = t(guidedCase.titleKey);
  dom.guidedCaseDescription.textContent = t(guidedCase.descriptionKey);

  if (!guidedState.started) {
    dom.guidedProgress.textContent = `0/${guidedCase.steps.length}`;
    dom.guidedPrompt.textContent = t("parasuraman.guided.notStarted");
    dom.guidedOptions.innerHTML = "";
    dom.guidedFeedback.textContent = t("parasuraman.guided.notStarted");
    dom.guidedSummary.textContent = t("parasuraman.guided.summaryPending");
    return;
  }

  const currentStep = guidedCase.steps[guidedState.stepIndex];
  dom.guidedProgress.textContent = `${Math.min(guidedState.stepIndex + 1, guidedCase.steps.length)}/${
    guidedCase.steps.length
  }`;

  if (!currentStep) {
    dom.guidedPrompt.textContent = t("parasuraman.guided.summaryTitle");
    dom.guidedOptions.innerHTML = "";
    renderGuidedSummary();
    return;
  }

  dom.guidedPrompt.textContent = t(`parasuraman.guided.steps.${currentStep.key}.prompt`);
  renderGuidedOptions(currentStep);

  dom.guidedSummary.textContent = t("parasuraman.guided.summaryPending");
}

function applyGuidedDecision() {
  if (!guidedState.started) {
    dom.guidedFeedback.textContent = t("parasuraman.guided.notStarted");
    return;
  }

  const currentStep = guidedCase.steps[guidedState.stepIndex];
  if (!currentStep) {
    return;
  }

  const chosenOptionNode = dom.guidedOptions.querySelector("input[name='guided-option']:checked");
  if (!chosenOptionNode) {
    dom.guidedFeedback.textContent = t("parasuraman.guided.selectOption");
    return;
  }

  const chosenOption = currentStep.options.find((option) => option.id === chosenOptionNode.value);
  if (!chosenOption) {
    return;
  }

  guidedState.expected = clamp(guidedState.expected + chosenOption.expectedShift, 0, 100);

  Object.entries(chosenOption.deltas).forEach(([parameterId, delta]) => {
    const currentValue = guidedState.params[parameterId].value;
    guidedState.params[parameterId].value = clamp(currentValue + delta, 0, 100);
  });

  const observed = weightedAverage(guidedState.params);
  guidedState.perceived = smoothPerception(guidedState.perceived, observed);

  const distance = round(Math.abs(guidedState.expected - guidedState.perceived));
  const quality = round(clamp(100 - distance, 0, 100));

  guidedState.score += chosenOption.score;

  const previousDistance = guidedState.history[guidedState.history.length - 1]?.distance;
  if (typeof previousDistance === "number" && distance < previousDistance) {
    guidedState.bonusScore += 1;
  }

  guidedState.history.push({
    step: guidedState.stepIndex + 1,
    expected: guidedState.expected,
    perceived: guidedState.perceived,
    distance,
    quality
  });

  const feedbackKey = `parasuraman.guided.steps.${currentStep.key}.feedback${chosenOption.id.toUpperCase()}`;
  dom.guidedFeedback.innerHTML = `
    <p>${t(feedbackKey)}</p>
    <p>${t("parasuraman.metrics.distance")}: ${distance} · ${t("parasuraman.metrics.quality")}: ${quality}</p>
  `;

  guidedState.stepIndex += 1;
  renderGuided();
}

function bindGeneralEvents() {
  dom.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setMode(tab.dataset.modeTarget);
    });
  });

  dom.expectedRange.addEventListener("input", () => {
    simpleState.expected = Number(dom.expectedRange.value);
    dom.expectedOutput.textContent = String(simpleState.expected);
    renderSimpleProjection();
  });

  dom.adaptationRange.addEventListener("input", () => {
    simpleState.adaptationRate = Number(dom.adaptationRange.value);
    dom.adaptationOutput.textContent = `${simpleState.adaptationRate}%`;
  });

  dom.adaptationToggle.addEventListener("change", () => {
    simpleState.adaptationEnabled = dom.adaptationToggle.checked;
  });

  dom.runCycleButton.addEventListener("click", () => {
    runSimpleCycle();
  });

  dom.autoCycleButton.addEventListener("click", () => {
    runAutoCycles(5);
  });

  dom.resetCycleButton.addEventListener("click", () => {
    resetSimpleModel();
  });

  dom.guidedStartButton.addEventListener("click", () => {
    resetGuidedModel();
    guidedState.started = true;
    dom.guidedFeedback.textContent = t("parasuraman.guided.feedbackStart");
    renderGuided();
  });

  dom.guidedApplyButton.addEventListener("click", () => {
    applyGuidedDecision();
  });

  window.addEventListener("pdca:language-change", () => {
    renderParameterList();
    renderSimpleProjection();
    renderHistory();
    renderGuided();

    if (guidedState.started && guidedState.history.length === 0) {
      dom.guidedFeedback.textContent = t("parasuraman.guided.feedbackStart");
    }
  });
}

function initAdvancedModel() {
  simpleState.params = createParameterStateFromDefaults();
  guidedState.params = buildGuidedInitialParams();

  setMode("simple");
  renderParameterList();
  syncTopControlsFromState();
  renderSimpleProjection();
  renderHistory();
  renderGuided();
  bindGeneralEvents();
}

function unlockAdvancedContent() {
  accessDom.lock.hidden = true;
  accessDom.content.hidden = false;
  initAdvancedModel();
}

function setupAdvancedLock() {
  if (!accessDom.form || !accessDom.input || !accessDom.message) {
    unlockAdvancedContent();
    return;
  }

  accessDom.message.textContent = t("parasuramanAdvanced.lock.hint");
  accessDom.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = accessDom.input.value.trim();

    if (password === ACCESS_PASSWORD) {
      unlockAdvancedContent();
      return;
    }

    accessDom.message.textContent = t("parasuramanAdvanced.lock.error");
    accessDom.input.value = "";
    accessDom.input.focus();
  });

  window.addEventListener("pdca:language-change", () => {
    if (!accessDom.content.hidden) {
      return;
    }
    accessDom.message.textContent = t("parasuramanAdvanced.lock.hint");
  });
}

function initPage() {
  initShell();
  setupAdvancedLock();
}

initPage();
