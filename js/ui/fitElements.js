import { colorWords } from "../config";
import { textFit } from "../externals/textfit";
import { waitForThemeReady, yaml } from "../processMarkdown/yaml";

const mainElement = document.querySelector("main");

function removeWords(string, wordsToRemove) {
	return string
		.split(" ")
		.filter((word) => !wordsToRemove.includes(word))
		.join(" ");
}

function fitElementsWithImages(baseMaxFontSize) {
	const elementsWithImagesAndText = new Set();
	// On cherche les images dans les zones où il peut y en avoir avec du texte.
	mainElement
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
			reProcess: false,
		});
	});
}

function waitForNextPaint() {
	return new Promise((resolve) => {
		requestAnimationFrame(() => requestAnimationFrame(resolve));
	});
}

function waitForImagesReady(timeoutMs = 3000) {
	const container = mainElement.getElementById("content");
	if (!container) {
		return Promise.resolve();
	}
	const images = Array.from(container.querySelectorAll("img"));
	const pendingImages = images.filter((img) => !img.complete);
	if (pendingImages.length === 0) {
		return Promise.resolve();
	}
	return new Promise((resolve) => {
		let finishedCount = 0;
		const done = () => {
			finishedCount++;
			if (finishedCount >= pendingImages.length) {
				clearTimeout(timeoutId);
				resolve();
			}
		};
		const timeoutId = setTimeout(resolve, timeoutMs);
		pendingImages.forEach((img) => {
			img.addEventListener("load", done, { once: true });
			img.addEventListener("error", done, { once: true });
		});
	});
}

async function waitForLayoutToStabilize() {
	await Promise.all([waitForThemeReady(), waitForImagesReady()]);
	await waitForNextPaint();
}

function fitElementsMainLogic() {
	let elementsToStyle = mainElement.querySelectorAll("[alt]");
	for (const elementToStyle of elementsToStyle) {
		const newStyle = elementToStyle.getAttribute("alt")
			? removeWords(elementToStyle.getAttribute("alt"), colorWords)
			: "";
		elementToStyle.style.cssText = elementToStyle.style.cssText
			? elementToStyle.style.cssText + newStyle
			: newStyle;
	}
	const z1Elements = mainElement.querySelectorAll(".z1");
	const z2Elements = mainElement.querySelectorAll(".z2");
	const z3Elements = mainElement.querySelectorAll(".z3");
	const z4Elements = mainElement.querySelectorAll(".z4");
	const backElements = mainElement.querySelectorAll(".cardBack aside");

	const baseMaxFontSize =
		yaml && yaml.theme && yaml.theme.includes("flashcard") ? 40 : 36;
	textFit(z1Elements, { multiLine: true, maxFontSize: 60, reProcess: false });
	textFit(z2Elements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
		reProcess: false,
	});
	textFit(z3Elements, {
		multiLine: true,
		maxFontSize: baseMaxFontSize + 6,
		reProcess: false,
	});
	if (!(yaml && yaml.theme && yaml.theme == "flashcard-simple")) {
		textFit(z4Elements, {
			multiLine: true,
			minFontSize: 7.75,
			maxFontSize: baseMaxFontSize,
			reProcess: false,
		});
	}
	textFit(backElements, {
		multiLine: true,
		minFontSize: 7.75,
		maxFontSize: baseMaxFontSize,
		reProcess: false,
	});
	fitElementsWithImages(baseMaxFontSize);
	return true;
}

export function fitElements() {
	return new Promise((resolve) => {
		const done = fitElementsMainLogic();
		resolve(done);
	});
}

export async function fitElementsWhenReady() {
	fitElementsMainLogic();
	await waitForLayoutToStabilize();
	return fitElementsMainLogic();
}

function fitMathElementsMainLogic() {
	const mathsElements = mainElement.querySelectorAll(".katex-display");
	textFit(mathsElements, { multiLine: true, reProcess: false });
	return true;
}

export function fitMathElements() {
	return new Promise((resolve) => {
		const done = fitMathElementsMainLogic();
		resolve(done);
	});
}
