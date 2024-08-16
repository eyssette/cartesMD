import { parseMarkdown } from "../../processMarkdown/parseMarkdown";
import { createCards } from "../createCards";
import { updateEditorContent } from "../editor/updateEditorContent";

// Bouton pour changer l'orientation et créer des cartes ou des flashcards
export const orientationButtonElement =
	document.getElementById("orientationButton");

let lastTheme = "";

export function changeOrientationButton(editorElement) {
	orientationButtonElement.addEventListener("click", () => {
		const splittedContent = editorElement.textContent.split("---");
		if (
			editorElement.textContent.startsWith("---") &&
			splittedContent.length > 2
		) {
			const yamlPart = splittedContent[1];
			if (!yamlPart.includes("theme: flashcard")) {
				if (yamlPart.includes("theme: ")) {
					splittedContent[1] = splittedContent[1]
						.replace(/theme: (.*)/, function (match, v1) {
							if (v1) {
								lastTheme = v1;
							}
							return "theme: flashcard";
						})
						.replaceAll("\n\n", "\n");
				} else {
					splittedContent[1] = splittedContent[1] + "\ntheme: flashcard\n";
					splittedContent[1] = splittedContent[1].replaceAll("\n\n", "\n");
				}
			} else {
				splittedContent[1] = splittedContent[1]
					.replace(
						/theme: flashcard.*/,
						lastTheme.length > 0 ? "theme: " + lastTheme : "",
					)
					.replaceAll("\n\n", "\n");
			}
			if (splittedContent[1].trim().length == 0) {
				splittedContent.shift();
				splittedContent.shift();
			}
			updateEditorContent(splittedContent.join("---").trim());
			const parsedMD = parseMarkdown(editorElement.textContent);
			createCards(parsedMD);
		} else {
			updateEditorContent(
				"---\ntheme: flashcard\n---\n\n" + editorElement.textContent,
			);
			const parsedMD = parseMarkdown(editorElement.textContent);
			createCards(parsedMD);
		}
	});
}
