import { loadCSS } from "../../utils";

export function printButton() {
	const printButtonElement = document.getElementById("printButton");
	printButtonElement.addEventListener("click", (event) => {
		event.preventDefault();
		loadCSS("css/print.min.css", "print").finally(() => {
			window.print();
		});
	});
}
