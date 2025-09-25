// Détecter si le format alterne ligne par ligne
export function detectAlternatingFormat(lines, separators) {
	if (lines.length < 4) return false; // Pas assez de lignes pour détecter le pattern

	let linesWithSep = 0;
	let linesWithoutSep = 0;

	for (let i = 0; i < Math.min(lines.length, 10); i++) {
		// Examiner les 10 premières lignes max
		const hasSeparator = separators.some((sep) => lines[i].includes(sep));
		if (i % 2 === 0) {
			// Lignes paires (supposées être les rectos)
			if (hasSeparator) linesWithSep++;
		} else {
			// Lignes impaires (supposées être les versos)
			if (!hasSeparator) linesWithoutSep++;
		}
	}
	const testedPairs = Math.floor(Math.min(lines.length, 10) / 2);
	// Au moins 70% des paires suivent le pattern
	return (
		linesWithSep >= 1 &&
		linesWithoutSep >= 1 &&
		linesWithSep + linesWithoutSep >= testedPairs * 1.4
	);
}
