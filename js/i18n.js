const languageSelect = document.getElementById("languageSelect");

async function loadLanguage(lang) {

  try {

    const response = await fetch(`/lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {

      const key = el.getAttribute("data-i18n");

      if (translations[key]) {
        el.textContent = translations[key];
      }

    });

    localStorage.setItem("language", lang);

  } catch (error) {
    console.error("Translation loading error:", error);
  }

}

languageSelect.addEventListener("change", (e) => {
  loadLanguage(e.target.value);
});

window.addEventListener("DOMContentLoaded", () => {

  const savedLang = localStorage.getItem("language") || "en";

  languageSelect.value = savedLang;

  loadLanguage(savedLang);

});