import { defaultDelay, maxTabs, movePinnedTabs } from "./const";

export function getDelay() {
  return localStorage.hasOwnProperty("delay")
    ? parseFloat(localStorage["delay"])
    : defaultDelay;
}
export function setDelay(number) {
  return (localStorage["delay"] = number > 0.1 ? number : 0.1);
}

export function getMovePinnedTabs() {
  return localStorage.hasOwnProperty("movePinnedTabs")
    ? localStorage["movePinnedTabs"] === "true"
    : movePinnedTabs;
}
export function setMovePinnedTabs(boolean) {
  return (localStorage["movePinnedTabs"] = !!boolean);
}

export function getMaxTabs() {
  return localStorage.hasOwnProperty("maxTabs")``
    ? parseInt(localStorage["maxTabs"])
    : maxTabs;
}
export function setMaxTabs(number) {
  return (localStorage["maxTabs"] = Math.max(2, +number));
}
