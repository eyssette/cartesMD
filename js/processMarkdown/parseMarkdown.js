import { loadCSS } from "../utils/urls";
import { processYAML } from "./yaml";

function splitMarkdownIgnoringCodeBlocks(markdownContent) {
	// Expression régulière pour diviser en fonction de `---` uniquement en dehors des blocs de code.
	const regex = /(?:^|\n)---(?!.*```)/;

	// On recherche et remplace temporairement les blocs de code avec un token pour les restaurer après
	const codeBlockRegex = /```[\s\S]*?```/g;
	let codeBlocks = [];
	markdownContent = markdownContent.replace(codeBlockRegex, (match) => {
		codeBlocks.push(match);
		return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
	});

	// On split le markdown en fonction des séparateurs "---" en dehors des blocs de code
	let parts = markdownContent.split(regex);

	// On restaure les blocs de code
	parts = parts.map((part) =>
		part.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => codeBlocks[index]),
	);

	return parts;
}

export function parseMarkdown(markdownContent) {
	// Chargement des fichiers CSS nécessaires si besoin
	if (markdownContent.includes(":::")) {
		loadCSS("css/admonitions.min.css", "admonitions");
	}
	loadCSS("css/backImageColors.min.css", "backImageColors");
	// On permet l'interprétation du Markdown à l'intérieur des balises div
	markdownContent = markdownContent.replaceAll(
		/<div.*?>/g,
		'<div markdown="1">',
	);
	// On supprime le titre de niveau 1 (qui n'a pas d'équivalent dans les cartes elles-mêmes)
	markdownContent = markdownContent.replace(/^# (.*)/, "");

	let markdownContentSplitted =
		splitMarkdownIgnoringCodeBlocks(markdownContent);
	markdownContentSplitted = processYAML(
		markdownContent,
		markdownContentSplitted,
	);
	const markdownCards = markdownContentSplitted;
	let cardsArray = [];

	markdownCards.forEach((markdownCard) => {
		let cardObject = {};
		// On doit récupérer le footer avant pour pouvoir le supprimer du contenu s'il n'y a pas de titre h3
		const footerMatch = markdownCard.match(/#### (.*)/);
		// Ajout du titre
		const titleMatch = markdownCard.match(/## (.*)/);
		const titleIndex = markdownCard.indexOf("## ");
		cardObject.title = titleMatch ? titleMatch[1].trim() : "";
		// Gestion des informations avant le titre (paramètres pour la carte)
		const beforeTitleContent = markdownCard.substring(0, titleIndex);
		cardObject.beforeTitle = beforeTitleContent;
		// Gestion des informations entre le titre et le sous-titre
		const titleMatchLength = titleMatch ? titleMatch[0].length : 0;
		const AfterTitleIndex = titleIndex + titleMatchLength;
		const subTitleIndex = markdownCard.indexOf("\n### ");
		const cardObjectFrontString =
			AfterTitleIndex > 0 && subTitleIndex > 0
				? markdownCard.substring(AfterTitleIndex, subTitleIndex).trim()
				: footerMatch
					? markdownCard.substring(AfterTitleIndex).replace(footerMatch[0], "")
					: markdownCard.substring(AfterTitleIndex);
		// Ajout de l'image de fond
		const backImageMatch = markdownCard.match(/- !\[(.*?)\]\((.*)\)/);
		const backImage = backImageMatch ? backImageMatch[2] : "";
		const backImageAlt = backImageMatch ? backImageMatch[1] : "";
		cardObject.backImageURL = backImage;
		cardObject.backImageAlt = backImageAlt;
		// Ajout du contenu du dessus
		let contentUp = backImageMatch
			? cardObjectFrontString.replace(backImageMatch[0], "").trim()
			: cardObjectFrontString;
		// Ajout du contenu de dos de carte présent dans la balise aside du contenu du dessus
		const backContentInContentUpIndex = contentUp.indexOf("\n<aside>");
		const backContentInContentUpEndIndex = contentUp.indexOf("</aside>");
		const backContentInContentUpString =
			backContentInContentUpIndex > 0
				? contentUp
						.substring(
							backContentInContentUpIndex,
							backContentInContentUpEndIndex,
						)
						.trim()
				: "";
		// On supprime le dos de carte dans le contenu du dessus
		cardObject.contentUp = contentUp.replace(backContentInContentUpString, "");
		// Ajout du sous-titre
		const subtitleMatch = markdownCard.match(/\n### (.*)/);
		const subtitleLength = subtitleMatch ? subtitleMatch[0].length : 0;
		cardObject.subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";
		// Ajout du contenu du dessous
		const subtitleIndex = markdownCard.indexOf("\n### ");
		const afterSubtitleIndex = subtitleIndex + subtitleLength;
		let contentDownString =
			afterSubtitleIndex > 0
				? markdownCard.substring(afterSubtitleIndex).trim()
				: "";
		// Ajout du contenu de dos de carte présent dans la balise aside du contenu du dessous
		const backContentInContentDownIndex =
			contentDownString.indexOf("\n<aside>");
		const backContentInContentDownEndIndex =
			contentDownString.indexOf("</aside>");
		const backContentInContentDownString =
			backContentInContentDownIndex > 0
				? contentDownString
						.substring(
							backContentInContentDownIndex,
							backContentInContentDownEndIndex,
						)
						.trim()
				: "";
		// On supprime le dos de carte dans le contenu du dessous
		contentDownString = contentDownString.replace(
			backContentInContentDownString,
			"",
		);
		// Constitution du dos de carte à partir des balises aside dans le contenu du dessus et le contenu du dessous
		let backContentString =
			backContentInContentUpString + "\n\n" + backContentInContentDownString;
		backContentString = backContentString.replace(/<(\/)?aside>/g, "").trim();
		backContentString = backContentString
			? `<aside>${backContentString}</aside>`
			: "";
		cardObject.backContent = backContentString;
		// Ajout éventuel du footer
		const footer = footerMatch ? footerMatch[1].trim() : "";
		cardObject.footer = footer;
		const contentDown = footerMatch
			? contentDownString.replace(footerMatch[0], "").trim()
			: contentDownString;
		cardObject.contentDown = contentDown;
		cardsArray.push(cardObject);
	});
	return cardsArray;
}
