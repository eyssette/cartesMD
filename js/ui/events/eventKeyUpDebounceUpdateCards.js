import { parseMarkdown } from "../../processMarkdown/parseMarkdown";
import { createCards } from "../createCards";
import { shouldShowEditor } from "../menu/menuShowOrHideEditor";

// Fonction debounce pour gérer l'update des cards avec un délai
function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

const editorElement = document.getElementById("editor");
// Fonction pour mettre à jour les cartes
function updateCards(options) {
	const parsedMD = parseMarkdown(editorElement.textContent, options);
	createCards(parsedMD, options);
}

export function eventKeyUpDebounceUpdateCards(options) {
	// Utiliser debounce pour appeler updateCards avec un délai afin d'éviter un lag dans le cas d'un document long
	const debouncedUpdateCards = debounce(() => updateCards(options), 300);
	editorElement.addEventListener("keyup", () => {
		if (shouldShowEditor) {
			debouncedUpdateCards();
		}
	});
}
