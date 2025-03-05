export function isValidColorNameCSS(string) {
	const s = new Option().style;
	s.color = string;
	return s.color !== "";
}

// ajoute un scope devant chaque règle CSS définie dans la variable styles
export function scopedStyles(styles, scope) {
	let scopedStyles = styles.replace(/([^{}]+)\s*\{/g, (match, selectors) => {
		let scopedSelectors = selectors
			.split(",")
			.map((selector) => `${scope} ${selector.trim()}`)
			.join(", ");
		return `${scopedSelectors} {`;
	});
	return scopedStyles;
}
