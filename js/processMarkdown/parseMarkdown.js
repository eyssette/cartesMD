import { processYAML } from "./yaml";

export function parseMarkdown(markdownContent) {
	// On permet l'interprétation du Markdown à l'intérieur des balises div
	markdownContent = markdownContent.replaceAll(
		/<div.*?>/g,
		'<div markdown="1">',
	);
	// On supprime le titre de niveau 1 (qui n'a pas d'équivalent dans les cartes elles-mêmes)
	markdownContent = markdownContent.replace(/^# (.*)/, "");

	let markdownContentSplitted = markdownContent.split("---");
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
		cardObject.title = titleMatch ? titleMatch[1].trim() : "";
		// Gestion des informations entre le titre et le sous-titre
		const titleMatchLength = titleMatch ? titleMatch[0].length : 0;
		const AfterTitleIndex = markdownCard.indexOf("## ") + titleMatchLength;
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
		const contentUp = backImageMatch
			? cardObjectFrontString.replace(backImageMatch[0], "").trim()
			: cardObjectFrontString;
		cardObject.contentUp = contentUp;
		// Ajout du sous-titre
		const subtitleMatch = markdownCard.match(/\n### (.*)/);
		const subtitleLength = subtitleMatch ? subtitleMatch[0].length : 0;
		cardObject.subtitle = subtitleMatch ? subtitleMatch[1].trim() : "";
		// Ajout du contenu du dessous
		const subtitleIndex = markdownCard.indexOf("\n### ");
		const afterSubtitleIndex = subtitleIndex + subtitleLength;
		const contentDownString =
			afterSubtitleIndex > 0
				? markdownCard.substring(afterSubtitleIndex).trim()
				: "";
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
