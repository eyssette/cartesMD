import { markdownToHTML } from "../processMarkdown/markdownToHTML";
import { colorWords } from "../config";
import { yaml } from "../processMarkdown/yaml";
import { convertLatexExpressions } from "../processMarkdown/convertLatex";
import { fitElements, fitMathElements } from "./fitElements";
import { loadScript } from "../utils/urls";

const contentElement = document.getElementById("content");
let isFirstPageLoad = true;

function handleMathsAndThemes(cardsHTML) {
	if (yaml.maths) {
		loadScript(
			"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
			"katex",
		).then(() => {
			setTimeout(() => {
				contentElement.innerHTML = convertLatexExpressions(cardsHTML);
				fitElements();
				fitMathElements();
			}, 100);
		});
		if (isFirstPageLoad) {
			setTimeout(() => {
				contentElement.innerHTML = convertLatexExpressions(cardsHTML);
				fitElements();
				fitMathElements();
			}, 3000);
			isFirstPageLoad = false;
		}
	} else {
		setTimeout(() => {
			contentElement.innerHTML = cardsHTML;
			fitElements();
		}, 100);
		if (isFirstPageLoad) {
			setTimeout(() => {
				contentElement.innerHTML = cardsHTML;
				fitElements();
			}, 3000);
			isFirstPageLoad = false;
		}
	}
}

export function createCards(cardsArray) {
	let cardsHTML = "";
	let cardNumber = 1;
	cardsArray.forEach((card) => {
		const footer =
			card.footer == ""
				? ""
				: `<footer>${markdownToHTML(card.footer, true)}</footer>`;
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
		const cardBack =
			card.backImageURL.length > 0
				? `<section class="card cardBack"><img class="cardBackImage" alt="${card.backImageAlt}" src="${card.backImageURL}" /></section>`
				: `<section class="card cardBack" alt="${card.backImageAlt}"><div class="cardBackImage"></div></section>`;
		const color = card.backImageAlt
			.split(" ")
			.filter((word) => colorWords.includes(word))
			.join(" ");

		// TEMPLATE pour chaque carte
		cardsHTML =
			cardsHTML +
			`
		<div class="cardBackAndFront${color.length > 0 ? " " + color : ""}" id="card-${cardNumber}">
			<section class="card cardFront">
				<h2 class="cardTitle"><span>${title}</span></h2>
				<div class="cardContentUp">${contentUp}</div>
				<h3 class="cardSubtitle">${markdownToHTML(card.subtitle, true)}</h3>
				<div class="cardContentDown">${markdownToHTML(card.contentDown)}</div>
				${footer}
			</section>
			${cardBack}
		</div>
		`;
		cardNumber++;
	});

	if (yaml.maths || yaml.theme) {
		handleMathsAndThemes(cardsHTML);
	} else {
		contentElement.innerHTML = cardsHTML;
		fitElements();
	}
	// Gestion des add-ons
	if (yaml.addOns && yaml.addOns.includes("kroki")) {
		setTimeout(() => {
			contentElement.innerHTML = window.processKroki(contentElement.innerHTML);
		}, 200);
	}
}
