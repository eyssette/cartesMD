let savedClickHandler = null;

function handleCardClick(event) {
	const currentElement = event.target;
	const selectedCard = currentElement.closest(".cardBackAndFront");
	if (!selectedCard) return;
	selectedCard.classList.toggle("showVerso");
}

export function eventClick(options) {
	if (options && options.isTestMode) {
		if (!savedClickHandler) {
			savedClickHandler = handleCardClick;
			document.body.addEventListener("click", savedClickHandler);
		}
	} else {
		if (savedClickHandler) {
			document.body.removeEventListener("click", savedClickHandler);
			savedClickHandler = null;
		}
	}
}
