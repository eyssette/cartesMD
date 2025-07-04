import {
	shouldShowEditor,
	showEditor,
	hideEditor,
} from "../menu/menuShowOrHideEditor";
import { orientationButtonElement } from "../menu/menuChangeOrientation";
const testModeButton = document.querySelector("#testModeButton");

export function eventKeyboardShortcuts(editorElement, options) {
	// Gestion des raccourcis clavier
	document.body.addEventListener("keydown", (event) => {
		if (!(options && options.isTestModeFromParams)) {
			if ((event.ctrlKey || event.metaKey) && event.key === "p") {
				event.preventDefault();
				window.print();
			}
			if (event.altKey && (event.key === "®" || event.key === "r")) {
				event.preventDefault();
				if (testModeButton) {
					testModeButton.click();
				}
			}

			if (event.ctrlKey && event.shiftKey && event.key === "O") {
				event.preventDefault();
				orientationButtonElement.click();
			} else {
				document.body.classList.remove("hideMenu");
				if (shouldShowEditor && event.key === "Escape") {
					hideEditor(editorElement, options);
				} else {
					if (!shouldShowEditor && event.key === "e") {
						event.preventDefault();
						document.body.classList.remove("noVerso", "isTestMode");
						options.isTestMode = false;
						showEditor(editorElement, options);
						editorElement.focus();
					} else {
						if (!shouldShowEditor && event.key === "m") {
							document.body.classList.add("hideMenu");
						}
					}
				}
			}
		}
	});
}
