import { eventKeyUpDebounceUpdateCards } from "./eventKeyUpDebounceUpdateCards";
import { eventDoubleClick } from "./eventDoubleClick";
import { eventKeyboardShortcuts } from "./eventKeyboardShortcuts";

export function handleEvents(editorElement, isFlashMd) {
	eventKeyUpDebounceUpdateCards();
	eventDoubleClick(editorElement, isFlashMd);
	eventKeyboardShortcuts(editorElement, isFlashMd);
}
