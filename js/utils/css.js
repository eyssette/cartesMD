export function isValidColorNameCSS(string) {
	const s = new Option().style;
	s.color = string;
	return s.color !== "";
}
