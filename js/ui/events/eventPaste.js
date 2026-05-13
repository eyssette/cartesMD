import { magicConvertToFlashcardsFormat } from "../../processMarkdown/magicConvert/magicConvertToFlashcardsFormat";
import { editor } from "../editor/initializeEditor";

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

			// Si le contenu est une image, on insère une balise Markdown avec l'image encodée en base64
			const pastedFiles = clipboardData.files;
			if (pastedFiles && pastedFiles.length > 0) {
				Array.from(pastedFiles).forEach((file) => {
					if (file.type.startsWith("image/")) {
						const reader = new FileReader();
						reader.onload = function (e) {
							const base64Image = e.target.result;
							const markdownImage = `![](${base64Image})`;
							insertTextAtCursor(editorElement, markdownImage);
						};
						reader.readAsDataURL(file);
					}
				});
				return; // Ne pas continuer avec le texte si on a déjà traité des fichiers
			}

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
	);
}

// Fonction utilitaire pour insérer du texte à la position du curseur
function insertTextAtCursor(_element, text) {
	let pos;
	try {
		pos = editor.save();
		/* eslint-disable no-unused-vars */
	} catch (error) {
		// Pas de sélection valide : on insère à la fin
		const currentText = editor.toString();
		editor.updateCode(currentText + text);
		const newLen = (currentText + text).length;
		editor.restore({ start: newLen, end: newLen, dir: "->" });
		return;
	}

	const currentText = editor.toString();
	// Remplace la sélection (ou insère au curseur si start === end)
	const before = currentText.slice(0, pos.start);
	const after = currentText.slice(pos.end);
	const newText = before + text + after;
	const newCursor = pos.start + text.length;

	editor.updateCode(newText);
	editor.restore({ start: newCursor, end: newCursor, dir: "->" });
}
