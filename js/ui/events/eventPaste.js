import { magicConvertToFlashcardsFormat } from "../../processMarkdown/magicConvert/magicConvertToFlashcardsFormat";

let shiftPressed = false;

// Gestionnaire d'événement paste pour l'éditeur CodeJar
export function eventPaste(editorElement) {
	// On suit l'état de la touche Shift pour savoir si elle est maintenue lors du collage
	editorElement.addEventListener(
		"keydown",
		function (e) {
			shiftPressed = !!e.shiftKey;
		},
		true,
	);

	editorElement.addEventListener(
		"keyup",
		function (e) {
			shiftPressed = !!e.shiftKey;
		},
		true,
	);

	editorElement.addEventListener(
		"paste",
		function (event) {
			// Empêcher le comportement par défaut du paste
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			// Récupérer le contenu du presse-papier
			const clipboardData = event.clipboardData || window.clipboardData;
			const pastedText = clipboardData.getData("text/plain");

			// Si l'utilisateur a collé en maintenant Shift, et que le texte
			// semble être un bloc multi-lignes sans titres "## ", on essaie
			// de le transformer en format de flashcards
			if (
				shiftPressed &&
				!pastedText.includes("## ") &&
				pastedText.split("\n").length > 1
			) {
				const transformedContent = magicConvertToFlashcardsFormat(pastedText);

				// Insérer le contenu transformé dans l'éditeur
				insertTextAtCursor(editorElement, transformedContent);
			} else {
				// Sinon, insérer le texte tel quel
				insertTextAtCursor(editorElement, pastedText);
			}
		},
		true,
	); // Utiliser la capture pour intercepter l'événement plus tôt
}

// Fonction utilitaire pour insérer du texte à la position du curseur
function insertTextAtCursor(element, text) {
	const selection = window.getSelection();

	if (selection.rangeCount > 0) {
		const range = selection.getRangeAt(0);

		// Supprimer le contenu sélectionné s'il y en a
		range.deleteContents();

		// Créer un nœud de texte avec le nouveau contenu
		const textNode = document.createTextNode(text);

		// Insérer le texte à la position du curseur
		range.insertNode(textNode);

		// Déplacer le curseur à la fin du texte inséré
		range.setStartAfter(textNode);
		range.setEndAfter(textNode);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		// Si aucune sélection, ajouter à la fin du contenu
		element.textContent += text;
	}

	// Déclencher un événement input pour notifier CodeJar du changement
	const inputEvent = new Event("input", { bubbles: true });
	element.dispatchEvent(inputEvent);
}
