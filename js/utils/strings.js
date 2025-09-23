// Supprime les commentaires HTML multilignes
export function removeMultilineHtmlComments(text) {
	// On recherche les commentaires HTML
	return text.replace(/<!--[\s\S]*?-->/g, (match) => {
		// Si le commentaire contient un saut de ligne, on le supprime
		if (/\r?\n|\r/.test(match)) {
			return "";
		}
		// Sinon on le garde
		return match;
	});
}
