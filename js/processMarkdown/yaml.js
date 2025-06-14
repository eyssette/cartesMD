import { load as loadYAML } from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils/urls.js";
import { scopedStyles } from "../utils/css.js";
import { CSSthemes, addOnsDependencies, allowedAddOns } from "../config.js";

export let yaml = {};

// On définit des propriétés utilisables dans le yaml pour customiser les styles CSS
const styleMapping = {
	card: ".card",
	z1: ".z1",
	z2: ".z2",
	z3: ".z3",
	z4: ".z4",
	z5: ".z5",
	back: ".cardBack",
	backImage: ".cardBackImage",
	style: "",
};

function splitMarkdownByHRIgnoringCodeBlocks(markdownContent) {
	// Expression régulière pour diviser en fonction de `---` uniquement en dehors des blocs de code.
	const regex = /(?:^|\n)---(?!.*```)/;

	// On recherche et remplace temporairement les blocs de code avec un token pour les restaurer après
	const codeBlockRegex = /```[\s\S]*?```/g;
	let codeBlocks = [];
	markdownContent = markdownContent.replace(codeBlockRegex, (match) => {
		codeBlocks.push(match);
		return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
	});

	// On split le markdown en fonction des séparateurs "---" en dehors des blocs de code
	let parts = markdownContent.split(regex);

	// On restaure les blocs de code
	parts = parts.map((part) =>
		part.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => codeBlocks[index]),
	);

	return parts;
}

export function processYAML(markdownContent, options) {
	const isFlashMd = options && options.isFlashMd;

	const styleThemeElement = document.getElementById("styleTheme");
	const customStylesElement = document.getElementById("customStyles");
	const styleRectoVersoElement = document.getElementById("rectoVerso");

	let markdownContentSplitted =
		splitMarkdownByHRIgnoringCodeBlocks(markdownContent);

	const hasYaml =
		markdownContent.startsWith("---") && markdownContentSplitted.length > 2;

	let customStylesCSS = "";
	if (hasYaml || isFlashMd) {
		try {
			if (!isFlashMd) {
				yaml = loadYAML(markdownContentSplitted[1]);
			} else {
				yaml = { maths: true, theme: "flashcard-simple" };
			}
			for (const [key, selector] of Object.entries(styleMapping)) {
				if (yaml[key]) {
					const styleContent = yaml[key].replaceAll("\\", "");
					customStylesCSS += selector
						? `${selector}{${styleContent}}`
						: styleContent;
				}
			}

			if (yaml.maths) {
				Promise.all([
					loadScript(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
						"katex",
					),
					loadCSS(
						"https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
						"katex",
					),
				]);
			}
			if (yaml.verso === false || options.isTestMode) {
				document.body.classList.add("noVerso");
			} else {
				document.body.classList.remove("noVerso");
			}
			if (yaml.rectoVerso) {
				const cssRectoVerso = "css/printRectoVerso.min.css";
				fetch(cssRectoVerso)
					.then((response) => response.text())
					.then((data) => {
						styleRectoVersoElement.textContent = data;
					})
					.catch((error) => {
						styleRectoVersoElement.textContent = "";
						console.error(error);
					});
			} else {
				styleRectoVersoElement.textContent = "";
			}
			// Gestion des styles personnalisés
			if (yaml.theme || isFlashMd) {
				// Possibilité d'utiliser un thème pour les cartes
				const themeName = yaml.theme.trim();
				const CSSfile = themeName.endsWith(".css")
					? themeName
					: themeName + ".css";
				if (CSSthemes.includes(CSSfile)) {
					let themeURL = "css/theme/" + CSSfile;
					const CSSthemeName = "theme-" + CSSfile.replace(".css", "");
					fetch(themeURL)
						.then((response) => response.text())
						.then((data) => {
							styleThemeElement.textContent = data;
							document.body.className = document.body.className.replace(
								/theme-\S*/g,
								"",
							);
							document.body.classList.add(CSSthemeName);
						})
						.catch((error) => {
							styleThemeElement.textContent = "";
							document.body.className = document.body.className.replace(
								/theme-\S*/g,
								"",
							);
							console.error(error);
						});
				} else {
					styleThemeElement.textContent = "";
					document.body.className = document.body.className.replace(
						/theme-\S*/g,
						"",
					);
				}
			} else {
				styleThemeElement.textContent = "";
				document.body.className = document.body.className.replace(
					/theme-\S*/g,
					"",
				);
			}
			customStylesElement.textContent = scopedStyles(
				customStylesCSS,
				"#content",
			);
			// Gestion des add-ons (scripts et css en plus)
			if (yaml.addOns) {
				yaml.addOns = yaml.addOns.replace(" ", "").split(",");
				let addOnsDependenciesArray = [];
				// On ajoute aussi les dépendances pour chaque add-on
				for (const [addOn, addOnDependencies] of Object.entries(
					addOnsDependencies,
				)) {
					if (yaml.addOns.includes(addOn)) {
						for (const addOnDependencie of addOnDependencies) {
							addOnsDependenciesArray.push(addOnDependencie);
						}
					}
				}
				yaml.addOns.push(...addOnsDependenciesArray);
				// Pour chaque add-on, on charge le JS ou le CSS correspondant
				for (const desiredAddOn of yaml.addOns) {
					const addOnsPromises = [];
					const addDesiredAddOn = allowedAddOns[desiredAddOn];
					if (addDesiredAddOn) {
						if (addDesiredAddOn.js) {
							addOnsPromises.push(loadScript(addDesiredAddOn.js, desiredAddOn));
						}
						if (addDesiredAddOn.css) {
							addOnsPromises.push(loadCSS(addDesiredAddOn.css, desiredAddOn));
						}
						Promise.all(addOnsPromises);
					}
				}
			}
		} catch (e) {
			console.log("erreur processYAML : " + e);
		}
		if (hasYaml) {
			markdownContentSplitted.shift();
			markdownContentSplitted.shift();
			return markdownContentSplitted.join("\n");
		} else {
			return markdownContent;
		}
	} else {
		document.body.className = document.body.className.replace(/theme-\S*/g, "");
		if (styleThemeElement) {
			styleThemeElement.textContent = "";
		}
		if (customStylesElement) {
			customStylesElement.textContent = "";
		}
	}
	return markdownContent;
}
