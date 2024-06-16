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

## Modifier les cartes
- ![violet](back.png)

==Double-cliquez== sur une carte pour la modifier dans l'éditeur à gauche.

On peut utiliser ++toute++ la syntaxe _Markdown_. 

### Pratique & efficace !

CartesMD calcule automatiquement la taille de police optimale pour rester dans le cadre !

---
## Balises HTML
- ![rouge](back.png)

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


## Thème <br>& image de fond
- ![bleu](back.png)

On peut choisir la couleur de la carte en l'indiquant dans le texte “_alt_” de l'image de fond.

### Personnalisation possible !

On peut changer l'image de fond en mettant l'URL d'une autre image.

#### 1


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

![object-position: 0 60px](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Danaides_Waterhouse_1903.jpg/423px-Danaides_Waterhouse_1903.jpg)


### Philosophie antique <aside>Athènes</aside>

On peut ajouter une image dans le cadre du haut et la repositionner en CSS en utilisant le “_alt_” de l'image.


#### Term.


---

## Utiliser CodiMD
- ![blue background: linear-gradient(white, lightblue);]()

<!-- On peut ne pas mettre d'image de fond -->

[CodiMD](https://codimd.apps.education.fr/) sur le portail AppsEdu permet de conserver la source de ses cartes et de les partager.

On peut alors modifier la source sans modifier le lien de partage.

### Partager ses cartes

On copie l'URL de son fichier et les cartes seront visibles à l'adresse suivante :
https://cartesmd.forge.apps.education.fr/#URLduFICHIER

D'autres éditeurs sont pris en charge :
[Hedgedoc](https://demo.hedgedoc.org/), [Digipage](https://digipage.app/). Les élèves peuvent les utiliser sans créer de comptes.


---

## Usages plus avancés
- ![violet background: linear-gradient(#EEE, darkviolet 180%);]()

On peut aussi utiliser l'en-tête _YAML_ pour ajouter des styles en CSS

### Tout peut être changé !

_card_ pour chaque carte ; _z1_ … _z4_ pour les zones d'écriture ; _back_ pour le verso et _backImage_ pour l'image de fond ; _style_ pour tout le reste. <br>Par exemple :

\`\`\`
-​-​-
z1: height:300px
-​-​-
\`\`\`

---

## Des exemples !
- ![background: linear-gradient(white, #CCC);]()

Voici quelques exemples de cartes créées avec cartesMD !

### 😮

- Des cartes à utiliser en formation <br>sur la méthode [ABC Learning <br>Design](https://cartesmd.forge.apps.education.fr/?e=0#https://codimd.apps.education.fr/i2r_yoH8R_aLcEJhCNAYow)
- Des cartes pour réviser les <br>[périmètres & aires](https://cartesmd.forge.apps.education.fr/?e=0#https://codimd.apps.education.fr/l-ZZhrUlTMCHpJpm2kJ_AA) en collège <br>(créées par Cyril Iaconelli)

<span style="font-size:0.8em">Ajoutez \`?e=0\` dans l'URL pour cacher l'éditeur <br>\`?m=0\` pour cacher le menu</span>

---

## Les thèmes
- ![green background:linear-gradient(white,green 160%]()


Si veut faire plusieurs modifications de style pour ses cartes, cela vaut le coup d'utiliser ou de créer un thème.

### Comment faire ?

Pour utiliser un thème, il faut indiquer son nom dans le _yaml_. Par exemple :

\`\`\`
theme: iaconelli.css
\`\`\`

Les thèmes disponibles sont présents dans le [dossier “thème”](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr/-/tree/main/theme) de CartesMD.

N'hésitez pas à m'envoyer vos propositions de thèmes !

---
## Faire des flashcards
- ![rouge]()

Il suffit de cliquer sur le bouton 🔄 pour activer le thème \`flashcard\`.

### Un modèle encore plus simple

On peut aussi utiliser le thème \`flashcard-simple\` pour utiliser seulement le titre 2 pour la question et la suite pour le contenu.

Voici un exemple de [flashcards en <br>Histoire-Géographie](https://cartesmd.forge.apps.education.fr/#https://codimd.apps.education.fr/eW4UTUncQ3ue56D9ThaZUg) avec ce thème  (cartes créées par Françoise Vaillant)

---

## Contribuer
- ![orange background:linear-gradient(white,orange 150%)]()

Vous pouvez m'envoyer vos demandes d'évolution de l'outil, n'hésitez pas !

### Comment faire ?

Vous pouvez me contacter sur les [réseaux sociaux](https://eyssette.forge.apps.education.fr).

De préférence, merci <br>d'utiliser les [“tickets”](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr/-/issues)  sur LaForgeEdu (vous pouvez aussi [envoyer un mail](mailto:forge-apps+guichet+cartesmd-cartesmd-forge-apps-education-fr-1275-issue-@phm.education.gouv.fr))
`;

let md;

// Raccourcis vers des cartes particulières
const shortcuts = [["shortcut", "URL"]];

const corsProxy = "https://corsproxy.io/?";

function handleURL(url) {
	if (url !== "") {
		let addCorsProxy = true;
		// Vérification de la présence d'un raccourci
		shortcut = shortcuts.find((element) => element[0] == url);
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
		// gestion des fichiers hébergés sur codiMD / hedgedoc / digipage
		if (
			(url.startsWith("https://codimd") || url.includes("hedgedoc") || url.includes("digipage") )
		) {
			addCorsProxy = false;
			url =
				url.replace("?edit", "").replace("?both", "").replace("?view", "").replace(/#$/,"").replace(/\/$/,'');
			url = url.indexOf("download") === -1 ? url + "/download" : url;
		}
		// gestion des fichiers hébergés sur framapad
		if (url.includes('framapad') && !url.endsWith('/export/txt')) {
			url = url.replace(/\?.*/,'') + '/export/txt';
		}
		url = addCorsProxy ? corsProxy + url : url;
	}
	return url;
}

function getMarkdownContent() {
	// Récupération du markdown externe
	const url = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (url !== "") {
		const urlMD = handleURL(url);
		// Récupération du contenu du fichier
		window.getMDpromise = fetch(urlMD)
			.then((response) => response.text())
			.then((data) => {
				md = data;
			})
			.catch((error) => console.error(error));
	} else {
		md = defaultMD;
	}
}

getMarkdownContent();
