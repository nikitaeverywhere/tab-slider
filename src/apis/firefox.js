export function move (id, index, callback) {

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
