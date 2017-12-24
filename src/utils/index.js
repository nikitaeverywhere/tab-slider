import { defaultDelay, movePinnedTabs } from "./const";

export function getDelay () {
	return localStorage.hasOwnProperty("delay")
		? parseFloat(localStorage["delay"])
		: defaultDelay;
}
export function setDelay (number) {
	return localStorage["delay"] = number > 0.1 ? number : 0.1;
}

export function getMovePinnedTabs () {
	return localStorage.hasOwnProperty("movePinnedTabs")
		? localStorage["movePinnedTabs"] === "true"
		: movePinnedTabs;
}
export function setMovePinnedTabs (boolean) {
	return localStorage["movePinnedTabs"] = !!boolean;
}