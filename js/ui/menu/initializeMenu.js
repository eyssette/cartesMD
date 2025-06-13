import {
	showOrHideEditorButton,
	showEditor,
	hideEditor,
} from "./menuShowOrHideEditor";
import { printButton } from "./menuPrintButton";
import { changeOrientationButton } from "./menuChangeOrientation";
import { launchTestMode } from "./menuTestMode";

export function initializeMenu(editorElement, isSmallScreen, options) {
	showOrHideEditorButton(editorElement, options);
	if (isSmallScreen || options.hideEditorByDefault || options.isTestMode) {
		hideEditor(editorElement, options);
	} else {
		showEditor(editorElement, options);
	}
	printButton(options);
	changeOrientationButton(editorElement, options);
	if (options && options.isFlashMd) {
		launchTestMode(editorElement, options);
	}
}
