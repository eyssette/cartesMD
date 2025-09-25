import { splitArrayIntoGroups } from "../../utils/arrays.js";
import { detectAlternatingFormat } from "./detectAlternatingFormat.js";
import { cleanPrefixes } from "./cleanPrefixes.js";
import { validateFlashcardsFormat } from "./validateFlashcardsFormat.js";

export function magicConvertToFlashcardsFormat(text, options = {}) {
	// Définition des séparateurs et préfixes courants
	const config = {
		separators: [" = ", " - ", " - ", " – ", " -> ", ": ", "|", " : "],
		prefixes: ["-> ", "- ", "* ", "> ", "→"],
		rectoSyntax: "## ",
		...options,
	};

	if (!text || typeof text !== "string") return "";

	// Nettoie le texte et le divise en lignes
	const allLines = text
		.replace(/\r/g, "")
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	// Détecte le format : alternance ligne par ligne ou paragraphes
	const isAlternatingFormat = detectAlternatingFormat(
		allLines,
		config.separators,
	);

	let cards = [];

	if (isAlternatingFormat) {
		// Format alternant : ligne avec recto et séparateur, ligne suivante = verso sans séparateur
		for (let i = 0; i < allLines.length; i += 2) {
			const front = allLines[i];
			const back =
				i + 1 < allLines.length
					? cleanPrefixes(allLines[i + 1], config.prefixes)
					: "";
			cards.push({ front, back });
		}
	} else {
		// Format sans alternance
		const paragraphs = text
			.replace(/\r/g, "")
			.split(/(\n\s*)+/)
			.map((p) => p.trim())
			.filter((p) => p.length > 0);
		let isMultiLine = true;
		for (const paragraph of paragraphs) {
			const lines = paragraph.split("\n").map((line) => line.trim());
			if (lines.length === 1) {
				// Format "Une carte = une ligne" : on cherche un séparateur pour distinguer le recto et le verso dans la ligne
				const line = lines[0];
				let found = false;

				for (const sep of config.separators) {
					const index = line.indexOf(sep);
					if (index > 0 && index < line.length - sep.length) {
						const front = line.slice(0, index).trim();
						const back = line.slice(index + sep.length).trim();
						cards.push({ front, back });
						found = true;
						break;
					}
				}
				isMultiLine = found ? false : true;
			}
			if (isMultiLine) {
				break;
			}
		}
		if (isMultiLine) {
			// Format "Une carte = un paragraphe recto / un paragraphe verso"
			// Le format suppose qu'on ait un nombre pair de paragraphes
			if (paragraphs.length % 2 !== 0) {
				return text;
			}
			// On n'utilise pas la conversion “magique” s'il y a moins de 3 paires
			// S'il y a moins de 3 paires, il s'agit probablement juste de texte à simplement copier-coller dans l'éditeur
			const pairCount = paragraphs.length / 2;
			const MIN_PAIR_COUNT = 3;
			if (pairCount < MIN_PAIR_COUNT) {
				return text;
			}
			// On regroupe les paires recto/verso entre elles, et on crée les cartes à partir de là
			const cardsArray = splitArrayIntoGroups(paragraphs, pairCount);
			cards = cardsArray.map(([frontParagraph, backParagraph]) => ({
				front: frontParagraph.trim(),
				back: cleanPrefixes(backParagraph, config.prefixes).trim(),
			}));
		}
	}

	// Génére le markdown final
	if (!cards.length > 0) return text;
	const result = cards
		.map((card) => {
			const backPart = card.back ? "\n" + card.back : "";
			return config.rectoSyntax + card.front + backPart;
		})
		.join("\n\n");

	// On vérifie le résultat
	// S'il correspond au format attendu, on le renvoie
	// Sinon on renvoie le texte initial
	return validateFlashcardsFormat(result) ? result : text;
}
