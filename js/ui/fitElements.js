import { colorWords } from "../config";
import { textFit } from "../externals/textfit";

function removeWords(string, wordsToRemove) {
	return string
		.split(" ")
		.filter((word) => !wordsToRemove.includes(word))
		.join(" ");
}

export function fitElements() {
	let elementsToStyle = document.querySelectorAll("[alt]");
	for (const elementToStyle of elementsToStyle) {
		const newStyle = elementToStyle.getAttribute("alt")
			? removeWords(elementToStyle.getAttribute("alt"), colorWords)
			: "";
		elementToStyle.style.cssText = elementToStyle.style.cssText
			? elementToStyle.style.cssText + newStyle
			: newStyle;
	}
	const z1Elements = document.querySelectorAll("h2");
	const z2Elements = document.querySelectorAll(".cardContentUp");
	const z3Elements = document.querySelectorAll("h3");
	const z4Elements = document.querySelectorAll(".cardContentDown");

	textFit(z1Elements, { multiLine: true });
	textFit(z2Elements, { multiLine: true, minFontSize: 7.75 });
	textFit(z3Elements, { multiLine: true });
	textFit(z4Elements, {
		multiLine: true,
		minFontSize: 7.75,
	});
}

export function fitMathElements() {
	const mathsElements = document.querySelectorAll(".katex-display");
	textFit(mathsElements, { multiLine: true });
}
