const defaultMD = `# Présentation de l'outil

_CartesMD_ est un outil **libre** et **gratuit** : vous pouvez éditer le texte ci-dessous pour changer les cartes.
Vous pouvez ensuite les imprimer facilement : il suffira alors de les découper, de plier et de coller le recto sur le verso.

Pour créer ses cartes, il faut respecter la syntaxe ci-dessous :

<!-- Les cartes commencent ci-dessous, à partir du premier titre de niveau 2, tout ce qui est écrit avant ne compte pas (vous pouvez le supprimer) --> 

## Cartes MD
- ![](back.png)

CartesMD permet de créer des cartes à jouer en Markdown !

### Un outil libre & gratuit !

On peut écrire son texte directement dans l'interface.

- Créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr/)
- Sources sur [LaForgeÉdu](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr)
- Inspiré par [CréaCarte](https://lmdbt.forge.apps.education.fr/creacarte/) <br>de [Cyril Iaconelli](https://lmdbt.forge.apps.education.fr/)

<!-- On sépare chaque carte par trois tirets du milieu qui se suivent  --> 

---


## Thème <br>& image de fond
- ![bleu](back.png)

On peut choisir la couleur de la carte en l'indiquant dans le texte “_alt_” de l'image de fond.

### Personnalisation possible !

On peut changer l'image de fond en mettant l'URL d'une autre image.

#### 1


---

## Le Markdown
- ![violet](back.png)

On peut utiliser **toute** la syntaxe _Markdown_.

### Pratique & efficace !

On peut notamment :
- ==surligner==, ++souligner++
- faire des listes …

CartesMD calcule automatique-<br>ment la taille de la police pour rester dans le cadre.

---
## Balises HTML

On peut aussi utiliser du <span style="color: darkred;">HTML</span> si on veut un contrôle plus fin de l'affichage !

### Latex

Pour le $Latex$, on ajoute un en-tête _yaml_  au tout début du document, avec :

\`\`\`
-​-​-
maths: true
-​-​-
\`\`\`

#### :mag:


---

## 🖨️ &nbsp;Imprimer
- ![vert](back.png)

On lance simplement l'impression de cette page pour imprimer les cartes

### Paramètres d'impression

<span style="font-size:0.9em">Il faut penser à activer l'impression des arrières-plan et à désactiver les en-têtes et pieds de page.</span>

---

## Emojis & précisions<aside> :+1:</aside>
- ![orange](back.png)

🧪  **Les emojis :**
On les copie-colle ou bien on met le code texte  :+1:

### Autres ajouts possibles<aside> :fire:</aside>

On peut ajouter des précisions dans les titres avec “_aside_”.

On peut utiliser ou non le dernier titre, de niveau 4, pour mettre le numéro de carte, la classe, un emoji …


#### :books:

---

## Platon <aside>428-348</aside>
- ![rouge](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/395px-Plato_Pio-Clemetino_Inv305.jpg)

![object-position: 0 -20px](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Danaides_Waterhouse_1903.jpg/423px-Danaides_Waterhouse_1903.jpg)


### Philosophie antique <aside>Athènes</aside>

On peut ajouter une image dans le cadre du haut et la repositionner en CSS en utilisant le “_alt_” de l'image.


#### Term.


---

## Utiliser CodiMD
- ![blue background: linear-gradient(white, lightblue);]()

<!-- On peut ne pas mettre d'image de fond -->

On peut aussi utiliser CodiMD pour conserver la source de ses cartes

### Gestion plus facile !

On pourra alors facilement conserver ses cartes, et les partager à l'adresse suivante&nbsp;:
https://cartesmd.forge.apps.education.fr/#URL
(en remplaçant URL <br>par l'URL du fichier CodiMD)


---

## Usages plus avancés
- ![violet background: linear-gradient(#EEE, darkviolet);]()

On peut aussi utiliser l'en-tête _YAML_ pour ajouter des styles en CSS

### Tout peut être changé !

_card_ pour chaque carte ; _z1_ … _z4_ pour les zones d'écriture ; _back_ pour le verso et _backImage_ pour l'image de fond ; _style_ pour tout le reste. <br>Par exemple :

\`\`\`
-​-​-
z1: height:300px
-​-​-
\`\`\`

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