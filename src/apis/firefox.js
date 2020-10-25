export function moveTab (id, index, callback) {

	browser.tabs.move(id, {
		index: index
	}).then(() => callback ? callback() : null);

}

export function onTabActivated (callback) {
	browser.tabs.onActivated.addListener(({ id }) => callback(id));
}

export function onTabCreated (callback) {
	browser.tabs.onCreated.addListener((tab) => callback(tab));
}

export function groupTabs (tabIds, groupId, callback) {
	browser.tabs.group({ tabIds, groupId }, callback);
}

export function removeTab (ids, callback) {
	browser.tabs.remove(ids, callback);
}

export function getAllTabs (callback) {
	browser.tabs.query({
		currentWindow: true
	}, (tabs) => callback(tabs));
}

export function getPinnedTabsNumber (callback) {

	browser.tabs.query({
		currentWindow: true,
		pinned: true
	}, ({ length }) => callback(length));

}

export function getActiveTab (callback) {

	browser.tabs.query({
		active: true,
		currentWindow: true
	}).then(([ tab ]) => callback(tab || null));

}
