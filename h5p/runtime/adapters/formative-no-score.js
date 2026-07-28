(() => {
  "use strict";

  const scrubScorebar = () => {
    for (const scorebar of document.querySelectorAll(
      ".h5p-question-scorebar, .h5p-question-scorebar-container"
    )) {
      scorebar.remove();
    }
    for (const buttons of document.querySelectorAll(".h5p-question-buttons.has-scorebar")) {
      buttons.classList.remove("has-scorebar");
    }
  };

  const observer = new MutationObserver(scrubScorebar);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
    childList: true,
    subtree: true
  });
  scrubScorebar();
})();
