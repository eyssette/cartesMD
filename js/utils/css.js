export function isValidColorNameCSS(string) {
	const s = new Option().style;
	s.color = string;
	return s.color !== "";
}

// ajoute un scope devant chaque règle CSS définie dans la variable styles
// sauf pour certaines règles spéciales (media queries, keyframes …)
const noScopePatterns = ["@media", "@keyframes", "from", "to", "font-face"];
export function scopedStyles(styles, scope) {
	let scopedStyles = styles.replace(/([^{}]+)\s*\{/g, (match, selectors) => {
		let scopedSelectors = selectors
			.split(",")
			.map((selector) => {
				if (noScopePatterns.some((pattern) => selector.includes(pattern))) {
					return selector.trim();
				} else {
					return `${scope} ${selector.trim()}`;
				}
			})
			.join(", ");
		return `${scopedSelectors} {`;
	});
	return scopedStyles;
}
