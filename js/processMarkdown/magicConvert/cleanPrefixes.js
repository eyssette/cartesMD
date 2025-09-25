// Nettoyer les préfixes d'une ligne
export function cleanPrefixes(line, prefixes) {
	for (const prefix of prefixes) {
		if (line.startsWith(prefix)) {
			return line.slice(prefix.length).trim();
		}
	}
	return line;
}
