// Fonction de validation du contenu
export function validateFlashcardsFormat(content) {
	if (!content || typeof content !== "string") {
		return false;
	}

	// Extraire les blocs "## titre + contenu"
	const blocks = content.match(/(## .+?)(?=(?:\n## |\n*$))/gs);
	if (!blocks || blocks.length === 0) {
		return false;
	}

	for (let index = 0; index < blocks.length; index++) {
		const block = blocks[index];

		const lines = block
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		if (lines.length === 0) {
			return false;
		}

		// Vérifier que la première ligne commence par "## "
		const firstLine = lines[0];
		if (!firstLine.startsWith("## ")) {
			return false;
		}

		// Vérifier que le titre n'est pas vide après "## "
		const title = firstLine.substring(3).trim();
		if (title.length === 0) {
			return false;
		}

		// Si le titre est très long, alors c'est que la conversion magique n'était probablement pas approprié
		if (title.length > 100) {
			return false;
		}

		// Vérifier qu'il y a du contenu après le titre
		if (lines.length === 1) {
			return false;
		} else {
			// Si il y a plusieurs lignes, vérifier que les lignes suivantes ne sont pas toutes vides
			const contentLines = lines.slice(1);
			const hasNonEmptyContent = contentLines.some(
				(line) => line.trim().length > 0,
			);

			if (!hasNonEmptyContent) {
				return false;
			}
		}
	}
	return true;
}
