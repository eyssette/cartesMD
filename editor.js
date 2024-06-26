const highlightCode = (editor) => {
	let code = editor.textContent;

	// On autorise l'utilisation de balises HTML
	code = code
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

	// Coloration syntaxique pour les titres
	code = code.replace(/^(#{1,6}) +(.*)/gm, (match, p1, p2) => {
		let level = p1.length;
		return `<span class="markdownTitles h${level}">${p1} ${p2}</span>`;
	});

	// Coloration syntaxique pour le texte en gras
	code = code.replace(
		/\*\*(\w.*?)\*\*/g,
		'<span class="markdownBold">**$1**</span>'
	);
	code = code.replace(
		/__(\w.*?)__/g,
		'<span class="markdownBold">__$1__</span>'
	);
	// Coloration syntaxique pour le texte en italique
	code = code.replace(
		/(?<!\*)\*(\w.*?)\*(?!\*)/g,
		'<span class="markdownItalic">*$1*</span>'
	);
	code = code.replace(
		/(?<!_)_(\w.*?)_(?!_)/g,
		'<span class="markdownItalic">_$1_</span>'
	);
	// Coloration syntaxique pour les listes
	code = code.replace(
		/^(\s*)([-*]|\d+\.)(\s)/gm,
		'<span class="markdownLists">$1$2</span>$3'
	);
	// Coloration syntaxique pour les liens
	code = code.replace(
		/(\[.*?\])\((.*?)\)/g,
		'<span class="markdownLinksText">$1</span><span class="markdownLinksURL">($2)</span>'
	);

	// Coloration syntaxique pour les tags html
	code = code.replace(
		/(&lt;aside&gt;)(.*?)(&lt;\/aside&gt;)/g,
		'<span class="markdownHTMLtag">$1</span><span class="markdownHTMLtagContent">$2</span><span class="markdownHTMLtag">$3</span>'
	);

	// Coloration syntaxique pour les commentaires html
	code = code.replace(
		/(&lt;!--.*?--&gt;)/g,
		'<span class="markdownHTMLcomment">$1</span>'
	);

	// Coloration syntaxique pour les séparations
	code = code.replaceAll("---", '<span class="markdownSeparator">---</span>');

	// Coloration syntaxique pour le yaml
	code = code.replace(
		/(card:|z1:|z2:|z3:|z4:|back:|backImage:|style:|maths:|theme:)/g,
		'<span class="markdownYAML">$1</span>'
	);

	editor.innerHTML = code;
};

const editorElement = document.getElementById("editor");

const options = {
	addClosing: false,
	spellCheck: true,
	preserveIdent: false,
	tab: "\t",
};

let jar = CodeJar(editorElement, highlightCode, options);

jar.updateCode(defaultMD);
const firstParsedMD = parseMarkdown(defaultMD);
createCards(firstParsedMD);

if (window.getMDpromise) {
	window.getMDpromise.then(() => {
		jar.updateCode(md);
		if (md.includes("maths: true")) {
			const splitMD = md.split("---").filter((element) => element.length > 0);
			if (splitMD.length > 0 && splitMD[0].includes("maths: true")) {
				window.LatexReady = Promise.all([
					loadScript(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
						"katexScript"
					),
					loadCSS(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
						"katexCSS"
					),
				]).then(() => {
					const parsedMD = parseMarkdown(md);
					createCards(parsedMD);
					setTimeout(() => {
						// Fix pour recalculer le textFit pour le Latex
						createCards(parsedMD);
					}, 100);
				});
			}
		} else {
			const parsedMD = parseMarkdown(md);
			createCards(parsedMD);
			if (md.includes("theme: ")) {
				setTimeout(() => {
					// Fix pour recalculer le textFit en cas d'utilisation d'un thème
					createCards(parsedMD);
				}, 300);
			}
		}
	});
}

function autoComplete(search, replace) {
	const cursorPosition = jar.save();
	const text = editorElement.textContent.substring(0, cursorPosition.start);
	if (text.endsWith(search)) {
		const remainingText = editorElement.textContent.substring(
			cursorPosition.start
		);
		editorElement.textContent =
			text.substring(0, text.length - search.length) + replace + remainingText;
		const diff = replace.length - search.length;
		cursorPosition.start = cursorPosition.start + diff;
		cursorPosition.end = cursorPosition.end + diff;
		jar.restore(cursorPosition);
	}
}

const printButtonElement = document.getElementById("printButton");
printButtonElement.addEventListener("click", (event) => {
	event.preventDefault();
	window.print();
});
const headerElement = document.getElementById("header");
const toggleEditorElement = document.getElementById("toggleEditor");
let showEditor = window.innerWidth > 500 ? true : false;
const params = new URLSearchParams(document.location.search);
const viewParam = parseInt(params.get("v")) ? parseInt(params.get("v")) : 0;
const editorParam = params.get("e") == "0" ? 0 : 1;
const menuParam = params.get("m") == "0" ? 0 : 1;

if (viewParam == 1 || editorParam == 0) {
	showEditor = false;
}
if (menuParam == 0) {
	document.body.classList.add("hideMenu");
	showEditor = false;
}
function showOrHideEditor() {
	if (showEditor) {
		toggleEditorElement.textContent = "👓";
		editorElement.style.display = "block";
		contentElement.style.width = "50vw";
		contentElement.style.marginLeft = "42vw";
		contentElement.style.paddingTop = "0px";
		headerElement.style.cssText = "";
	} else {
		toggleEditorElement.textContent = "✒️";
		editorElement.style.display = "none";
		contentElement.style.width = window.innerWidth > 1500 ? "100%" : "120%";
		contentElement.style.marginLeft = "10px";
		contentElement.style.paddingTop = "60px";
		headerElement.style.cssText =
			"background-color: white;;border: 2px solid black;";
	}
}
showOrHideEditor();


// Double clic pour focaliser l'éditeur sur la carte sur laquelle on a cliqué
document.body.addEventListener("dblclick", (event) => {
	const markdownTitles = document.querySelectorAll(".markdownTitles.h2");
	let currentElement = event.target;
	let selectedCard = currentElement.closest('.cardBackAndFront');
	if(selectedCard) {
		selectedCardNumber = selectedCard.id.replace('card-','');
		markdownSelectedCard = markdownTitles[selectedCardNumber-1];
		showEditor = true;
		document.body.classList.remove("hideMenu");
		showOrHideEditor();
		markdownSelectedCard.scrollIntoView();
	};
})

toggleEditorElement.addEventListener("click", (event) => {
	event.preventDefault();
	showEditor = showEditor ? false : true;
	showOrHideEditor();
});


// Bouton pour changer l'orientation et créer des cartes ou des flashcards
let lastTheme = '';
const orientationButtonElement = document.getElementById("orientationButton");
orientationButtonElement.addEventListener("click", (event) => {
	const splittedContent = editorElement.textContent.split('---')
	if(editorElement.textContent.startsWith('---') && splittedContent.length > 2) {
		const yamlPart = splittedContent[1];
		if(!yamlPart.includes('theme: flashcard')) {
			if(yamlPart.includes('theme: ')) {
				splittedContent[1] = splittedContent[1].replace(/theme: (.*)/, function (match, v1) {
					if(v1) {
						lastTheme = v1;
					}
					return 'theme: flashcard';
				}).replaceAll('\n\n','\n')
			} else {
				splittedContent[1] = splittedContent[1]+'\ntheme: flashcard\n';
				splittedContent[1] = splittedContent[1].replaceAll('\n\n','\n');
			}
		} else {
			splittedContent[1] = splittedContent[1].replace(/theme: flashcard.*/, lastTheme.length>0 ? 'theme: '+lastTheme : '').replaceAll('\n\n','\n')
		}
		if (splittedContent[1].trim().length == 0) {
			splittedContent.shift();
			splittedContent.shift();
		}
		jar.updateCode(splittedContent.join('---').trim());
		const parsedMD = parseMarkdown(editorElement.textContent);
		createCards(parsedMD);
		setTimeout(() => {
			// Fix pour recalculer le textFit
			createCards(parsedMD);
		}, 100);
	} else {
		jar.updateCode('---\ntheme: flashcard\n---\n\n'+editorElement.textContent);
		const parsedMD = parseMarkdown(editorElement.textContent);
		createCards(parsedMD);
		setTimeout(() => {
			// Fix pour recalculer le textFit
			createCards(parsedMD);
		}, 100);
	}
})

// Gestion des raccourcis clavier
document.body.addEventListener("keyup", (event) => {
	if (event.ctrlKey && event.shiftKey && event.key === 'O') {
		orientationButtonElement.click();
	} else {
		document.body.classList.remove("hideMenu");
		if (showEditor && event.key === "Escape") {
			showEditor = showEditor ? false : true;
			showOrHideEditor();
		} else {
			if (!showEditor && event.key === "e") {
				showEditor = showEditor ? false : true;
				showOrHideEditor();
				editorElement.focus();
			} else {
				if (!showEditor && event.key === "m") {
					document.body.classList.add("hideMenu");
				}
			}
		}
	}
});

// Fonction debounce pour gérer l'update des cards avec un délai
function debounce(func, wait) {
	let timeout;
	return function(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// Fonction pour mettre à jour les cartes
function updateCards() {
	const parsedMD = parseMarkdown(editorElement.textContent);
	createCards(parsedMD);
}

// Utiliser debounce pour appeler updateCards avec un délai afin d'éviter un lag dans le cas d'un document long
const debouncedUpdateCards = debounce(updateCards, 300);

editorElement.addEventListener("keyup", () => {
	if (showEditor) {
		debouncedUpdateCards();
	}
});