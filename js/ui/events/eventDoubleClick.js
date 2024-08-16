import { showEditor } from "../menu/menuShowOrHideEditor";

export function eventDoubleClick(editorElement) {
	// Double clic pour focaliser l'éditeur sur la carte sur laquelle on a cliqué
	document.body.addEventListener("dblclick", (event) => {
		const markdownTitles = document.querySelectorAll(".markdownTitles.h2");
		let currentElement = event.target;
		let selectedCard = currentElement.closest(".cardBackAndFront");
		if (selectedCard) {
			const selectedCardNumber = selectedCard.id.replace("card-", "");
			const markdownSelectedCard = markdownTitles[selectedCardNumber - 1];
			showEditor(editorElement);
			document.body.classList.remove("hideMenu");
			markdownSelectedCard.scrollIntoView();
		}
	});
}
