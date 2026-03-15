import { markdownToHTML } from "../processMarkdown/markdownToHTML";
import { colorWords } from "../config";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { fitElements, fitMathElements } from "./fitElements";
import { loadScript } from "../utils/urls";
import { isValidColorNameCSS } from "../utils/css";

const contentElement = document.getElementById("content");
let isFirstPageLoad = true;

function waitForRenderedFrame() {
	// On attend que le navigateur ait eu le temps de rendre les éléments à l'écran, sinon le calcul automatique de la taille de la police optimale ne se fera pas correctement
	return new Promise((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(resolve)),
	);
}

function waitForImagesToLoad(root) {
	// On attend que toutes les images soient chargées avant de continuer, sinon le calcul automatique de la taille de la police optimale ne se fera pas correctement
	const images = root.querySelectorAll("img");
	const promises = Array.from(images).map((img) => {
		if (img.complete) {
			return Promise.resolve();
		} else {
			return new Promise((resolve) => {
				img.onload = () => resolve();
				img.onerror = () => resolve(); // On résout même en cas d'erreur pour ne pas bloquer le processus
			});
		}
	});
	return Promise.all(promises);
}

async function renderAndFit(html, { useLatex = false } = {}) {
	const contentHTML = useLatex ? convertLatexExpressions(html) : html;
	contentElement.innerHTML = contentHTML;
	await waitForImagesToLoad(contentElement);
	if (document.fonts && document.fonts.ready) {
		await document.fonts.ready;
	}
	await waitForRenderedFrame();
	await fitElements();
}

function handleMathsAndThemes(cardsHTML, options) {
	const forceRefresh = options && options.forceRefresh;
	if (forceRefresh) {
		isFirstPageLoad = true;
	}
	if (yaml && yaml.maths) {
		loadScript(
			"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
			"katex",
		).then(() => {
			const interval = setInterval(() => {
				if (window.katex) {
					clearInterval(interval);
					(async () => {
						await renderAndFit(cardsHTML, { useLatex: true });
						if (isFirstPageLoad) {
							isFirstPageLoad = false;
							await renderAndFit(cardsHTML, { useLatex: true });
						}
						fitMathElements();
					})();
				}
			}, 100);
		});
	} else {
		(async () => {
			await renderAndFit(cardsHTML, { useLatex: false });
			if (isFirstPageLoad) {
				isFirstPageLoad = false;
				await renderAndFit(cardsHTML, { useLatex: false });
			}
		})();
	}
}

export function createCards(cardsArray, options) {
	let cardsHTML = "";
	let cardNumber = 1;
	cardsArray.forEach((card) => {
		const footer =
			card.footer == ""
				? ""
				: `<footer class="z5">${markdownToHTML(card.footer, true)}</footer>`;
		const contentUp = card.contentUp.startsWith("![")
			? markdownToHTML(card.contentUp, true)
			: markdownToHTML(card.contentUp);
		const title =
			card.title.includes("<br") && card.title.includes("<aside")
				? markdownToHTML(
						card.title.replace(
							"<aside",
							'<aside style="float:none; position:absolute; width:200px; margin-top:-30px"',
						),
						true,
					)
				: markdownToHTML(card.title, true);
		const backContentHTML = markdownToHTML(
			card.backContent.replaceAll("<aside", "<aside markdown"),
		);
		if (card.beforeTitle.length > 0) {
			const matchBackgroundColor = card.beforeTitle.match(/fond: (\S*)/);
			if (matchBackgroundColor && matchBackgroundColor[1]) {
				card.backImageAlt = matchBackgroundColor[1];
			}
		}
		const color = card.backImageAlt
			.split(" ")
			.filter((word) => colorWords.includes(word) || isValidColorNameCSS(word))
			.join(" ");
		let backgroundColorCSS = "";
		if (!colorWords.includes(color) && isValidColorNameCSS(color)) {
			backgroundColorCSS = ` style="background: ${color}"`;
		}
		const cardBack =
			card.backImageURL.length > 0
				? `<section class="card cardBack"${backgroundColorCSS}><img class="cardBackImage" alt="${card.backImageAlt}" src="${card.backImageURL}" />${backContentHTML}</section>`
				: `<section class="card cardBack"${backgroundColorCSS} alt="${card.backImageAlt}"><div class="cardBackImage"></div>${backContentHTML}</section>`;

		// Gestion du nombre de zones pour la carte
		let classZcount = "";
		// Si on utilise le paramètre nombreZones dans le YAML : on utilise ce nombre
		if (
			yaml &&
			yaml.nombreZones &&
			yaml.nombreZones >= 1 &&
			yaml.nombreZones <= 3
		) {
			classZcount = ` zCount${yaml.nombreZones}`;
		}
		// Sinon on utilise un paramètre pour une carte spécifique : on utilise ce nombre
		if (card.beforeTitle.length > 0) {
			const match = card.beforeTitle.match(/nombreZones: (\d)/);
			if (match && match[1] >= 1 && match[1] <= 3) {
				classZcount = ` zCount${match[1]}`;
			}
		}

		let classIfAdditionalContent = "";
		if (
			options &&
			options.isFlashMd &&
			(card.subtitle.length > 0 || footer.length > 0)
		) {
			const classIfAdditionalSpaceTop =
				card.subtitle.length > 0 ? " hasAdditionnalContentTop" : "";
			const classIfAdditionalSpaceBottom =
				footer.length > 0 ? " hasAdditionnalContentBottom" : "";
			classIfAdditionalContent =
				classIfAdditionalSpaceTop + classIfAdditionalSpaceBottom;
		}

		// TEMPLATE pour chaque carte
		cardsHTML =
			cardsHTML +
			`
		<div class="cardBackAndFront${color.length > 0 ? " " + color : ""}${classZcount}" id="card-${cardNumber}">
			<section class="card cardFront"${backgroundColorCSS}>
				<h2 class="cardTitle z1${classIfAdditionalContent}"><span>${title}</span></h2>
				<div class="cardContentUp z2">${contentUp}</div>
				<h3 class="cardSubtitle z3">${markdownToHTML(card.subtitle, true)}</h3>
				<div class="cardContentDown z4">${markdownToHTML(card.contentDown)}</div>
				${footer}
			</section>
			${cardBack}
		</div>
		`;
		cardNumber++;
	});

	if (yaml && (yaml.maths || yaml.theme)) {
		handleMathsAndThemes(cardsHTML, options);
	} else {
		(async () => {
			await renderAndFit(cardsHTML, { useLatex: false });
		})();
	}
	// Gestion des add-ons
	if (yaml && yaml.addOns && yaml.addOns.includes("kroki")) {
		setTimeout(() => {
			contentElement.innerHTML = window.processKroki(contentElement.innerHTML);
		}, 200);
	}
}
