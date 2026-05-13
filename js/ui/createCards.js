import { markdownToHTML } from "../processMarkdown/markdownToHTML";
import { colorWords } from "../config";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import {
	fitElements,
	fitElementsWhenReady,
	fitMathElements,
} from "./fitElements";
import { loadScript } from "../utils/urls";
import { isValidColorNameCSS } from "../utils/css";
import { getCSScolor } from "../utils/colors";

const contentElement = document.getElementById("content");
let isFirstPageLoad = true;

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
					contentElement.innerHTML = convertLatexExpressions(cardsHTML);
					fitElementsWhenReady().then(() => {
						fitMathElements();
						if (isFirstPageLoad) {
							isFirstPageLoad = false;
							fitElementsWhenReady().then(() => {
								fitMathElements();
							});
						}
					});
				}
			}, 100);
		});
	} else {
		contentElement.innerHTML = cardsHTML;
		fitElementsWhenReady().then(() => {
			if (isFirstPageLoad) {
				isFirstPageLoad = false;
				fitElementsWhenReady();
			}
		});
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
		let color = card.backImageAlt
			.split(" ")
			.filter((word) => colorWords.includes(word) || isValidColorNameCSS(word))
			.join(" ");
		if (card.beforeTitle.length > 0) {
			const matchBackgroundColor = card.beforeTitle.match(/fond: (\S*)/);
			if (matchBackgroundColor && matchBackgroundColor[1]) {
				card.backImageAlt = matchBackgroundColor[1];
				color = matchBackgroundColor[1];
			}
		}
		let backgroundColorCSS = "";
		color = getCSScolor(color).toLowerCase();
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
		// On peut aussi utiliser le paramètre "zones"
		if (yaml && yaml.zones) {
			yaml.nombreZones = yaml.zones;
		}
		if (
			yaml &&
			yaml.nombreZones &&
			yaml.nombreZones >= 1 &&
			yaml.nombreZones <= 4
		) {
			classZcount = ` zCount${yaml.nombreZones}`;
		}
		// Si on utilise un paramètre pour une carte spécifique : on utilise ce nombre
		if (card.beforeTitle.length > 0) {
			const match =
				card.beforeTitle.match(/nombreZones: (\d)/) ||
				card.beforeTitle.match(/zones: (\d)/);
			if (match && match[1] >= 1 && match[1] <= 4) {
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

		const isStringColorName =
			color &&
			color.length > 0 &&
			!color.includes("(") &&
			color.charAt(0) !== "#";
		const colorCSSname = isStringColorName ? color : "";

		// TEMPLATE pour chaque carte
		cardsHTML =
			cardsHTML +
			`
		<div class="cardBackAndFront ${colorCSSname}${classZcount}" id="card-${cardNumber}">
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
		contentElement.innerHTML = cardsHTML;
		fitElements();
	}
	// Gestion des add-ons
	if (yaml && yaml.addOns && yaml.addOns.includes("kroki")) {
		setTimeout(() => {
			contentElement.innerHTML = window.processKroki(contentElement.innerHTML);
		}, 200);
	}
}
