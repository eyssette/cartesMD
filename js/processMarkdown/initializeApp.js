import { parseMarkdown } from "./parseMarkdown";
import { createCards } from "../ui/createCards";
import { initializeEditor } from "../ui/editor/initializeEditor";
import { updateEditorContent } from "../ui/editor/updateEditorContent";
import { initializeMenu } from "../ui/menu/initializeMenu";
import { handleEvents } from "../ui/events/handleEvents";
import { params } from "../ui/params";
import { changeImageFormatIfError } from "../ui/changeImageFormatIfError";

export async function initializeApp(md, editorElement, urlParams, options) {
	try {
		const { isSmallScreen } = options;

		initializeEditor(editorElement);
		if (!isSmallScreen) updateEditorContent(md);

		options = params(urlParams, editorElement, options);
		initializeMenu(editorElement, isSmallScreen, options);

		const cardsData = parseMarkdown(md, options);
		createCards(cardsData, options);
		changeImageFormatIfError();
		handleEvents(editorElement, options);

		if (isSmallScreen) updateEditorContent(md);
	} catch (error) {
		console.error(error);
		throw new Error(
			"Erreur lors de l'initialisation de l'application. La source n'est probablement pas un fichier Markdown qui respecte la syntaxe de CartesMD",
		);
	}
}
