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

api.onTabCreated((tab) => {

	api.getActiveTab((activeTab) => { // Opera does not set tab.active immediately onTabCreated

		if (activeTab.id !== tab.id)
			return;

		moveTabLeft(tab);

	});

});

function moveTabLeft (tab) {
	api.getPinnedTabsNumber((pinnedTabs) => api.move(tab.id, tab.pinned ? 0 : pinnedTabs));
}

function triggerTabSlide () {
	api.getActiveTab((tab) => tab && tab.index !== 0 && moveTabLeft(tab));
}