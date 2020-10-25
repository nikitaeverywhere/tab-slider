// This comments are preprocessed and in final browser bundle will appear an appropriate API.
/* @exclude */ import * as api from "./apis/chrome.js"; /* @endexclude */
/* @echo "import * as api from './apis/" *//* @echo browser *//* @echo ".js';" */

import { getDelay, getMovePinnedTabs, getMaxTabs } from "./utils/index.js";

let timeout;
const byIndexAsc = (a, b) => a.index - b.index;

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

function removeOverflownTabs () {
	api.getAllTabs((tabs) => {
		const maxTabs = getMaxTabs();
		if (tabs.length > maxTabs) {
			const lastTabs = tabs.sort(byIndexAsc).slice(maxTabs);
			if (lastTabs.length) {
				api.removeTab(lastTabs.map(tab => tab.id));
			}
		}
	});
}

function moveTab (tab) {
	api.getAllTabs((tabs) => {
		if (tab.pinned && !getMovePinnedTabs())
			return;

		const pinnedTabs = tabs.filter(tab => tab.pinned);
		if (tab.groupId > 0 && !tab.pinned) {
			// Since Chrome 88; Pinned tabs cannot be in the group.
			// However, the condition above additionally restricts it.
			const groupId = tab.groupId;
			const allTabsInGroup = [tab].concat(
				tabs.filter(t => t.groupId === tab.groupId && t.id !== tab.id)
					.sort(byIndexAsc)
			);
			const tabIds = allTabsInGroup.map(tab => tab.id);
			api.moveTab(tabIds, pinnedTabs.length, () => {
				// Because the group falls apart, it has to be grouped again.
				api.groupTabs(tabIds, groupId);
				removeOverflownTabs();
			});
		} else {
			api.moveTab(tab.id, tab.pinned ? pinnedTabs.length - 1 : pinnedTabs.length, removeOverflownTabs);
		}
	});
}

function triggerTabSlide () {
	api.getActiveTab((tab) => tab && moveTab(tab));
}