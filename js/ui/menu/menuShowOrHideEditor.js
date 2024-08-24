import { loadCSS } from "../../utils/urls";

const headerElement = document.getElementById("header");
const contentElement = document.getElementById("content");
const toggleEditorElement = document.getElementById("toggleEditor");
export let shouldShowEditor = window.innerWidth > 500 ? true : false;

export function showEditor(editorElement) {
	loadCSS("css/editorHighlight.min.css", "editorHighlight");
	toggleEditorElement.textContent = "👓";
	editorElement.style.display = "block";
	contentElement.style.width = "50vw";
	contentElement.style.marginLeft = "42vw";
	contentElement.style.paddingTop = "0px";
	headerElement.style.cssText = "";
	shouldShowEditor = true;
}

export function hideEditor(editorElement) {
	toggleEditorElement.textContent = "✒️";
	editorElement.style.display = "none";
	contentElement.style.width = window.innerWidth > 1500 ? "100%" : "120%";
	contentElement.style.marginLeft = "10px";
	contentElement.style.paddingTop = "60px";
	headerElement.style.cssText =
		"background-color: white;;border: 2px solid black;";
	shouldShowEditor = false;
}

export function showOrHideEditor(editorElement) {
	if (shouldShowEditor) {
		showEditor(editorElement);
	} else {
		hideEditor(editorElement);
	}
}

export function showOrHideEditorButton(editorElement) {
	toggleEditorElement.addEventListener("click", (event) => {
		event.preventDefault();
		shouldShowEditor = shouldShowEditor ? false : true;
		showOrHideEditor(editorElement);
	});
}
