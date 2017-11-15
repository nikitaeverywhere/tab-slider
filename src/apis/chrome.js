export function move (id, index, callback) {

	chrome.tabs.move(id, {
		index: index
	}, callback);

}

export function onTabActivated (callback) {
	chrome.tabs.onActivated.addListener(({ id }) => callback(id));
}
