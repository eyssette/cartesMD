import { loadCSS } from "../../utils/urls";
import {
	handleTestMode,
	isRandomMode,
	isSequentialMode,
	toggleRandomMode,
	toggleSequentialMode,
	toggleVerso,
} from "./menuTestMode";

const headerElement = document.getElementById("header");
const contentElement = document.getElementById("content");
const toggleEditorElement = document.getElementById("toggleEditor");
export let shouldShowEditor = window.innerWidth > 500 ? true : false;

export function showEditor(editorElement, options) {
	loadCSS("css/editorHighlight.min.css", "editorHighlight");
	toggleEditorElement.textContent = "👓";
	editorElement.style.display = "block";
	contentElement.style.width = "50vw";
	contentElement.style.marginLeft = "42vw";
	contentElement.style.paddingTop = "0px";
	headerElement.style.cssText = "";
	shouldShowEditor = true;
	if (options && options.isFlashMd) {
		contentElement.style.setProperty("width", "70vw", "important");
		contentElement.style.gap = "20px";
		contentElement.style.justifyContent = "start";
	}
}

export function hideEditor(editorElement, options) {
	toggleEditorElement.textContent = "✒️";
	editorElement.style.display = "none";
	contentElement.style.width = window.innerWidth > 1500 ? "100%" : "120%";
	contentElement.style.marginLeft = "10px";
	contentElement.style.paddingTop = "60px";
	headerElement.style.cssText =
		"background-color: white;border: 2px solid black;";
	shouldShowEditor = false;
	if (options && options.isFlashMd) {
		const contentElementWidth =
			options.isSmallScreen && options.isTestMode ? "100vw" : "80vw";
		contentElement.style.setProperty("width", contentElementWidth, "important");
		contentElement.style.gap = "30px 40px";
		contentElement.style.justifyContent =
			options.isSmallScreen && !options.isTestMode ? "start" : "center";
		contentElement.style.margin = "auto";
	}
}

export function showOrHideEditor(editorElement, options) {
	if (shouldShowEditor) {
		document.body.classList.remove("noVerso", "isTestMode");
		options.isTestMode = false;
		showEditor(editorElement, options);
	} else {
		hideEditor(editorElement, options);
	}
}

export function showOrHideEditorButton(editorElement, options) {
	toggleEditorElement.addEventListener("click", (event) => {
		event.preventDefault();
		shouldShowEditor = shouldShowEditor ? false : true;
		showOrHideEditor(editorElement, options);
		if (shouldShowEditor) {
			// Si on affiche l'éditeur, on remet les cartes à l'état normal en supprimant toutes les actions liées au mode révision
			toggleVerso(options.isTestMode);
			if (isSequentialMode) toggleSequentialMode();
			if (isRandomMode) toggleRandomMode();
			handleTestMode(editorElement, options);
		}
	});
}
