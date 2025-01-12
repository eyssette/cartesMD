import { load as loadYAML } from "../externals/js-yaml.js";
import { loadScript, loadCSS } from "../utils/urls.js";
import { CSSthemes, addOnsDependencies, allowedAddOns } from "../config.js";

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
	const styleRectoVersoElement = document.getElementById("rectoVerso");
	const styleVersoElement = document.getElementById("verso");

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
			if (yaml.verso === false) {
				styleVersoElement.textContent =
					".cardBack{display:none!important}#content {column-count:4!important}";
			} else {
				styleVersoElement.textContent = "";
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
