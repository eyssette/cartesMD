function loadScript(src,name) {
	// Fonction pour charger des scripts
	alreadyLoaded = document.querySelector('.'+name)
	if(!alreadyLoaded) {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = src;
			script.className = name;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}
}
function loadCSS(src,name) {
	// Fonction pour charger des CSS
	alreadyLoaded = document.querySelector('.'+name)
	if(!alreadyLoaded) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement("link");
			styleElement.href = src;
			styleElement.className = name;
			styleElement.rel = "stylesheet";
			styleElement.onload = resolve;
			styleElement.onerror = reject;
			document.head.appendChild(styleElement);
		});
	}
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
	const styleTheme = document.getElementById('styleTheme');
	const styleCardElement = document.getElementById('styleCard');
	const styleZ1element = document.getElementById('styleZ1');
	const styleZ2element = document.getElementById('styleZ2');
	const styleZ3element = document.getElementById('styleZ3');
	const styleZ4element = document.getElementById('styleZ4');
	const styleBackElement = document.getElementById('styleBack');
	const styleBackImageElement = document.getElementById('styleBackImage');
	const styleOtherElement = document.getElementById('styleOther');

	// On permet l'interprétation du Markdown à l'intérieur des balises div
	string = string.replaceAll(/\<div.*?\>/g, '<div markdown="1">');

	// On vérifie que le nom du fichier correspond bien à l'un des thèmes CSS
	const themes = ['iaconelli.css','z2small.css','z2small-bluegradient-withlogo.css']

	let cardsArray = [];
	string = string.replace(/^# (.*)/,'')
	stringSplit = string.split('---');
	if(string.startsWith('---') && stringSplit.length > 2) {
		try {
			yamlData = jsyaml.load(stringSplit[1]);
			let theme = false;
			for (const property in yamlData) {
				if (property == "maths") {
					yamlMaths = yamlData[property];
					// On gère le chargement de la librairie pour gérer Latex dans editor.js
					Promise.all([
						loadScript(
							"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js","katexScript"
						),
						loadCSS(
							"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css","katexCSS"
						)
					])
				}
				// Gestion des styles personnalisés
				if (property == 'theme') {
					// Possibilité d'utiliser un thème pour les cartes
					const CSSfile  = yamlData[property]
					if(themes.includes(CSSfile)) {
						theme = true;
						let themeURL = "theme/"+CSSfile;
						themeURL = window.location.origin == "file://" ? 'https://cartesmd.forge.apps.education.fr/'+themeURL : themeURL;
						fetch(
								themeURL
							).then((response) => response.text())
							.then((data) => {
								styleTheme.textContent = data
							})
							.catch((error) => {
								styleTheme.textContent = '';
								console.error(error)}
							);
					} else {
						styleTheme.textContent = '';
					}
				}
				if (property == 'card') {
					styleCardElement.textContent = '.card{'+yamlData[property].replaceAll("\\","")+'}';
				}
				if (property == 'z1') {
					styleZ1element.textContent = 'h2{'+yamlData[property].replaceAll("\\","")+'}';
				}
				if (property == 'z2') {
					styleZ2element.textContent = '.cardContentUp{'+yamlData[property].replaceAll("\\","")+'}'
				}
				if (property == 'z3') {
					styleZ3element.textContent = 'h3{'+yamlData[property].replaceAll("\\","")+'}'
				}
				if (property == 'z4') {
					styleZ4element.textContent = '.cardContentDown{'+yamlData[property].replaceAll("\\","")+'}'
				}
				if (property == 'back') {
					styleBackElement.textContent = '.cardBack{' + yamlData[property].replaceAll("\\","") +'}';
				}
				if (property == 'backImage') {
					styleBackImageElement.textContent = '.cardBackImage{' + yamlData[property].replaceAll("\\","") +'}';
				}
				if (property == 'style') {
					styleOtherElement.textContent = yamlData[property].replaceAll("\\","");
				}
			}
			if(!theme) {
				styleTheme.textContent = '';
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
		const cardBack = card.backImageURL.length > 0 ?  `<section class="card cardBack"><img class="cardBackImage" alt="${card.backImageAlt}" src="${card.backImageURL}" /></section>` : `<section class="card cardBack" alt="${card.backImageAlt}"><div class="cardBackImage"></div></section>`;

		// TEMPLATE pour chaque carte
		cardsHTML = cardsHTML + `
		<div class="cardBackAndFront ${card.backImageAlt}">
			<section class="card cardFront">
				<h2 class="cardTitle"><span>${title}</span></h2>
				<div class="cardContentUp">${contentUp}</div>
				<h3 class="cardSubtitle">${markdownToHTML(card.subtitle, true)}</h3>
				<div class="cardContentDown">${markdownToHTML(card.contentDown)}</div>
				${footer}
			</section>
			${cardBack}
		</div>
		`;
	});

	contentElement.innerHTML = cardsHTML;

	colorWords = ["blue","bleu","violet","vert","green","orange","rouge","red"];

	function removeWords(string, wordsToRemove) {
		return string
			.split(' ')
			.filter(word => !wordsToRemove.includes(word))
			.join(' ');
	}

	let elementsToStyle = document.querySelectorAll('[alt]')
	for (const elementToStyle of elementsToStyle) {
		const newStyle = elementToStyle.getAttribute('alt') ? removeWords(elementToStyle.getAttribute('alt'),colorWords) : '';
		elementToStyle.style.cssText = elementToStyle.style.cssText ? elementToStyle.style.cssText + newStyle : newStyle;
	}
	const z1Elements = document.querySelectorAll('h2');
	const z2Elements = document.querySelectorAll('.cardContentUp');
	const z3Elements = document.querySelectorAll('h3');
	const z4Elements = document.querySelectorAll('.cardContentDown');
	textFit(z1Elements, { multiLine: true, maxFontSize: 18});
	textFit(z2Elements, { multiLine: true, maxFontSize: 16, minFontSize: 7.75});
	textFit(z3Elements, { multiLine: true, maxFontSize: 18});
	textFit(z4Elements, { multiLine: true, maxFontSize: 16, minFontSize: 7.75, multiLine: true});
}