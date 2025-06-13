export function printButton(isFlashMd) {
	const printButtonElement = document.getElementById("printButton");
	if (isFlashMd) {
		let contentWidth = "";
		const contentElement = document.getElementById("content");
		window.addEventListener("beforeprint", () => {
			contentWidth = contentElement.style.width;
			contentElement.style.setProperty("width", "100%", "important");
		});
		window.addEventListener("afterprint", () => {
			contentElement.style.setProperty("width", contentWidth, "important");
		});
	}
	printButtonElement.addEventListener("click", (event) => {
		event.preventDefault();
		window.print();
	});
}
