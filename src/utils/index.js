// This comments are preprocessed and in final browser bundle will appear an appropriate API.
/* @exclude */ import * as api from "../apis/chrome.js"; /* @endexclude */
/* @echo "import * as api from '../apis/" */ /* @echo browser */ /* @echo ".js';" */

export const DEFAULT_DELAY = 1;
export const DEFAULT_MOVE_PINNED_TABS = true;
export const DEFAULT_MAX_TABS = 25;

export async function getDelay() {
  return (await api.hasStorageKey("delay"))
    ? parseFloat(await api.getStorage("delay"))
    : DEFAULT_DELAY;
}
export async function setDelay(number) {
  await api.setStorage("delay", number > 0.1 ? number : 0.1);
  return number;
}

export async function getMovePinnedTabs() {
  return (await api.hasStorageKey("movePinnedTabs"))
    ? (await api.getStorage("movePinnedTabs")) === "true"
    : DEFAULT_MOVE_PINNED_TABS;
}
export async function setMovePinnedTabs(boolean) {
  await api.setStorage("movePinnedTabs", !!boolean);
  return !!boolean;
}

export async function getMaxTabs() {
  return (await api.hasStorageKey("maxTabs"))
    ? parseInt(await api.getStorage("maxTabs"))
    : DEFAULT_MAX_TABS;
}
export async function setMaxTabs(number) {
  await api.setStorage("maxTabs", Math.max(2, +number));
  return number;
}
