import {
	showOrHideEditorButton,
	showEditor,
	hideEditor,
} from "./menuShowOrHideEditor";
import { printButton } from "./menuPrintButton";
import { changeOrientationButton } from "./menuChangeOrientation";

export function initializeMenu(editorElement, isSmallScreen, isFlashMd) {
	showOrHideEditorButton(editorElement);
	if (isSmallScreen) {
		hideEditor(editorElement);
	} else {
		showEditor(editorElement);
	}
	printButton();
	changeOrientationButton(editorElement, isFlashMd);
}
