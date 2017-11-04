const defaultDelay = 1;

window.addEventListener("load", () => {

	const delayElement = document.getElementById("delay");

	delayElement.value = localStorage.hasOwnProperty("delay")
		? localStorage["delay"]
		: defaultDelay;

	delayElement.addEventListener("change", ({ target }) => {
		target.value = localStorage["delay"] = target.value > 0.1 ? target.value : 0.1;
	});

});