import {
	showOrHideEditorButton,
	showEditor,
	hideEditor,
} from "./menuShowOrHideEditor";
import { printButton } from "./menuPrintButton";
import { changeOrientationButton } from "./menuChangeOrientation";

export function initializeMenu(editorElement, isSmallScreen, isFlashMd) {
	showOrHideEditorButton(editorElement, isFlashMd);
	if (isSmallScreen) {
		hideEditor(editorElement, isFlashMd);
	} else {
		showEditor(editorElement, isFlashMd);
	}
	printButton();
	changeOrientationButton(editorElement, isFlashMd);
}
