import { initShell } from "../core/app-shell.js";
import { t } from "../core/i18n.js";

const dom = {
  modeButtons: Array.from(document.querySelectorAll("[data-mode-target]")),
  boxes: Array.from(document.querySelectorAll("[data-pvca-phase]")),
  lead: document.getElementById("pvca-lead"),
  problem: document.getElementById("pvca-problem"),
  resetButton: document.getElementById("pvca-reset"),
  modal: document.getElementById("pvca-modal"),
  modalTitle: document.getElementById("pvca-modal-title"),
  modalDescription: document.getElementById("pvca-modal-description"),
  modalClose: document.getElementById("pvca-modal-close")
};

const state = {
  mode: "definition",
  removedPhase: null,
  modalPhase: null
};

function getPhaseLabel(phaseId) {
  return t(`pvca.phases.${phaseId}.label`);
}

function getModeLead() {
  return t(`pvca.lead.${state.mode}`);
}

function renderModeTabs() {
  dom.modeButtons.forEach((button) => {
    const isActive = button.dataset.modeTarget === state.mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function renderBoxes() {
  dom.boxes.forEach((box) => {
    const phaseId = box.dataset.pvcaPhase;
    if (!phaseId) {
      return;
    }
    box.textContent = getPhaseLabel(phaseId);
    box.setAttribute("aria-label", getPhaseLabel(phaseId));

    const isMissing = state.mode === "malfunction" && state.removedPhase === phaseId;
    box.classList.toggle("is-missing", isMissing);
    box.disabled = isMissing;
  });
}

function renderProblem() {
  if (state.mode === "definition") {
    dom.problem.textContent = t("pvca.problem.definition");
    dom.problem.dataset.status = "neutral";
    return;
  }

  if (!state.removedPhase) {
    dom.problem.textContent = t("pvca.problem.malfunction");
    dom.problem.dataset.status = "neutral";
    return;
  }

  dom.problem.textContent = t(`pvca.malfunctions.${state.removedPhase}`);
  dom.problem.dataset.status = "danger";
}

function renderLead() {
  dom.lead.textContent = getModeLead();
}

function renderResetButton() {
  const shouldShow = state.mode === "malfunction" && Boolean(state.removedPhase);
  dom.resetButton.hidden = !shouldShow;
}

function renderModal() {
  if (!state.modalPhase) {
    dom.modal.hidden = true;
    return;
  }

  dom.modalTitle.textContent = getPhaseLabel(state.modalPhase);
  dom.modalDescription.textContent = t(`pvca.phases.${state.modalPhase}.definition`);
  dom.modal.hidden = false;
}

function render() {
  renderModeTabs();
  renderLead();
  renderBoxes();
  renderProblem();
  renderResetButton();
  renderModal();
}

function openModalForPhase(phaseId) {
  state.modalPhase = phaseId;
  renderModal();
}

function closeModal() {
  state.modalPhase = null;
  renderModal();
}

function triggerMalfunction(phaseId) {
  state.removedPhase = phaseId;
  render();
}

function resetMalfunction() {
  state.removedPhase = null;
  render();
}

function setMode(mode) {
  if (mode !== "definition" && mode !== "malfunction") {
    return;
  }
  state.mode = mode;
  state.removedPhase = null;
  closeModal();
  render();
}

function setupEvents() {
  dom.modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.modeTarget;
      if (!mode) {
        return;
      }
      setMode(mode);
    });
  });

  dom.boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const phaseId = box.dataset.pvcaPhase;
      if (!phaseId) {
        return;
      }

      if (state.mode === "definition") {
        openModalForPhase(phaseId);
        return;
      }

      if (state.removedPhase) {
        return;
      }
      triggerMalfunction(phaseId);
    });
  });

  dom.modal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    if (target.dataset.modalClose === "backdrop") {
      closeModal();
    }
  });

  dom.modalClose.addEventListener("click", () => {
    closeModal();
  });

  dom.resetButton.addEventListener("click", () => {
    resetMalfunction();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  window.addEventListener("pdca:language-change", () => {
    render();
  });
}

function initPage() {
  initShell();
  setupEvents();
  render();
}

initPage();
