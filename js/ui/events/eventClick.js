export function eventClick(options) {
	if (options && options.isTestMode) {
		document.body.addEventListener("click", (event) => {
			const currentElement = event.target;
			const selectedCard = currentElement.closest(".cardBackAndFront");
			if (!selectedCard) return;
			selectedCard.classList.toggle("showVerso");
		});
	}
}
