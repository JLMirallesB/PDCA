import {
  getCurrentLanguage,
  getLanguageLabel,
  getSupportedLanguages,
  setCurrentLanguage,
  t,
  translateDocument
} from "./i18n.js";

function syncNavigation() {
  const currentPage = document.body.dataset.page;
  const links = document.querySelectorAll("[data-nav-link]");
  links.forEach((link) => {
    const target = link.getAttribute("data-nav-link");
    if (target === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
      return;
    }
    link.classList.remove("is-active");
    link.removeAttribute("aria-current");
  });
}

function syncCurrentYear() {
  const yearNode = document.querySelector("[data-current-year]");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function setupLanguagePicker() {
  const picker = document.querySelector("[data-language-select]");
  if (!picker) {
    return;
  }

  const currentLanguage = getCurrentLanguage();
  picker.innerHTML = "";

  getSupportedLanguages().forEach((languageCode) => {
    const option = document.createElement("option");
    option.value = languageCode;
    option.textContent = getLanguageLabel(languageCode);
    picker.append(option);
  });

  picker.value = currentLanguage;
  picker.setAttribute("aria-label", t("common.language"));

  picker.addEventListener("change", (event) => {
    const nextLanguage = event.target.value;
    setCurrentLanguage(nextLanguage);
  });
}

function refreshStaticUI() {
  translateDocument(document);
  syncNavigation();
  syncCurrentYear();
}

export function initShell() {
  setupLanguagePicker();
  refreshStaticUI();
  window.addEventListener("pdca:language-change", () => {
    const picker = document.querySelector("[data-language-select]");
    if (picker) {
      picker.value = getCurrentLanguage();
      picker.setAttribute("aria-label", t("common.language"));
    }
    refreshStaticUI();
  });
}
