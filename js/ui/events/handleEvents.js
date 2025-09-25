import { eventKeyUpDebounceUpdateCards } from "./eventKeyUpDebounceUpdateCards";
import { eventDoubleClick } from "./eventDoubleClick";
import { eventKeyboardShortcuts } from "./eventKeyboardShortcuts";
import { eventPaste } from "./eventPaste";

export function handleEvents(editorElement, options) {
	eventKeyUpDebounceUpdateCards(options);
	eventDoubleClick(editorElement, options);
	eventKeyboardShortcuts(editorElement, options);
	eventPaste(editorElement);
}
