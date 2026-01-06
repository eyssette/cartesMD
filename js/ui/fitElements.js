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
	const z1Elements = document.querySelectorAll(".z1");
	const z2Elements = document.querySelectorAll(".z2");
	const z3Elements = document.querySelectorAll(".z3");
	const z4Elements = document.querySelectorAll(".z4");
	const backElements = document.querySelectorAll(".cardBack aside");

	const baseMaxFontSize =
		yaml && yaml.theme && yaml.theme.includes("flashcard") ? 40 : 22;
	textFit(z1Elements, { multiLine: true, maxFontSize: 60 });
	textFit(z2Elements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
	});
	textFit(z3Elements, { multiLine: true, maxFontSize: baseMaxFontSize + 6 });
	if (!(yaml && yaml.theme && yaml.theme == "flashcard-simple")) {
		textFit(z4Elements, {
			multiLine: true,
			minFontSize: 7.75,
			maxFontSize: baseMaxFontSize,
		});
	}
	textFit(backElements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
	});
	// On ajuste les éléments contenant des images avec un délai pour être sûr que les images soient chargées
	setTimeout(() => {
		const elementsWithImagesAndText = new Set();
		// On cherche les images dans les zones où il peut y en avoir avec du texte.
		document
			.querySelectorAll(".z2 img, .z4 img, .cardBack aside img")
			.forEach((img) => {
				const parent = img.closest(".z2, .z4, .cardBack, aside");
				if (parent) {
					// On vérifie que ce parent contient aussi du texte
					const hasText = parent.textContent.trim().length > 0;
					if (hasText) elementsWithImagesAndText.add(parent);
				}
			});
		elementsWithImagesAndText.forEach((element) => {
			textFit(element, {
				multiLine: true,
				minFontSize: 7.75,
				maxFontSize: baseMaxFontSize,
			});
		});
	}, 1000);
	return true;
}

export function fitElements() {
	return new Promise((resolve) => {
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
	return new Promise((resolve) => {
		const done = fitMathElementsMainLogic();
		resolve(done);
	});
}
