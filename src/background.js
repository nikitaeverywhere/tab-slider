// This comments are preprocessed and in final browser bundle will go an appropriate API.
/* @exclude */ import * as api from "./apis/chrome.js"; /* @endexclude */
/* @echo "import * as api from './apis/" *//* @echo browser *//* @echo ".js';" */

import { defaultDelay } from "./utils/const.js";

let timeout;

api.onTabActivated(() => {

	clearTimeout(timeout);
	timeout = setTimeout(
		triggerTabSlide,
		(localStorage.hasOwnProperty("delay") ? localStorage["delay"] : defaultDelay) * 1000
	);

});

api.onTabCreated(({ id, active }) => {

	if (!active)
		return;

	moveTabLeft(id);

});

function moveTabLeft (id) {
	api.getPinnedTabsNumber((pinnedTabs) => api.move(id, pinnedTabs));
}

function triggerTabSlide () {
	api.getActiveTab((tab) => tab && tab.index !== 0 && moveTabLeft(tab.id));
}