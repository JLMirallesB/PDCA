import { initShell } from "../core/app-shell.js";
import { t } from "../core/i18n.js";

const definitionStepKeys = [
  "pdca.definition.steps.s1",
  "pdca.definition.steps.s2",
  "pdca.definition.steps.s3",
  "pdca.definition.steps.s4",
  "pdca.definition.steps.s5",
  "pdca.definition.steps.s6"
];

const phaseOrder = ["plan", "do", "check", "act"];

const definitionVisualStates = [
  { visible: [], active: null },
  { visible: ["plan"], active: "plan" },
  { visible: ["plan", "do"], active: "do" },
  { visible: ["plan", "do", "check"], active: "check" },
  { visible: ["plan", "do", "check", "act"], active: "act" },
  { visible: ["plan", "do", "check", "act"], active: "act" }
];

const cycleTokenPositions = {
  plan: { left: 64, top: 35 },
  do: { left: 64, top: 65 },
  check: { left: 36, top: 65 },
  act: { left: 36, top: 35 }
};

const malfunctionTypes = [
  {
    id: "type1",
    titleKey: "pdca.malfunctions.type1.title",
    descriptionKey: "pdca.malfunctions.type1.description",
    effectKey: "pdca.malfunctions.type1.effect",
    potential: 64
  },
  {
    id: "type2",
    titleKey: "pdca.malfunctions.type2.title",
    descriptionKey: "pdca.malfunctions.type2.description",
    effectKey: "pdca.malfunctions.type2.effect",
    potential: 43
  },
  {
    id: "type3",
    titleKey: "pdca.malfunctions.type3.title",
    descriptionKey: "pdca.malfunctions.type3.description",
    effectKey: "pdca.malfunctions.type3.effect",
    potential: 35
  }
];

const handoffLinkOrder = ["plan-do", "do-check", "check-act", "act-plan"];

const handoffItems = [
  { id: "i1", infoKey: "pdca.phase.plan.output", answer: "plan-do" },
  { id: "i2", infoKey: "pdca.phase.do.output", answer: "do-check" },
  { id: "i3", infoKey: "pdca.phase.check.output", answer: "check-act" },
  { id: "i4", infoKey: "pdca.phase.act.output", answer: "act-plan" }
];

const dom = {
  definitionCounter: document.getElementById("definition-counter"),
  definitionText: document.getElementById("definition-text"),
  definitionPrev: document.getElementById("definition-prev"),
  definitionNext: document.getElementById("definition-next"),
  definitionCycle: document.getElementById("definition-cycle"),
  definitionToken: document.getElementById("definition-token"),

  visualCycle: document.getElementById("visual-cycle"),
  visualToken: document.getElementById("visual-token"),
  phaseTitle: document.getElementById("phase-title"),
  phaseInput: document.getElementById("phase-input"),
  phaseProcess: document.getElementById("phase-process"),
  phaseOutput: document.getElementById("phase-output"),
  phaseHandoffCaption: document.getElementById("phase-handoff-caption"),
  phaseHandoffOutput: document.getElementById("phase-handoff-output"),
  phaseHandoffInput: document.getElementById("phase-handoff-input"),
  phasePrev: document.getElementById("phase-prev"),
  phaseNext: document.getElementById("phase-next"),

  malfunctionCycle: document.getElementById("malfunction-cycle"),
  malfunctionToken: document.getElementById("malfunction-token"),
  malfunctionTitle: document.getElementById("malfunction-title"),
  malfunctionDescription: document.getElementById("malfunction-description"),
  malfunctionEffect: document.getElementById("malfunction-effect"),
  potentialFill: document.getElementById("potential-fill"),
  potentialLabel: document.getElementById("potential-label"),
  malfunctionPrev: document.getElementById("malfunction-prev"),
  malfunctionNext: document.getElementById("malfunction-next"),

  orderGameList: document.getElementById("order-game-list"),
  orderGameShuffle: document.getElementById("order-game-shuffle"),
  orderGameCheck: document.getElementById("order-game-check"),
  orderGameFeedback: document.getElementById("order-game-feedback"),

  matchGameList: document.getElementById("match-game-list"),
  matchGameReset: document.getElementById("match-game-reset"),
  matchGameCheck: document.getElementById("match-game-check"),
  matchGameFeedback: document.getElementById("match-game-feedback")
};

const state = {
  definitionIndex: 0,
  phaseIndex: 0,
  malfunctionIndex: 0,
  orderGame: [],
  orderGameResult: null,
  matchGameOrder: [],
  matchGameAnswers: {},
  matchGameResult: null
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

function shuffleArray(values) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = copy[index];
    copy[index] = copy[randomIndex];
    copy[randomIndex] = temp;
  }
  return copy;
}

function isSameOrder(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  return left.every((value, index) => value === right[index]);
}

function getShuffledDifferentFrom(values) {
  const shuffled = shuffleArray(values);
  if (values.length > 1 && isSameOrder(shuffled, values)) {
    const alt = [...shuffled];
    const first = alt[0];
    alt[0] = alt[1];
    alt[1] = first;
    return alt;
  }
  return shuffled;
}

function setTokenPosition(tokenElement, phaseId) {
  if (!tokenElement || !phaseId || !cycleTokenPositions[phaseId]) {
    if (tokenElement) {
      tokenElement.classList.add("is-hidden");
    }
    return;
  }
  const tokenPosition = cycleTokenPositions[phaseId];
  tokenElement.classList.remove("is-hidden");
  tokenElement.style.left = `${tokenPosition.left}%`;
  tokenElement.style.top = `${tokenPosition.top}%`;
}

function setNodeVisibility(canvasElement, visiblePhases) {
  if (!canvasElement) {
    return;
  }
  const visibleSet = new Set(visiblePhases);
  canvasElement.querySelectorAll("[data-cycle-node]").forEach((node) => {
    const isVisible = visibleSet.has(node.dataset.cycleNode);
    node.classList.toggle("is-hidden", !isVisible);
  });
  canvasElement.querySelectorAll("[data-cycle-link]").forEach((link) => {
    const [from, to] = (link.dataset.cycleLink || "").split("-");
    const isVisible = visibleSet.has(from) && visibleSet.has(to);
    link.classList.toggle("is-hidden", !isVisible);
  });
}

function setActivePhase(canvasElement, phaseId) {
  if (!canvasElement) {
    return;
  }
  canvasElement.querySelectorAll("[data-cycle-node]").forEach((node) => {
    const isActive = node.dataset.cycleNode === phaseId;
    node.classList.toggle("is-active", isActive);
  });
}

function renderDefinition() {
  const total = definitionStepKeys.length;
  const key = definitionStepKeys[state.definitionIndex];
  const visualState = definitionVisualStates[state.definitionIndex];

  dom.definitionCounter.textContent = t("pdca.definition.counter", {
    current: state.definitionIndex + 1,
    total
  });
  dom.definitionText.textContent = t(key);
  setNodeVisibility(dom.definitionCycle, visualState.visible);
  setActivePhase(dom.definitionCycle, visualState.active);
  setTokenPosition(dom.definitionToken, visualState.active);

  updateEdgeButtons(dom.definitionPrev, dom.definitionNext, state.definitionIndex, total);
}

function renderPhase() {
  const phaseId = phaseOrder[state.phaseIndex];
  const nextPhaseId = phaseOrder[(state.phaseIndex + 1) % phaseOrder.length];

  setNodeVisibility(dom.visualCycle, phaseOrder);
  setActivePhase(dom.visualCycle, phaseId);
  setTokenPosition(dom.visualToken, phaseId);

  dom.phaseTitle.textContent = t(`pdca.phase.${phaseId}.label`);
  dom.phaseInput.textContent = t(`pdca.phase.${phaseId}.input`);
  dom.phaseProcess.textContent = t(`pdca.phase.${phaseId}.process`);
  dom.phaseOutput.textContent = t(`pdca.phase.${phaseId}.output`);
  dom.phaseHandoffCaption.textContent = t("pdca.visual.handoffCaption", {
    from: t(`pdca.phase.${phaseId}.label`),
    to: t(`pdca.phase.${nextPhaseId}.label`)
  });
  dom.phaseHandoffOutput.textContent = t(`pdca.phase.${phaseId}.output`);
  dom.phaseHandoffInput.textContent = t(`pdca.phase.${nextPhaseId}.input`);

  updateEdgeButtons(dom.phasePrev, dom.phaseNext, state.phaseIndex, phaseOrder.length);
}

function renderMalfunction() {
  const current = malfunctionTypes[state.malfunctionIndex];
  const malfunctionPhaseMap = {
    type1: "check",
    type2: "act",
    type3: "do"
  };

  dom.malfunctionCycle.dataset.malfunctionType = current.id;
  setNodeVisibility(dom.malfunctionCycle, phaseOrder);
  setActivePhase(dom.malfunctionCycle, malfunctionPhaseMap[current.id]);
  setTokenPosition(dom.malfunctionToken, malfunctionPhaseMap[current.id]);
  dom.malfunctionTitle.textContent = t(current.titleKey);
  dom.malfunctionDescription.textContent = t(current.descriptionKey);
  dom.malfunctionEffect.textContent = t(current.effectKey);
  dom.potentialFill.style.width = `${current.potential}%`;
  dom.potentialLabel.textContent = t("pdca.malfunctions.potential", {
    value: current.potential
  });

  updateEdgeButtons(dom.malfunctionPrev, dom.malfunctionNext, state.malfunctionIndex, malfunctionTypes.length);
}

function renderOrderGameFeedback() {
  if (!state.orderGameResult) {
    dom.orderGameFeedback.textContent = "";
    dom.orderGameFeedback.dataset.status = "";
    return;
  }
  if (state.orderGameResult.type === "success") {
    dom.orderGameFeedback.textContent = t("pdca.games.order.feedbackSuccess");
    dom.orderGameFeedback.dataset.status = "success";
    return;
  }
  dom.orderGameFeedback.textContent = t("pdca.games.order.feedbackPartial", {
    correct: state.orderGameResult.correct,
    total: phaseOrder.length
  });
  dom.orderGameFeedback.dataset.status = "warning";
}

function renderOrderGame() {
  dom.orderGameList.innerHTML = "";
  state.orderGame.forEach((phaseId, index) => {
    const item = document.createElement("li");
    item.className = "order-item";

    const label = document.createElement("strong");
    label.className = "order-name";
    label.textContent = t(`pdca.phase.${phaseId}.label`);

    const controls = document.createElement("div");
    controls.className = "order-controls";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.className = "btn btn-secondary btn-mini";
    upButton.dataset.orderMove = "up";
    upButton.dataset.orderIndex = String(index);
    upButton.textContent = "↑";
    upButton.setAttribute("aria-label", t("pdca.games.order.moveUp"));
    upButton.hidden = index === 0;

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.className = "btn btn-secondary btn-mini";
    downButton.dataset.orderMove = "down";
    downButton.dataset.orderIndex = String(index);
    downButton.textContent = "↓";
    downButton.setAttribute("aria-label", t("pdca.games.order.moveDown"));
    downButton.hidden = index === state.orderGame.length - 1;

    controls.append(upButton, downButton);
    item.append(label, controls);
    dom.orderGameList.append(item);
  });
  renderOrderGameFeedback();
}

function moveOrderGameItem(index, direction) {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= state.orderGame.length) {
    return;
  }
  const next = [...state.orderGame];
  const temp = next[index];
  next[index] = next[targetIndex];
  next[targetIndex] = temp;
  state.orderGame = next;
  state.orderGameResult = null;
  renderOrderGame();
}

function resetOrderGame() {
  state.orderGame = getShuffledDifferentFrom(phaseOrder);
  state.orderGameResult = null;
  renderOrderGame();
}

function checkOrderGame() {
  const correct = state.orderGame.reduce((count, phaseId, index) => {
    return count + Number(phaseId === phaseOrder[index]);
  }, 0);

  state.orderGameResult = {
    type: correct === phaseOrder.length ? "success" : "partial",
    correct
  };
  renderOrderGameFeedback();
}

function getLinkLabel(linkId) {
  const [from, to] = linkId.split("-");
  return t("pdca.games.match.linkTemplate", {
    from: t(`pdca.phase.${from}.label`),
    to: t(`pdca.phase.${to}.label`)
  });
}

function renderMatchGameFeedback() {
  if (!state.matchGameResult) {
    dom.matchGameFeedback.textContent = "";
    dom.matchGameFeedback.dataset.status = "";
    return;
  }
  if (state.matchGameResult.type === "incomplete") {
    dom.matchGameFeedback.textContent = t("pdca.games.match.feedbackIncomplete");
    dom.matchGameFeedback.dataset.status = "warning";
    return;
  }
  if (state.matchGameResult.type === "success") {
    dom.matchGameFeedback.textContent = t("pdca.games.match.feedbackSuccess");
    dom.matchGameFeedback.dataset.status = "success";
    return;
  }
  dom.matchGameFeedback.textContent = t("pdca.games.match.feedbackPartial", {
    correct: state.matchGameResult.correct,
    total: handoffItems.length
  });
  dom.matchGameFeedback.dataset.status = "warning";
}

function renderMatchGame() {
  dom.matchGameList.innerHTML = "";

  state.matchGameOrder.forEach((item) => {
    const wrapper = document.createElement("label");
    wrapper.className = "match-item";

    const textBlock = document.createElement("div");
    textBlock.className = "match-text";

    const small = document.createElement("small");
    small.textContent = t("pdca.games.match.infoLabel");

    const strong = document.createElement("strong");
    strong.textContent = t(item.infoKey);

    textBlock.append(small, strong);

    const select = document.createElement("select");
    select.dataset.matchItem = item.id;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = t("pdca.games.match.selectPlaceholder");
    select.append(placeholder);

    handoffLinkOrder.forEach((linkId) => {
      const option = document.createElement("option");
      option.value = linkId;
      option.textContent = getLinkLabel(linkId);
      select.append(option);
    });

    select.value = state.matchGameAnswers[item.id] || "";

    wrapper.append(textBlock, select);
    dom.matchGameList.append(wrapper);
  });

  renderMatchGameFeedback();
}

function resetMatchGame() {
  state.matchGameOrder = getShuffledDifferentFrom(handoffItems);
  state.matchGameAnswers = {};
  state.matchGameResult = null;
  renderMatchGame();
}

function checkMatchGame() {
  let missing = 0;
  let correct = 0;

  state.matchGameOrder.forEach((item) => {
    const selected = state.matchGameAnswers[item.id] || "";
    if (!selected) {
      missing += 1;
      return;
    }
    if (selected === item.answer) {
      correct += 1;
    }
  });

  if (missing > 0) {
    state.matchGameResult = { type: "incomplete" };
    renderMatchGameFeedback();
    return;
  }

  state.matchGameResult = {
    type: correct === handoffItems.length ? "success" : "partial",
    correct
  };
  renderMatchGameFeedback();
}

function setupGames() {
  resetOrderGame();
  resetMatchGame();
}

function setupEvents() {
  dom.definitionPrev.addEventListener("click", () => {
    state.definitionIndex = clamp(state.definitionIndex - 1, 0, definitionStepKeys.length - 1);
    renderDefinition();
  });

  dom.definitionNext.addEventListener("click", () => {
    state.definitionIndex = clamp(state.definitionIndex + 1, 0, definitionStepKeys.length - 1);
    renderDefinition();
  });

  dom.phasePrev.addEventListener("click", () => {
    state.phaseIndex = clamp(state.phaseIndex - 1, 0, phaseOrder.length - 1);
    renderPhase();
  });

  dom.phaseNext.addEventListener("click", () => {
    state.phaseIndex = clamp(state.phaseIndex + 1, 0, phaseOrder.length - 1);
    renderPhase();
  });

  dom.malfunctionPrev.addEventListener("click", () => {
    state.malfunctionIndex = clamp(state.malfunctionIndex - 1, 0, malfunctionTypes.length - 1);
    renderMalfunction();
  });

  dom.malfunctionNext.addEventListener("click", () => {
    state.malfunctionIndex = clamp(state.malfunctionIndex + 1, 0, malfunctionTypes.length - 1);
    renderMalfunction();
  });

  dom.orderGameList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-order-move]");
    if (!button) {
      return;
    }
    const index = Number(button.dataset.orderIndex);
    const move = button.dataset.orderMove;
    if (!Number.isInteger(index) || (move !== "up" && move !== "down")) {
      return;
    }
    moveOrderGameItem(index, move);
  });

  dom.orderGameShuffle.addEventListener("click", () => {
    resetOrderGame();
  });

  dom.orderGameCheck.addEventListener("click", () => {
    checkOrderGame();
  });

  dom.matchGameList.addEventListener("change", (event) => {
    const select = event.target.closest("select[data-match-item]");
    if (!select) {
      return;
    }
    const itemId = select.dataset.matchItem;
    if (!itemId) {
      return;
    }
    state.matchGameAnswers[itemId] = select.value;
    state.matchGameResult = null;
    renderMatchGameFeedback();
  });

  dom.matchGameReset.addEventListener("click", () => {
    resetMatchGame();
  });

  dom.matchGameCheck.addEventListener("click", () => {
    checkMatchGame();
  });

  window.addEventListener("pdca:language-change", () => {
    renderDefinition();
    renderPhase();
    renderMalfunction();
    renderOrderGame();
    renderMatchGame();
  });
}

function initPage() {
  initShell();
  setupGames();
  setupEvents();
  renderDefinition();
  renderPhase();
  renderMalfunction();
}

initPage();
