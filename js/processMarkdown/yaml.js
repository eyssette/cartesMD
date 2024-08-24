import { load as loadYAML } from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils/urls.js";
import { CSSthemes } from "../config.js";

export let yaml = {};

// On définit des propriétés utilisables dans le yaml pour customiser les styles CSS
const styleMapping = {
	card: ".card",
	z1: "h2",
	z2: ".cardContentUp",
	z3: "h3",
	z4: ".cardContentDown",
	back: ".cardBack",
	backImage: ".cardBackImage",
	style: "",
};

export function processYAML(markdownContent, markdownContentSplitted) {
	const styleThemeElement = document.getElementById("styleTheme");
	const customStylesElement = document.getElementById("customStyles");

	let customStylesCSS = "";
	if (markdownContent.startsWith("---") && markdownContentSplitted.length > 2) {
		try {
			yaml = loadYAML(markdownContentSplitted[1]);
			// let theme = false;
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
			// Gestion des styles personnalisés
			if (yaml.theme) {
				// Possibilité d'utiliser un thème pour les cartes
				const themeName = yaml.theme.trim();
				const CSSfile = themeName.endsWith(".css")
					? themeName
					: themeName + ".css";
				if (CSSthemes.includes(CSSfile)) {
					// theme = true;
					let themeURL = "css/theme/" + CSSfile;
					fetch(themeURL)
						.then((response) => response.text())
						.then((data) => {
							styleThemeElement.textContent = data;
							document.body.className =
								document.body.className +
								" theme-" +
								CSSfile.replace(".css", "");
						})
						.catch((error) => {
							styleThemeElement.textContent = "";
							document.body.className = document.body.className.replace(
								/theme-.*/,
								"",
							);
							console.error(error);
						});
				} else {
					styleThemeElement.textContent = "";
					document.body.className = document.body.className.replace(
						/theme-.*/,
						"",
					);
				}
			} else {
				styleThemeElement.textContent = "";
				document.body.className = document.body.className.replace(
					/theme-.*/,
					"",
				);
			}
			customStylesElement.textContent = customStylesCSS;
			markdownContentSplitted.shift();
			markdownContentSplitted.shift();
		} catch (e) {
			console.log("erreur processYAML : " + e);
		}
	} else {
		document.body.className = document.body.className.replace(/theme-.*/, "");
		if (styleThemeElement) {
			styleThemeElement.textContent = "";
		}
		if (customStylesElement) {
			customStylesElement.textContent = "";
		}
	}
	return markdownContentSplitted;
}
