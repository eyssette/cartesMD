import {
	shouldShowEditor,
	showEditor,
	hideEditor,
} from "../menu/menuShowOrHideEditor";
import { orientationButtonElement } from "../menu/menuChangeOrientation";

export function eventKeyboardShortcuts(editorElement) {
	// Gestion des raccourcis clavier
	document.body.addEventListener("keyup", (event) => {
		if (event.ctrlKey && event.shiftKey && event.altKey && event.key === "O") {
			orientationButtonElement.click();
		} else {
			document.body.classList.remove("hideMenu");
			if (shouldShowEditor && event.key === "Escape") {
				hideEditor(editorElement);
			} else {
				if (!shouldShowEditor && event.key === "e") {
					showEditor(editorElement);
					editorElement.focus();
				} else {
					if (!shouldShowEditor && event.key === "m") {
						document.body.classList.add("hideMenu");
					}
				}
			}
		}
	});
}
