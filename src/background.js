const defaultDelay = 1;

chrome.tabs.onActivated.addListener(({ tabId }) => {

	setTimeout(
		() => triggerTabSlide(tabId),
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

function triggerTabSlide (tabId) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, ([ tab ]) => {

		if (!tab)
			return;

		if (tab.id === tabId && tab.index !== 0) {
			chrome.tabs.move(tab.id, {
				index: 0
			});
		}

	});

}