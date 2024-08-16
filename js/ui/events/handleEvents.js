import { eventKeyUpDebounceUpdateCards } from "./eventKeyUpDebounceUpdateCards";
import { eventDoubleClick } from "./eventDoubleClick";
import { eventKeyboardShortcuts } from "./eventKeyboardShortcuts";

export function handleEvents(editorElement) {
	eventKeyUpDebounceUpdateCards();
	eventDoubleClick(editorElement);
	eventKeyboardShortcuts(editorElement);
}
