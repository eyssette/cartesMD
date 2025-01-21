import { colorWords } from "../config";
import { textFit } from "../externals/textfit";
import { yaml } from "../processMarkdown/yaml";

function removeWords(string, wordsToRemove) {
	return string
		.split(" ")
		.filter((word) => !wordsToRemove.includes(word))
		.join(" ");
}

function fitElementsMainLogic() {
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
	const z3Elements = document.querySelectorAll(".cardSubtitle");
	const z4Elements = document.querySelectorAll(".cardContentDown");
	const backElements = document.querySelectorAll(".cardBack aside");

	const baseMaxFontSize =
		yaml && yaml.theme && yaml.theme.includes("flashcard") ? 40 : 22;
	textFit(z1Elements, { multiLine: true });
	textFit(z2Elements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
	});
	textFit(z3Elements, { multiLine: true, maxFontSize: baseMaxFontSize + 6 });
	textFit(z4Elements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
	});
	textFit(backElements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
	});
	return true;
}

export function fitElements() {
	new Promise((resolve) => {
		const done = fitElementsMainLogic();
		resolve(done);
	});
}

function fitMathElementsMainLogic() {
	const mathsElements = document.querySelectorAll(".katex-display");
	textFit(mathsElements, { multiLine: true });
	return true;
}

export function fitMathElements() {
	new Promise((resolve) => {
		const done = fitMathElementsMainLogic();
		resolve(done);
	});
}
