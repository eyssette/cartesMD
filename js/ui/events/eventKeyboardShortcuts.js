import {
	shouldShowEditor,
	showEditor,
	hideEditor,
} from "../menu/menuShowOrHideEditor";
import { orientationButtonElement } from "../menu/menuChangeOrientation";
import { openPrintModal } from "../menu/menuPrintButton";
const testModeButton = document.querySelector("#testModeButton");

export function eventKeyboardShortcuts(editorElement, options) {
	// Gestion des raccourcis clavier
	document.body.addEventListener("keydown", (event) => {
		if (!(options && options.isTestModeFromParams)) {
			if ((event.ctrlKey || event.metaKey) && event.key === "p") {
				event.preventDefault();
				openPrintModal();
			}
			if (event.altKey && (event.key === "®" || event.key === "r")) {
				event.preventDefault();
				if (testModeButton) {
					testModeButton.click();
				}
			}

			if (event.ctrlKey && event.shiftKey && event.key === "O") {
				event.preventDefault();
				orientationButtonElement.click();
			} else {
				document.body.classList.remove("hideMenu");
				if (shouldShowEditor && event.key === "Escape") {
					// On doit vérifier que la modale d'impression n'est pas ouverte, sinon le Escape doit fermer la modale d'impression et pas l'éditeur
					const isPrintModalOpen = document.querySelector("#printModalOverlay");
					if (isPrintModalOpen) {
						isPrintModalOpen.remove();
						return;
					}
					hideEditor(editorElement, options);
				} else {
					if (!shouldShowEditor && event.key === "e") {
						event.preventDefault();
						document.body.classList.remove("noVerso", "isTestMode");
						options.isTestMode = false;
						showEditor(editorElement, options);
						editorElement.focus();
					} else {
						if (!shouldShowEditor && event.key === "m") {
							document.body.classList.add("hideMenu");
						}
					}
				}
			}
		} else {
			if (options.isTestModeFromParams) {
				const sequentialButtonsContainer =
					document.getElementById("sequentialButtons");
				if (
					sequentialButtonsContainer &&
					sequentialButtonsContainer.style.display !== "none"
				) {
					const sequentialButtons =
						sequentialButtonsContainer.querySelectorAll("button");
					// Si on clique sur la flèche gauche, on clique sur le bouton "Facile", sinon si on clique sur la flèche droite, on clique sur le bouton "Difficile"
					if (event.key === "ArrowLeft") {
						event.preventDefault();
						sequentialButtons[0].click();
					} else if (event.key === "ArrowRight") {
						event.preventDefault();
						sequentialButtons[1].click();
					}
					// Si on clique sur "espace", on clique sur la carte affichée
					if (event.key === " ") {
						event.preventDefault();
						const visibleCard = document.querySelector(
							".cardBackAndFront[style*='display: flex']",
						);
						if (visibleCard) {
							visibleCard.click();
						}
					}
				}
			}
		}
	});
}
