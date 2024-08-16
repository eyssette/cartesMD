export function printButton() {
	const printButtonElement = document.getElementById("printButton");
	printButtonElement.addEventListener("click", (event) => {
		event.preventDefault();
		window.print();
	});
}
