const defaultDelay = 1;

let timeout;

chrome.tabs.onActivated.addListener(() => {

	clearTimeout(timeout);
	timeout = setTimeout(
		triggerTabSlide,
		(localStorage.hasOwnProperty("delay") ? localStorage["delay"] : defaultDelay) * 1000
	);

});

chrome.tabs.onCreated.addListener(({ id, selected }) => {

	if (!selected)
		return;

	moveTabLeft(id);

});

function getPinnedTabsNumber (callback) {

	chrome.tabs.query({
		currentWindow: true,
		pinned: true
	}, ({ length }) => callback(length));

}

function moveTabLeft (id) {

	getPinnedTabsNumber((pinnedTabs) => {

		chrome.tabs.move(id, {
			index: pinnedTabs
		});

	});

}

function triggerTabSlide () {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, ([ tab ]) => {

		if (!tab || tab.index === 0)
			return;

		moveTabLeft(tab.id);

	});

}