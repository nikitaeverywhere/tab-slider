// This comments are preprocessed and in final browser bundle will appear an appropriate API.
/* @exclude */ import * as api from "./apis/chrome.js"; /* @endexclude */
/* @echo "import * as api from './apis/" *//* @echo browser *//* @echo ".js';" */

import { getDelay, getMovePinnedTabs } from "./utils/index.js";

let timeout;

api.onTabActivated(() => {

	clearTimeout(timeout);
	timeout = setTimeout(triggerTabSlide, getDelay() * 1000);

});

api.onTabCreated((tab) => {

	api.getActiveTab((activeTab) => { // Opera does not set tab.active immediately onTabCreated

		if (activeTab.id !== tab.id)
			return;

		moveTab(tab);

	});

});

function moveTab (tab) {
	api.getPinnedTabsNumber((pinnedTabs) => {
		if (tab.pinned && !getMovePinnedTabs())
			return;
		api.moveTab(tab.id, tab.pinned ? pinnedTabs - 1 : pinnedTabs);
	});
}

function triggerTabSlide () {
	api.getActiveTab((tab) => tab && moveTab(tab));
}