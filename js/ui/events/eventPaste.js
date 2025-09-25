import { magicConvertToFlashcardsFormat } from "../../processMarkdown/magicConvert/magicConvertToFlashcardsFormat";

// Gestionnaire d'événement paste pour l'éditeur CodeJar
export function eventPaste(editorElement) {
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

			// Vérifier si le contenu ne contient pas "## "
			if (!pastedText.includes("## ") && pastedText.split("\n").length > 1) {
				// Transformer le contenu avec magicConvertToFlashcardsFormat
				const transformedContent = magicConvertToFlashcardsFormat(pastedText);

				// Insérer le contenu transformé dans l'éditeur
				insertTextAtCursor(editorElement, transformedContent);
			} else {
				// Si le contenu contient déjà "## ", l'insérer tel quel
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
