import {
  getDelay,
  getMaxTabs,
  getMovePinnedTabs,
  setDelay,
  setMaxTabs,
  setMovePinnedTabs,
} from "./utils/index.js";

window.addEventListener("load", async () => {
  const delayElement = document.getElementById("delay");
  const maxTabsElement = document.getElementById("maxTabs");
  const movePinnedTabsElement = document.getElementById("movePinnedTabs");

  delayElement.value = await getDelay();
  maxTabsElement.value = await getMaxTabs();
  movePinnedTabsElement.checked = await getMovePinnedTabs();

  delayElement.addEventListener("change", async ({ target }) => {
    target.value = await setDelay(target.value);
  });
  maxTabsElement.addEventListener("change", async ({ target }) => {
    target.value = await setMaxTabs(target.value);
  });
  movePinnedTabsElement.addEventListener("change", async ({ target }) => {
    target.checked = await setMovePinnedTabs(target.checked);
  });
});
