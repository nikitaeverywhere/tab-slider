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

	chrome.tabs.move(id, {
		index: 0
	});

});

function triggerTabSlide () {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, ([ tab ]) => {

		if (!tab)
			return;

		if (tab.index !== 0) {
			chrome.tabs.move(tab.id, {
				index: 0
			});
		}

	});

}