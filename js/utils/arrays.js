// Divise un tableau en sous-tableaux (groupes)
export function splitArrayIntoGroups(arr, numGroups) {
	// On calcule combien d’éléments doit contenir chaque groupe au maximum.
	// Math.ceil() arrondit vers le haut pour éviter de "perdre" des éléments.
	const perGroup = Math.ceil(arr.length / numGroups);
	// On crée un nouveau tableau de longueur "numGroups"
	// Chaque case est initialisée avec une valeur vide (peu importe la valeur)
	return (
		new Array(numGroups)
			.fill("")
			// On remplit chaque case avec un sous-tableau issu de "arr"
			// Chaque sous-tableau contient "perGroup" éléments au maximum.
			.map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup))
	);
}
