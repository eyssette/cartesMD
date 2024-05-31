function loadScript(src) {
	// Fonction pour charger des scripts
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}
function loadCSS(src) {
	// Fonction pour charger des CSS
	return new Promise((resolve, reject) => {
		const styleElement = document.createElement("link");
		styleElement.href = src;
		styleElement.rel = "stylesheet";
		styleElement.onload = resolve;
		styleElement.onerror = reject;
		document.head.appendChild(styleElement);
	});
}

function convertLatexExpressions(string) {
	string = string
		.replace(/\$\$(.*?)\$\$/g, "&#92;[$1&#92;]")
		.replace(/\$(.*?)\$/g, "&#92;($1&#92;)");
	let expressionsLatex = string.match(
		new RegExp(/&#92;\[.*?&#92;\]|&#92;\(.*?&#92;\)/g)
	);
	if (expressionsLatex) {
		// On n'utilise Katex que s'il y a des expressions en Latex dans le Markdown
		for (let expressionLatex of expressionsLatex) {
			// On vérifie si le mode d'affichage de l'expression (inline ou block)
			const inlineMaths = expressionLatex.includes("&#92;[") ? true : false;
			// On récupère la formule mathématique
			let mathInExpressionLatex = expressionLatex
				.replace("&#92;[", "")
				.replace("&#92;]", "");
			mathInExpressionLatex = mathInExpressionLatex
				.replace("&#92;(", "")
				.replace("&#92;)", "");
			// On convertit la formule mathématique en HTML avec Katex
			stringWithLatex = katex.renderToString(mathInExpressionLatex, {
				displayMode: inlineMaths,
			});
			string = string.replace(expressionLatex, stringWithLatex);
		}
	}
	return string;
}

let yamlMaths;

function parseMarkdown(string) {
	let cardsArray = [];
	string = string.replace(/# (.*)/,'')
	stringSplit = string.split('---');
	if(string.startsWith('---') && stringSplit.length > 2) {
		try {
			yamlData = jsyaml.load(stringSplit[1]);
			for (const property in yamlData) {
				if (property == "maths") {
					yamlMaths = yamlData[property];
					if (yamlMaths === true) {
						Promise.all([
							loadScript(
								"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"
							),
							loadCSS(
								"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
							),
						]);
					}
				}
				// Gestion des styles personnalisés
				if (property == "style") {
					yamlStyle = yamlData[property];
					const styleElement = document.createElement("style");
					styleElement.innerHTML = yamlStyle.replaceAll("\\","");
					document.body.appendChild(styleElement);
				}
			}
		} catch (e) {}
		stringSplit.shift();
		stringSplit.shift();
	}


	stringSplit.forEach(stringCard => {
		stringCard = yamlMaths ? convertLatexExpressions(stringCard) : stringCard;
		let cardObject = {}
		// On doit récupérer le footer avant pour pouvoir le supprimer du contenu s'il n'y a pas de titre h3
		const footerMatch = stringCard.match(/#### (.*)/);
		// Ajout du titre
		const titleMatch = stringCard.match(/## (.*)/);
		cardObject.title = titleMatch ? titleMatch[1].trim() : '';
		// Gestion des informations entre le titre et le sous-titre
		const titleMatchLength = titleMatch ? titleMatch[0].length : 0;
		const AfterTitleIndex = stringCard.indexOf('## ') + titleMatchLength
		const subTitleIndex = stringCard.indexOf('\n### ')
		const cardObjectFrontString = (AfterTitleIndex > 0 && subTitleIndex > 0) ? stringCard.substring(AfterTitleIndex, subTitleIndex).trim() : (footerMatch ? stringCard.substring(AfterTitleIndex).replace(footerMatch[0],'') : stringCard.substring(AfterTitleIndex));
		// Ajout de l'image de fond
		const backImageMatch = stringCard.match(/- !\[(.*?)\]\((.*)\)/);
		const backImage = backImageMatch ? backImageMatch[2] : '';
		const backImageAlt = backImageMatch ? backImageMatch[1] : '';
		cardObject.backImageURL = backImage;
		cardObject.backImageAlt = backImageAlt;
		// Ajout du contenu du dessus
		const contentUp = backImageMatch ? cardObjectFrontString.replace(backImageMatch[0],'').trim() : cardObjectFrontString;
		cardObject.contentUp = contentUp
		// Ajout du sous-titre
		const subtitleMatch = stringCard.match(/\n### (.*)/);
		const subtitleLength = subtitleMatch ? subtitleMatch[0].length : 0;
		cardObject.subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';
		// Ajout du contenu du dessous
		const subtitleIndex = stringCard.indexOf('\n### ');
		const afterSubtitleIndex = subtitleIndex + subtitleLength
		const contentDownString = afterSubtitleIndex > 0 ?stringCard.substring(afterSubtitleIndex).trim() : '';
		// Ajout éventuel du footer
		const footer = footerMatch ? footerMatch[1].trim() : '';
		cardObject.footer = footer;
		const contentDown = footerMatch ? contentDownString.replace(footerMatch[0],'').trim() : contentDownString;
		cardObject.contentDown = contentDown;
		cardsArray.push(cardObject);
	});
	return cardsArray;
}

const contentElement = document.getElementById('content')

// Extensions pour Showdown

	// Gestion des admonitions
	function showdownExtensionAdmonitions() {
		return [
			{
				type: "output",
				filter: (text) => {
					text = text.replaceAll("<p>:::", ":::");
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
							if (!isInCode) {
								let type = matchInformations[1];
								let title = matchInformations[2];
								if(type.includes('<br')) {
									type = type.replace('<br','')
									title = '';
								}
								const content = matchInformations[3];
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
		type: 'lang',
		regex: /\+\+(.*?)\+\+/g,
		replace: '<u>$1</u>'
	};
	const showdownExtensionHighlight = {
		type: 'lang',
		regex: /\=\=(.*?)\=\=/g,
		replace: '<mark>$1</mark>'
	};

	// Gestion du markdown dans les réponses du chatbot
	const converter = new showdown.Converter({
		emoji: true,
		parseImgDimensions: true,
		simpleLineBreaks: true,
		simplifiedAutoLink: true,
		tables: true,
		openLinksInNewWindow: true,
		extensions: [showdownExtensionAdmonitions,showdownExtensionUnderline,showdownExtensionHighlight],
	});
	function markdownToHTML(text, inline= false) {
		let html = converter.makeHtml(text);
		if(inline) {
			html = html.replace('<p>','').replace('</p>','').trim();
		}
		return html;
	}

function createCards(cardsArray) {
	
	cardsHTML = '';
	cardsArray.forEach(card => {
		const footer = card.footer == '' ? ''  : `<footer>${markdownToHTML(card.footer, true)}</footer>`;
		const contentUp = (card.contentUp.startsWith('![')) ? markdownToHTML(card.contentUp, true) : markdownToHTML(card.contentUp);
		const title = (card.title.includes('<br') && card.title.includes('<aside')) ? markdownToHTML(card.title.replace('<aside', '<aside style="float:none; position:absolute; width:200px; margin-top:-30px"'),true) : markdownToHTML(card.title, true);

		cardsHTML = cardsHTML + `
		<div class="cardBackAndFront ${card.backImageAlt}">
			<section class="card cardFront">
				<h2 class="cardTitle"><span>${title}</span></h2>
				<div class="cardContentUp">${contentUp}</div>
				<h3 class="cardSubtitle">${markdownToHTML(card.subtitle, true)}</h3>
				<div class="cardContentDown">${markdownToHTML(card.contentDown)}</div>
				${footer}
			</section>
			<section class="card cardBack">
				<img class="cardBackImage" alt="${card.backImageAlt}" src="${card.backImageURL}" />
			</section>
		</div>
		`;
	});

	contentElement.innerHTML = cardsHTML;

	let imagesToReposition = document.querySelectorAll('img')
	for (const image of imagesToReposition) {
		image.style.cssText += image.alt;
	}
}