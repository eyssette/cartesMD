import {
	shouldShowEditor,
	showEditor,
	hideEditor,
} from "../menu/menuShowOrHideEditor";
import { orientationButtonElement } from "../menu/menuChangeOrientation";

export function eventKeyboardShortcuts(editorElement) {
	// Gestion des raccourcis clavier
	document.body.addEventListener("keydown", (event) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "p") {
			event.preventDefault();
			window.print();
		}
		if (event.ctrlKey && event.shiftKey && event.key === "O") {
			event.preventDefault();
			orientationButtonElement.click();
		} else {
			document.body.classList.remove("hideMenu");
			if (shouldShowEditor && event.key === "Escape") {
				hideEditor(editorElement);
			} else {
				if (!shouldShowEditor && event.key === "e") {
					event.preventDefault();
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
