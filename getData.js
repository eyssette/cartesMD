const defaultMD = `# Mes cartes à jouer

## Titre carte 1 <aside>précisions</aside>
- ![Image du fond](back.jpg)

Contenu en haut

### Sous-titre

Contenu en bas

#### Footer

---

## Titre carte 2
- ![Image du fond](back.jpg)

Contenu en haut

### Sous-titre

Contenu en bas

#### Footer


---

## Titre carte 3
- ![Image du fond](back.jpg)

Contenu en haut

### Sous-titre

Contenu en bas

#### Footer


---

## Titre carte 4
- ![Image du fond](back.jpg)

Contenu en haut

### Sous-titre

Contenu en bas

#### Footer

`;

let md;

// Raccourcis vers des cartes particulières
const shortcuts = [
	["shortcut","URL"]
];

function handleURL(url) {
	if (url !== "") {
		let addCorsProxy = true;
		// Vérification de la présence d'un raccourci
		shortcut = shortcuts.find(element => element[0]==url);
		if (shortcut) {
			url = shortcut[1];
		}
		// Gestion des fichiers hébergés sur github
		if (url.startsWith("https://github.com")) {
			addCorsProxy = false;
			url = url.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			url = url.replace("/blob/", "/");
		}
		// Gestion des fichiers hébergés sur codiMD
		if (
			url.startsWith("https://codimd") &&
			url.indexOf("download") === -1
		) {
			addCorsProxy = false;
			url =
				url.replace("?edit", "").replace("?both", "").replace("?view", "").replace(/#$/,"") +
				"/download";
		}
		// Gestion des fichiers hébergés via Hedgedoc
		if (
			url.includes("hedgedoc") &&
			url.indexOf("download") === -1
		) {
			addCorsProxy = false;
			url =
				url
					.replace("?edit", "")
					.replace("?both", "")
					.replace("?view", "")
					.replace(/#$/, "") + "/download";
		}
		url = addCorsProxy ? corsProxy + url: url;
	}
	return url;
}



function getMarkdownContent() {
	// Récupération du markdown externe
	const url = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (url !== "") {
		const urlMD = handleURL(url)
		// Récupération du contenu du fichier
		window.getMDpromise = fetch(urlMD)
			.then((response) => response.text())
			.then((data) => {
				md = data;
			})
			.catch((error) => console.error(error));
	} else {
		md = defaultMD
	}
}

getMarkdownContent();