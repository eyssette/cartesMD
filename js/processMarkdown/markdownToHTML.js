import Showdown from "../externals/showdown.js";
import { getCSScolor } from "../utils/colors.js";

// Extensions pour Showdown

// Gestion des attributs génériques du type {.classe1 .classe2}
function showdownExtensionGenericAttributes() {
	return [
		{
			type: "output",
			filter: (text) => {
				// Regex pour détecter les attributs génériques en fin de ligne dans un élément
				const genericAttributesRegexBlock = /<(\w+)(.*?)>(.*?) ({\.(.*?)})/g;

				const easyGenericAttributesRegexInline = /--(.*?):(.*?)--/g;
				let lastMatchPositionEasyGenericAttribute = 0;
				text = text.replace(
					easyGenericAttributesRegexInline,
					(match, attributeString, textWithAttribute) => {
						const isColor = getCSScolor(attributeString);
						const sectionText = text.substring(
							lastMatchPositionEasyGenericAttribute,
						);
						const matchPosition = sectionText.indexOf(match);
						lastMatchPositionEasyGenericAttribute =
							lastMatchPositionEasyGenericAttribute +
							matchPosition +
							match.length;
						const before = text.substring(0, matchPosition);
						const after = text.substring(lastMatchPositionEasyGenericAttribute);
						const isInCode = /<code>|<pre>/.test(
							before.slice(before.lastIndexOf("<")),
						);
						const isComment = after && after.startsWith(">");
						if (!isInCode & !isComment) {
							let replaceBy;
							const isTag = attributeString.startsWith("tag");
							if (!isTag) {
								replaceBy = isColor
									? `<span style="color:${isColor}">${textWithAttribute}</span>`
									: `<span class="${attributeString}">${textWithAttribute}</span>`;
							} else {
								const contentAfterTag = attributeString
									.replace("tag", "")
									.trim();
								const colourBackground = getCSScolor(contentAfterTag);
								if (colourBackground) {
									replaceBy = `<span class="tag" style="background-color:${colourBackground}">${textWithAttribute}</span>`;
								} else {
									replaceBy = `<span class="tag ${contentAfterTag}">${textWithAttribute}</span>`;
								}
							}
							return replaceBy;
						} else {
							return match;
						}
					},
				);

				// Regex pour détecter l'utilisation d'attributs génériques à l'intérieur d'un élément (un passage mis en gras, en italiques, ou tout autre balise)
				const genericAttributesRegexInline =
					/<(\w+)(.*?)>(.*?)<\/\1>{(\.[^{}]+)}/g;

				let modifiedText = text;

				// Traitement des attributs génériques en fin de ligne
				modifiedText = modifiedText.replace(
					genericAttributesRegexBlock,
					(match, tag, attrs, content, _, classes) => {
						// Vérifier si l'élément est dans un <code>
						if (match.includes("<code>")) return match;

						const classAttribute = ` class="${classes.replace(/\./g, " ").trim()}"`;
						return `<${tag}${attrs}${classAttribute}>${content}</${tag}>`;
					},
				);

				// Traitement des attributs génériques pour un élément inline
				modifiedText = modifiedText.replace(
					genericAttributesRegexInline,
					(match, tag, attrs, content, classes) => {
						const classAttribute = ` class="${classes.replace(/\./g, " ").trim()}"`;
						return `<${tag}${attrs}${classAttribute}>${content}</${tag}>`;
					},
				);

				return modifiedText;
			},
		},
	];
}

// Gestion des admonitions
function showdownExtensionAdmonitions() {
	return [
		{
			type: "output",
			filter: (text) => {
				text = text.replaceAll(/<p>:::(.*?)<\/p>/g, ":::$1");
				const regex = /:::(.*?)\n(.*?):::/gs;
				const matches = text.match(regex);
				if (matches) {
					let modifiedText = text;
					for (const match of matches) {
						const regex2 = /:::(.*?)\s(.*?)\n(.*?):::/s;
						const matchInformations = regex2.exec(match);
						const indexMatch = text.indexOf(match);
						// Pas de transformation de l'admonition en html si l'admonition est dans un bloc code
						const isInCode =
							text.substring(indexMatch - 6, indexMatch) == "<code>"
								? true
								: false;
						if (!isInCode && matchInformations) {
							let type = matchInformations[1];
							let title = matchInformations[2];
							if (type.includes("<br")) {
								type = type.replace("<br", "");
								title = "";
							}
							const content = matchInformations[3];
							let matchReplaced;
							if (title.includes("collapsible")) {
								title = title.replace("collapsible", "");
								matchReplaced = `<div><div class="admonition ${type}"><details><summary class="admonitionTitle">${title}</summary><div class="admonitionContent">${content}</div></details></div></div>`;
							} else {
								matchReplaced = `<div><div class="admonition ${type}"><div class="admonitionTitle">${title}</div><div class="admonitionContent">${content}</div></div></div>`;
							}
							modifiedText = modifiedText.replaceAll(match, matchReplaced);
						}
					}
					return modifiedText;
				} else {
					return text;
				}
			},
		},
	];
}

// Gestion des éléments soulignés et surlignés
const showdownExtensionUnderline = {
	type: "lang",
	regex: /\+\+(.*?)\+\+/g,
	replace: "<u>$1</u>",
};
const showdownExtensionHighlight = {
	type: "lang",
	regex: /==(.*?)==/g,
	replace: "<mark>$1</mark>",
};

// Gestion du markdown
const converter = new Showdown.Converter({
	emoji: true,
	parseImgDimensions: true,
	simpleLineBreaks: true,
	simplifiedAutoLink: true,
	tables: true,
	openLinksInNewWindow: true,
	tasklists: true,
	extensions: [
		showdownExtensionAdmonitions,
		showdownExtensionUnderline,
		showdownExtensionHighlight,
		showdownExtensionGenericAttributes,
	],
});

function fixImageDimensionsCodiMD(md) {
	md = md.replaceAll(/=x([0-9]*)\)/g, "=*x$1)");
	md = md.replaceAll(/=([0-9]*)x\)/g, "=$1x*)");
	return md;
}

export function markdownToHTML(text, inline = false) {
	text = fixImageDimensionsCodiMD(text);
	let html = converter.makeHtml(text);
	if (inline) {
		html = html.replace("<p>", "").replace("</p>", "").trim();
	}
	return html;
}
