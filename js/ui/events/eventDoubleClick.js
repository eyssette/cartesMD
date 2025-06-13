import { showEditor } from "../menu/menuShowOrHideEditor";

export function eventDoubleClick(editorElement, options) {
	// Double clic pour focaliser l'éditeur sur la carte sur laquelle on a cliqué
	document.body.addEventListener("dblclick", (event) => {
		if (!document.body.classList.contains("isTestMode")) {
			const markdownTitles = document.querySelectorAll(".markdownTitles.h2");
			let currentElement = event.target;
			let selectedCard = currentElement.closest(".cardBackAndFront");
			if (selectedCard) {
				const selectedCardNumber = selectedCard.id.replace("card-", "");
				const markdownSelectedCard = markdownTitles[selectedCardNumber - 1];
				showEditor(editorElement, options);
				document.body.classList.remove("hideMenu");
				markdownSelectedCard.scrollIntoView();
			}
		}
	});
}
