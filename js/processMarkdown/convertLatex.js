function convertSpecialExpressionsInLatex(math) {
	return math
		.replaceAll("&lt;", "\\lt")
		.replaceAll("&gt;", "\\gt")
		.replaceAll("align<em>", "align*")
		.replaceAll("align</em>", "align*")
		.replaceAll("<em>", "_")
		.replaceAll("</em>", "_")
		.replaceAll("&amp;", "&")
		.replace(/€/g, "\\textrm{€}")
		.replace(/\\?%/g, "\\%")
		.replaceAll(" ", "\\ ");
}

export function convertLatexExpressions(string) {
	string = string
		.replace(/\$\$(.*?)\$\$/g, "&#92;[$1&#92;]")
		.replace(/\$(.*?)\$/g, "&#92;($1&#92;)");

	const expressionsLatex = string.match(/&#92;\[.*?&#92;\]|&#92;\(.*?&#92;\)/g);

	if (expressionsLatex) {
		for (let expressionLatex of expressionsLatex) {
			const inlineMaths = expressionLatex.startsWith("&#92;(");
			let math = expressionLatex.replace(
				/^&#92;\[|&#92;\]$|^&#92;\(|&#92;\)$/g,
				"",
			);

			// Applique les remplacements spécifiques
			math = convertSpecialExpressionsInLatex(math);

			try {
				const rendered = window.katex.renderToString(math, {
					displayMode: !inlineMaths,
				});
				string = string.replace(expressionLatex, rendered);
			} catch (error) {
				if (error instanceof window.katex.ParseError) {
					const rendered = `Error in LaTeX '${math}': ${error.message}`
						.replace(/&/g, "&")
						.replace(/</g, "<")
						.replace(/>/g, ">");
					string = string.replace(expressionLatex, rendered);
				} else {
					throw error;
				}
			}
		}
	}

	return string;
}
