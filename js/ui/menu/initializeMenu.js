import {
	showOrHideEditorButton,
	showEditor,
	hideEditor,
} from "./menuShowOrHideEditor";
import { printButton } from "./menuPrintButton";
import { changeOrientationButton } from "./menuChangeOrientation";

export function initializeMenu(editorElement, isSmallScreen) {
	showOrHideEditorButton(editorElement);
	if (isSmallScreen) {
		hideEditor(editorElement);
	} else {
		showEditor(editorElement);
	}
	printButton();
	changeOrientationButton(editorElement);
}
