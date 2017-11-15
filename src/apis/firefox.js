export function move (id, index, callback) {

	browser.tabs.move(id, {
		index: index
	}).then(() => callback());

}

export function onTabActivated (callback) {
	browser.tabs.onActivated.addListener(({ id }) => callback(id));
}
