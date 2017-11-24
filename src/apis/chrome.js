export function moveTab (id, index, callback) {

	chrome.tabs.move(id, {
		index: index
	}, callback || (() => {}));

}

export function onTabActivated (callback) {
	chrome.tabs.onActivated.addListener(({ id }) => callback(id));
}

export function onTabCreated (callback) {
	chrome.tabs.onCreated.addListener((tab) => callback(tab));
}

export function getPinnedTabsNumber (callback) {

	chrome.tabs.query({
		currentWindow: true,
		pinned: true
	}, ({ length }) => callback(length));

}

export function getActiveTab (callback) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, ([ tab ]) => callback(tab || null));

}
