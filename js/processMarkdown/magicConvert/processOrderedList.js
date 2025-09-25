import { validateFlashcardsFormat } from "./validateFlashcardsFormat";

export function tryToConvertToOrderedList(text) {
	// On essaie de chercher une liste ordonnée dans le texte
	const attemptToConvertToOrderedList = processOrderedList(text);
	// Si c'est le cas et que la liste formatée correspond au format attendu, alors on renvoie la liste formatée, sinon on renvoie le texte initial
	const isValidOrderedList = validateFlashcardsFormat(
		attemptToConvertToOrderedList,
	);
	return {
		valid: isValidOrderedList,
		result: isValidOrderedList ? attemptToConvertToOrderedList : text,
	};
}

function processOrderedList(text) {
	text = text.replace(/^#+ /gm, "");
	const lines = text.split("\n");
	const listItemRegex = /^(\d+)([.)/])\s+(.*)$/;

	// Trouve tous les indices des lignes qui correspondent à des éléments de liste ordonnée qui se suivent
	const listItemIndices = [];
	let count = 1;
	lines.forEach((line, index) => {
		const match = line.match(listItemRegex);

		if (match) {
			const number = parseInt(match[1], 10);
			if (count == number) {
				listItemIndices.push({
					index,
					number,
					text: match[3],
					originalLine: line,
				});
				count++;
			}
		}
	});

	if (listItemIndices.length === 0) {
		return text; // Pas de liste trouvée
	}
	if (listItemIndices.length < 3) {
		// En dessous de trois éléments, on n'utilise pas la conversation “magique”
		return text;
	}

	return convertSequence(text);
}

function convertSequence(text) {
	// Remplace chaque ligne commençant par un numéro + point + espace
	return text.replace(/^\d+[.)/]\s+(.*)$/gm, (match, title) => {
		return `## ${title}`;
	});
}
