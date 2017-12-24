import { getDelay, setDelay, getMovePinnedTabs, setMovePinnedTabs } from "./utils/index.js";

window.addEventListener("load", () => {

	const delayElement = document.getElementById("delay");
	const movePinnedTabsElement = document.getElementById("movePinnedTabs");

	delayElement.value = getDelay();
	movePinnedTabsElement.checked = getMovePinnedTabs();

	delayElement.addEventListener("change", ({ target }) => {
		target.value = setDelay(target.value);
	});
	movePinnedTabsElement.addEventListener("change", ({ target }) => {
		target.checked = setMovePinnedTabs(target.checked);
	});

});
