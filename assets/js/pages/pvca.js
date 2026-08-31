import { initShell } from "../core/app-shell.js";
import { t } from "../core/i18n.js";

const dom = {
  modeButtons: Array.from(document.querySelectorAll("[data-mode-target]")),
  boxes: Array.from(document.querySelectorAll("[data-pvca-phase]")),
  lead: document.getElementById("pvca-lead"),
  problem: document.getElementById("pvca-problem"),
  resetButton: document.getElementById("pvca-reset"),
  panel: document.getElementById("pvca-panel"),
  modal: document.getElementById("pvca-modal"),
  modalTitle: document.getElementById("pvca-modal-title"),
  modalDescription: document.getElementById("pvca-modal-description"),
  modalClose: document.getElementById("pvca-modal-close")
};

const state = {
  mode: "definition",
  removedPhase: null,
  modalPhase: null,
  modalOpener: null
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
    button.tabIndex = isActive ? 0 : -1;
    if (isActive && dom.panel) {
      dom.panel.setAttribute("aria-labelledby", button.id);
    }
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

function getModalFocusables() {
  return Array.from(
    dom.modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
  ).filter((node) => !node.hidden);
}

function trapModalFocus(event) {
  const focusables = getModalFocusables();
  if (focusables.length === 0) {
    return;
  }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openModalForPhase(phaseId, opener) {
  state.modalPhase = phaseId;
  state.modalOpener = opener || null;
  renderModal();
  dom.modalClose.focus();
}

function closeModal() {
  if (state.modalPhase === null) {
    return;
  }
  const opener = state.modalOpener;
  state.modalPhase = null;
  state.modalOpener = null;
  renderModal();
  if (opener && document.contains(opener)) {
    opener.focus();
  }
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

function focusTabByOffset(currentIndex, offset) {
  const total = dom.modeButtons.length;
  const nextButton = dom.modeButtons[(currentIndex + offset + total) % total];
  const mode = nextButton.dataset.modeTarget;
  if (!mode) {
    return;
  }
  setMode(mode);
  nextButton.focus();
}

function setupEvents() {
  dom.modeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.modeTarget;
      if (!mode) {
        return;
      }
      setMode(mode);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        focusTabByOffset(index, 1);
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        focusTabByOffset(index, -1);
      }
    });
  });

  dom.boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const phaseId = box.dataset.pvcaPhase;
      if (!phaseId) {
        return;
      }

      if (state.mode === "definition") {
        openModalForPhase(phaseId, box);
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
    if (state.modalPhase === null) {
      return;
    }
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key === "Tab") {
      trapModalFocus(event);
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
