const defaultDelay = 1;

chrome.tabs.onActivated.addListener(({ tabId }) => {

	setTimeout(
		() => triggerTabSlide(tabId),
		(localStorage.hasOwnProperty("delay") ? localStorage["delay"] : defaultDelay) * 1000
	);

});

function triggerTabSlide (tabId) {

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, ([ tab ]) => {

		if (!tab)
			return;

		if (tab.id === tabId) {
			chrome.tabs.move(tab.id, {
				index: 0
			});
		}

	});

}