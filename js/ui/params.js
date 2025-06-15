import { hideEditor } from "./menu/menuShowOrHideEditor";

export function params(urlParams, editorElement, options) {
	const viewParam = parseInt(urlParams.get("v"))
		? parseInt(urlParams.get("v"))
		: 0;
	const editorParam = urlParams.get("e") == "0" ? 0 : 1;
	const menuParam = urlParams.get("m") == "0" ? 0 : 1;
	const testModeParam =
		urlParams.get("t") == "1" || urlParams.get("r") == "1" ? 1 : 0;
	if (testModeParam == 1) {
		options.isTestMode = true;
		options.isTestModeFromParams = true;
		document.body.classList.add("noVerso", "isTestMode");
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
