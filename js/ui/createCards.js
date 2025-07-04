import { markdownToHTML } from "../processMarkdown/markdownToHTML";
import { colorWords } from "../config";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { fitElements, fitMathElements } from "./fitElements";
import { loadScript } from "../utils/urls";
import { isValidColorNameCSS } from "../utils/css";

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
					fitElements().then(() => {
						if (isFirstPageLoad) {
							isFirstPageLoad = false;
							setTimeout(() => {
								contentElement.innerHTML = convertLatexExpressions(cardsHTML);
								fitElements().then(() => {
									fitMathElements();
								});
							}, 10);
						}
					});
				}
			}, 100);
		});
	} else {
		contentElement.innerHTML = cardsHTML;
		fitElements().then(() => {
			if (isFirstPageLoad) {
				isFirstPageLoad = false;
				setTimeout(() => {
					contentElement.innerHTML = cardsHTML;
					fitElements();
				}, 100);
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
