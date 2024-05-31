const highlightCode = (editor) => {
	let code = editor.textContent;

	// On autorise l'utilisation de balises HTML
	code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

	// Coloration syntaxique pour les titres
	code = code.replace(
		/^(#{1,6}) +(.*)/gm, 
		(match, p1, p2) => {
			let level = p1.length;
			return `<span class="markdownTitles h${level}">${p1} ${p2}</span>`;
		}
	);

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
	code = code.replace(/(&lt;aside&gt;)(.*?)(&lt;\/aside&gt;)/g,'<span class="markdownHTMLtag">$1</span><span class="markdownHTMLtagContent">$2</span><span class="markdownHTMLtag">$3</span>')

	// Coloration syntaxique pour les commentaires html
	code = code.replace(/(&lt;!--.*?--&gt;)/g,'<span class="markdownHTMLcomment">$1</span>')

	editor.innerHTML = code;
};

const editorElement = document.getElementById("editor");

const options = {
	addClosing: false,
	spellCheck: true,
	preserveIdent: false,
	tab: '\t',
};

let jar = CodeJar(editorElement, highlightCode, options);


jar.updateCode(defaultMD);
const firstParsedMD = parseMarkdown(defaultMD)
createCards(firstParsedMD);


if(window.getMDpromise) {
	window.getMDpromise.then(() => {
		jar.updateCode(md);
		const parsedMD = parseMarkdown(md)
		createCards(parsedMD);
	})
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


document.body.addEventListener("keyup", () => {
	// autoComplete("## Acq", "## Acquisition");
	const parsedMD = parseMarkdown(editorElement.textContent);
	createCards(parsedMD);
});
