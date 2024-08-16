import defaultMD from "../../content.md";
import { handleURL } from "../utils";
import { parseMarkdown } from "./parseMarkdown";
import { createCards } from "../ui/createCards";
import { initializeEditor } from "../ui/editor/initializeEditor";
import { updateEditorContent } from "../ui/editor/updateEditorContent";
import { initializeMenu } from "../ui/menu/initializeMenu";
import { handleEvents } from "../ui/events/handleEvents";
import { params } from "../ui/params";

let md = defaultMD;

export function getDataAndStartCreatingCards() {
	const editorElement = document.getElementById("editor");
	// Récupération du markdown externe
	const url = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	const sourceMarkdown = handleURL(url);
	if (sourceMarkdown !== "") {
		fetch(sourceMarkdown)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				initializeEditor(editorElement);
				updateEditorContent(md);
				initializeMenu(editorElement);
				const cardsData = parseMarkdown(md);
				createCards(cardsData);
				handleEvents(editorElement);
				params(editorElement);
			})
			.catch((error) => {
				initializeEditor(editorElement);
				updateEditorContent(md);
				initializeMenu(editorElement);
				const cardsData = parseMarkdown(md);
				createCards(cardsData);
				handleEvents(editorElement);
				params(editorElement);
				alert(
					"Il y a une erreur dans l'URL ou dans la syntaxe du fichier source. Merci de vous assurer que le fichier est bien accessible et qu'il respecte les règles d'écriture de CartesMD",
				);
				console.log(error);
			});
	} else {
		initializeEditor(editorElement);
		updateEditorContent(md);
		initializeMenu(editorElement);
		const cardsData = parseMarkdown(md);
		createCards(cardsData);
		handleEvents(editorElement);
		params(editorElement);
	}
}
