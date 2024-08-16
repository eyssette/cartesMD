import { showOrHideEditorButton } from "./menuShowOrHideEditor";
import { printButton } from "./menuPrintButton";
import { changeOrientationButton } from "./menuChangeOrientation";

export function initializeMenu(editorElement) {
	showOrHideEditorButton(editorElement);
	printButton();
	changeOrientationButton(editorElement);
}
