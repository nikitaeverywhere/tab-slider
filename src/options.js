import { getDelay, setDelay, getMovePinnedTabs, setMovePinnedTabs, getMaxTabs, setMaxTabs } from "./utils/index.js";

window.addEventListener("load", () => {

	const delayElement = document.getElementById("delay");
	const maxTabsElement = document.getElementById("maxTabs");
	const movePinnedTabsElement = document.getElementById("movePinnedTabs");

	delayElement.value = getDelay();
	maxTabsElement.value = getMaxTabs();
	movePinnedTabsElement.checked = getMovePinnedTabs();

	delayElement.addEventListener("change", ({ target }) => {
		target.value = setDelay(target.value);
	});
	maxTabsElement.addEventListener("change", ({ target }) => {
		target.value = setMaxTabs(target.value);
	});
	movePinnedTabsElement.addEventListener("change", ({ target }) => {
		target.checked = setMovePinnedTabs(target.checked);
	});

});
