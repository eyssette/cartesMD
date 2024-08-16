import { hideEditor } from "./menu/menuShowOrHideEditor";

export function params(editorElement) {
	const params = new URLSearchParams(document.location.search);
	const viewParam = parseInt(params.get("v")) ? parseInt(params.get("v")) : 0;
	const editorParam = params.get("e") == "0" ? 0 : 1;
	const menuParam = params.get("m") == "0" ? 0 : 1;

	if (viewParam == 1 || editorParam == 0) {
		hideEditor(editorElement);
	}
	if (menuParam == 0) {
		document.body.classList.add("hideMenu");
		hideEditor(editorElement);
	}
}
