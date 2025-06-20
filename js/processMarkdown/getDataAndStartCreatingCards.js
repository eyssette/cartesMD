import defaultMD from "../../index.md";
import { handleURL } from "../utils/urls";
import { parseMarkdown } from "./parseMarkdown";
import { createCards } from "../ui/createCards";
import { initializeEditor } from "../ui/editor/initializeEditor";
import { updateEditorContent } from "../ui/editor/updateEditorContent";
import { initializeMenu } from "../ui/menu/initializeMenu";
import { handleEvents } from "../ui/events/handleEvents";
import { params } from "../ui/params";
import { changeImageFormatIfError } from "../ui/changeImageFormatIfError";

let md = defaultMD;

export function getDataAndStartCreatingCards() {
	const editorElement = document.getElementById("editor");
	const isSmallScreen = window.innerWidth <= 500 ? true : false;
	if (isSmallScreen) {
		editorElement.style.display = "none";
	}
	// Récupération du markdown externe
	const hash = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	const isFlashMd =
		window.location.href.includes("https://flashmd.forge.apps.education.fr") ||
		window.location.href.includes("?flashmd");
	if (isFlashMd) {
		const h1Element = document.querySelector("h1");
		h1Element.textContent = "FlashMD";
		document.title = "FlashMD";
	}
	let sourceMarkdown;
	const urlParams = new URLSearchParams(document.location.search);
	let options = { isFlashMd: isFlashMd, isSmallScreen: isSmallScreen };
	const useRawSource = urlParams.get("raw");
	if (useRawSource) {
		md = decodeURIComponent(window.atob(hash));
	} else {
		sourceMarkdown = handleURL(hash);
		sourceMarkdown =
			sourceMarkdown == "" && isFlashMd ? "index-flashmd.md" : sourceMarkdown;
	}
	if (sourceMarkdown !== "" && !useRawSource) {
		fetch(sourceMarkdown)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				initializeEditor(editorElement);
				if (!isSmallScreen) {
					updateEditorContent(md);
				}
				options = params(urlParams, editorElement, options);
				initializeMenu(editorElement, isSmallScreen, options);
				const cardsData = parseMarkdown(md, options);
				createCards(cardsData, options);
				changeImageFormatIfError();
				handleEvents(editorElement, options);
				if (isSmallScreen) {
					updateEditorContent(md);
				}
			})
			.catch((error) => {
				initializeEditor(editorElement);
				if (!isSmallScreen) {
					updateEditorContent(md);
				}
				options = params(urlParams, editorElement, options);
				initializeMenu(editorElement, isSmallScreen, options);
				const cardsData = parseMarkdown(md, options);
				createCards(cardsData, options);
				changeImageFormatIfError();
				handleEvents(editorElement, options);
				if (isSmallScreen) {
					updateEditorContent(md);
				}
				alert(
					"Il y a une erreur dans l'URL ou dans la syntaxe du fichier source. Merci de vous assurer que le fichier est bien accessible et qu'il respecte les règles d'écriture de CartesMD",
				);
				console.log(error);
			});
	} else {
		initializeEditor(editorElement);
		if (!isSmallScreen) {
			updateEditorContent(md);
		}
		options = params(urlParams, editorElement, options);
		initializeMenu(editorElement, isSmallScreen, options);
		const cardsData = parseMarkdown(md, options);
		createCards(cardsData, options);
		changeImageFormatIfError();
		handleEvents(editorElement, options);
		if (isSmallScreen) {
			updateEditorContent(md);
		}
	}
}
