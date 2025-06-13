import { hideEditor } from "./menu/menuShowOrHideEditor";

export function params(editorElement, options) {
	const params = new URLSearchParams(document.location.search);
	const viewParam = parseInt(params.get("v")) ? parseInt(params.get("v")) : 0;
	const editorParam = params.get("e") == "0" ? 0 : 1;
	const menuParam = params.get("m") == "0" ? 0 : 1;
	const testModeParam = params.get("t") == "1" ? 1 : 0;
	if (testModeParam == 1) {
		options.isTestMode = true;
		options.isTestModeFromParams = true;
	}

	if (viewParam == 1 || editorParam == 0) {
		options.hideEditorByDefault = true;
		hideEditor(editorElement, options);
	}
	if (menuParam == 0 || testModeParam == 1) {
		document.body.classList.add("hideMenu");
		hideEditor(editorElement, options);
	}
	return options;
}
