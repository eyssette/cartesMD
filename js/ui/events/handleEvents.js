import { eventKeyUpDebounceUpdateCards } from "./eventKeyUpDebounceUpdateCards";
import { eventDoubleClick } from "./eventDoubleClick";
import { eventKeyboardShortcuts } from "./eventKeyboardShortcuts";

export function handleEvents(editorElement, options) {
	eventKeyUpDebounceUpdateCards();
	eventDoubleClick(editorElement, options);
	eventKeyboardShortcuts(editorElement, options);
}
