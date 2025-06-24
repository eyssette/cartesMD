## 2.3.0 (2025-06-24)

### Feat

- gestion des attributs génériques {.class} et des attributs inline --tag:text-- dans le Markdown
- gestion des listes de tâches en Markdown

### Fix

- **processMarkdown**: prise en compte des options dès l'initialisation pour createCards()
- **ui**: CSS automatique pour une flashcard dans FlashMD qui a du contenu additionnel (en haut ou en bas à droite dans le recto)

## 2.2.0 (2025-06-16)

### Feat

- paramètre "raw" dans l'URL => contenu des flashcards encodé dans le hash

### Fix

- clic sur le bouton de changement d'orientation => on force le rafraîchissement de textFit
- justifyContent à start pour FlashMD quand l'éditeur est caché et qu'on est sur petit écran
- setInterval pour vérifier la présence de Katex
- meilleure gestion bouton/raccourcis (pour sortir correctement du testMode)
- sortie de testMode si on fait réapparaître l'éditeur (raccourci clavier ou bouton)
- justifyContent center pour isFlashMD quand l'éditeur est caché (ce qui inclut le testMode)

### Chore

- typo dans le fichier taskfile
- configuration rollup et taskfile
- codeJar en ECMA2018

## 2.1.3 (2025-06-15)

### Fix

- meilleure gestion de handleTestMode (pas besoin de ToggleVerso si on a testMode en paramètre dans l'URL)
- classe noVerso ajoutée plus rapidement pour le testMode
- paramètre testmode dans l'URL : t=1 ou r=1
- meilleure gestion du Latex et des promises pour textFit
- meilleure gestion de l'eventClick pour retourner les cartes avec flashMD : suppression du listener quand on sort du mode révision

## 2.1.2 (2025-06-13)

### Fix

- update du contenu de l'éditeur avec debounce qui prend en compte les options
- raccourci clavier pour le mode révision dans flashMD
- gestion des paramètres dans l'URL, notamment pour le mode révision avec flashMD
- prise en compte petit écran pour le retour du mode de révision vers le mode ordinaire (il faut cacher la fenêtre d'édition par défaut)

## 2.1.1 (2025-06-13)

### Fix

- CSS pour le mode test dépend de .noVerso

## 2.1.0 (2025-06-13)

### Feat

- mode révision

## 2.0.0 (2025-06-13)

Changement de version majeure : mise en place de FlashMD

### Feat

- gestion de "fond: couleur" pour définir une couleur de fond sur une carte
- détection de flashMD => thème = flashcard-simple
- Plus besoin du séparateur "---" entre chaque carte : simplifie l'édition, mais reste compatible avec l'ancienne syntaxe

### Fix

- raccourcis clavier et double click prennent en compte isFlashMD pour gérer correctement le CSS quand on cache ou affiche l'éditeur
- exemple flashcards philosophie
- ajout d'un exemple plus complexe dans le texte par défaut pour flashMD
- CSS pour h2 aside dans theme flashcard-simple
- CSS éléments code et pre
- explication plus clair pour fond: couleur
- titre "FlashMd" quand on est sur flashMD
- pas de textFit sur la zone 4 (inexistante) dans le thème flashcard-simple
- texte par défaut pour flashMD
- taille de l'élément #content pour l'impression si o nutilise FlashMd
- CSS pour l'affichage des flashcards quand l'éditeur est caché, sur flashmd
- erreur sur sourceMarkdown !
- pas de bouton de changement de l'orientation des cartes pour flashMD
- contenu différent par défaut pour flashMD
- gestion des paramètres par défaut pour flashMD dans le YAML
- simplification du contenu par défaut
- CSS pour pouvoir imprimer la zone 5 dans le thème flashcard-simple
- CSS pour les éléments ol/ul dans les thèmes de type flashcard
- ajustement position zone 5 dans thème flashcard-simple
- plus de place pour le contenu dans le verso dans le thème flashcard-simple
- taille des zones principales dans le thème flashcard-simple
- possibilité d'utiliser la zone 5 dans le thème flashcard-simple
- possibilité d'utiliser la zone 3 dans le thème flashcard-simple (pour ajouter une étiquette à la carte)
- gestion recto:false pour les thèmes flashcard et flashcard-simple
- meilleure gestion propriété recto dans le YAML
- meilleure gestion de l'ajout et de la suppression d'un thème
- **CSS**: css pour le thème flashcard-simple si nombre de zones = 1
- **css**: CSS pour le thème flashcard avec des nombres de zones <4
- source par défaut dans index.md

### CI

- ajout de index-flashmd.md dans le déploiement

### Chore

- fix pre bump hook
- mise en place de commitizen
- formatage automatique du CSS

## 1.62.2 (2025-03-10)

### Fix

- **codejar**: bug avec contenteditable plaintext => test si version Firefox >136

## 1.62.1 (2025-03-05)

### Fix

- URL image thème iaconelli

## 1.62.0 (2025-03-05)

### Feat

- scopedStyles pour styles dans yaml (pour les appliquer seulement aux cartes)

## 1.61.0 (2025-03-05)

### Feat

- ajout des classes z1,z2,z3,z4,z5

## 1.60.3

- docs: ajout fichiers README et CONTRIBUTING.md
- fix(CSS): header z-index
- chore: correction typo nom du projet

## 1.60.2

- CSS ajustement taille aside (dos de carte)

## 1.60.1

- ajustements textfit et align-items pour les thèmes flashcards

## 1.60.0

- backgroundColorCSS par mot clé aussi quand il n'y a pas d'image + ajout "gris"

## 1.59.4

- fitElements: maxFontSize pour certaines zones + CSS

## 1.59.3

- showdown emoji : ladder

## 1.59.2

- URL liste emojis : dataview

## 1.59.1

- Lien vers liste d'emojis

## 1.59.0

- dos de carte : via balise aside dans contentDown et/ou contentUp (et pas seulement contentDown)

## 1.58.5

- fonction convertLatex : meilleur parsing du Latex

## 1.58.4

- test si yaml avant de tester si yaml.math ou yaml.theme

## 1.58.3

- fix test if yaml avant de vérifier yaml.nombreZones

## 1.58.2

- infobulle plus explicite pour les boutons : description de la fonction

## 1.58.1

- explication 4 zones au maximum par défaut

## 1.58.0

- CSS print: forcer affichage graphique arrière plan

## 1.57.2

- CSS flashcards : nowrap

## 1.57.1

- img : max-width:100%

## 1.57.0

- Possibilité d'utiliser plusieurs couleurs : ajout colorWords + détection noms couleurs valides en CSS

## 1.56.1

- Changement style pour zCount3 (3 zones)

## 1.56.0

- Définition nombreZones : possible d'utiliser yaml+paramètre pour une carte

## 1.55.2

- Simplification du texte au début

## 1.55.1

- fix bug : conflit CSS/text2fit avec nombreZones

## 1.55.0

- Possibilité de configurer le nombre de zones éditables (nombreZones par carte ou pour toutes les cartes dans le yaml)

## 1.54.0

- Possibilité de supprimer les dos de cartes (verso: false)

## 1.53.5

- inclusion automatique des couleurs de cartes en CSS

## 1.53.4

- fix lien vers dossier des thèmes CSS

## 1.53.3

- fixe return Promise dans loadScript

## 1.53.2

- corsProxy : changement URL

## 1.53.1

- autorisation thème persona

## 1.53.0

- ajout thème persona

## 1.52.1

- contenu dos carte aside: pas affiché dans thèmes flashcard

## 1.52.0

- contenu possible au dos de la carte

## 1.51.1

- change image format : sélecteur plus précis

## 1.51.0

- Ajout addOns + addOn: kroki

## 1.50.0

- gestion des fichiers hébergés sur pad gouv

## 1.49.0

- possibilité d'imprimer en recto-verso les cartes

## 1.48.4

- déplacement utils =&gt; dossier + fichier urls.js
- meilleur gestion admonitions

## 1.48.3

- gestion print CSS

## 1.48.2

- fix loadScript & loadCSS

## 1.48.1

- print : détection aussi de metaKey+P

## 1.48.0

- add emojis

## 1.47.18

- handleMathsAndThemes : fix

## 1.47.17

- fitElements : en asynchrone

## 1.47.16

- simplification contenu initial

## 1.47.15

- a: break-word
- pas de prettier automatique pour fichiers .md

## 1.47.14

- maths & theme : fix pour textFit

## 1.47.13

- Suppression css inutile

## 1.47.12

- fix textFit pour le Latex lors du premier chargement

## 1.47.11

- convertLatex : seulement si katex loaded

## 1.47.10

- loadScript / loadCSS : repérage avec ID plutôt que classe

## 1.47.9

- key "e" pour revenir à l'éditeur : preventDefault

## 1.47.8

- js-yaml: import seulement de "load"

## 1.47.7

- loadCSS : par défaut dans body

## 1.47.6

- ajout de tous les fichiers css minifiés dans public

## 1.47.5

- reduce CSS (loadCSS imports nécessaires) + meilleure gestion shortcuts

## 1.47.4

- sur petits écrans: pas d'affichage de l'éditeur au début

## 1.47.3

- favicon : au format svg

## 1.47.2

- utilisation images format avif si possible

## 1.47.1

- refactor : modules + Rollup
- réduction taille images + fond en svg

## 1.47.0

- gestion source sur Digidoc

## 1.46.0

- gestion fichiers sur Framapad

## 1.45.7

- flashcards HG : crédits

## 1.45.6

- ajout CSS pour thème flashcard-simple pour l'impression

## 1.45.5

- fix: conflit entre hideMenu & thème flashcard

## 1.45.4

- ajout br dans liens

## 1.45.3

- Explications et exemple pour les flashcards

## 1.45.2

- fix: bouton supprimer flashcard avec  theme : flashard-simple

## 1.45.1

- Gestion lag si document long =&gt; update après un délai / debounce

## 1.45.0

- Ajout thème : flashcard-simple.css

## 1.44.7

- fix CSS pour l'impression sur différents navigateurs + format CSS

## 1.44.6

- supprime classe "flashcard" si plus de yaml

## 1.44.5

- Fix CSS pour l'impression sur certains navigateurs pour le thème flashcard

## 1.44.4

- Ajout de la classe correspondant au thème dans l'élément body

## 1.44.3

- fix: test de l'URL pour pouvoir travailler avec les thèmes en local

## 1.44.2

- CSS: le header doit toujours être au-dessus

## 1.44.1

- fix: classe pour chaque carte, ne doit contenir que la couleur de la carte, pas le reste du alt

## 1.44.0

- styles pour petits écrans + format flashcard

## 1.43.1

- bouton pour changer l'orientation : revient au thème d'avant + fix pour recalculer le textFit

## 1.43.0

- Bouton pour changer l'orientation et créer des cartes ou des flashcards

## 1.42.4

- Améliration thème flashcard

## 1.42.3

- suppression de maxFontSize pour textFit

## 1.42.2

- mode landscape sans !important pour permettre mode portrait (thème flashcard)

## 1.42.1

- mode portrait pour les flashcards

## 1.42.0

- Possibilité de mettre le nom du thème sans ".css" à la fin

## 1.41.1

- autorisation thème flashcard

## 1.41.0

- Ajout thème flashcard

## 1.40.2

- Meilleures explications CodiMD & partage + hedgedoc/digipage

## 1.40.1

- Dans l'explication: paramètre e=0 plutôt que v=1 dans l'URL pour cacher l'éditeur

## 1.40.0

- Ajout explications : double-click / ordre des premières cartes / reprise carte sur le Markdown

## 1.39.2

- Double click sur une carte : affiche le menu s'il était caché

## 1.39.1

- Double click sur une carte : affiche l'éditeur s'il était caché

## 1.39.0

- Ajout: editorParam (pour cacher l'éditeur avec ?e=0)

## 1.38.0

- Double clic pour focaliser l'éditeur sur la carte sur laquelle on a cliqué

## 1.37.2

- fix menuParam

## 1.37.1

- fix bug hideMenu

## 1.37.0

- Possibilité de cacher le menu avec le paramètre ?m=0 ou raccourci 'm'

## 1.36.0

- Ajout explications : thèmes + comment contribuer

## 1.35.0

- gestion des fichiers hébergés sur codiMD / hedgedoc / digipage

## 1.34.0

- accessibilité navigation + tooltip

## 1.33.7

- typo

## 1.33.6

- petite optimisation

## 1.33.5

- gestion YAML sans boucle for : accès objet/key (permet gestion absence key)

## 1.33.4

- ajout de break-inside:avoid pour .card également

## 1.33.3

- Format code
- Impression: ajout "break-inside:avoid" à l'intérieur des cartes

## 1.33.2

- ajout z2small-bluegradient-withlogo comme thème autorisé

## 1.33.1

- fix import
- import z2small
- import z2small

## 1.33.0

- Ajout thème: z2small-bluegradient-withlogo.css

## 1.32.1

- Fix pour recalculer le textFit en cas d'utilisation d'un thème

## 1.32.0

- coloration syntaxique: ajout de "theme"

## 1.31.1

- fix: autorisation pour z2small.css

## 1.31.0

- gestion des thèmes si on est en local

## 1.30.0

- Ajout thème : z2Small

## 1.29.2

- fix : l'éditeur ne s'actualisait pas en cas de fichier externe

## 1.29.1

- fix: possibilité de supprimer le thème CSS s'il n'est plus présent dans le YAML

## 1.29.0

- Ajout thème : iaconelli.css

## 1.28.0

- Possibilité d'ajouter des thèmes CSS personnalisés

## 1.27.2

- loadScript & loadCSS : fix bug (pas d'ajout si alreadyLoaded)

## 1.27.1

- Fix pour recalculer le textFit pour le Latex en cas de fichier externe

## 1.27.0

- Ajout exemples

## 1.26.2

- fix position image tonneau des Danaïdes

## 1.26.1

- gestion du Latex si chargement direct d'un fichier externe qui en contient

## 1.26.0

- add corsProxy

## 1.25.0

- Possibilité de définir l'image de fond dans le YAML

## 1.24.1

- ajout fond de carte pour la carte Balises HTML

## 1.24.0

- Coloration syntaxique : séparation & attributs yaml

## 1.23.2

- Peaufinements présentation cartesMD

## 1.23.1

- minFontSize pour textFit

## 1.23.0

- Ajouts admonitions + peaufinements h3 et mark

## 1.22.1

- fix CSS

## 1.22.0

- Markdown autorisé dans les balises div

## 1.21.0

- meilleure présentation : balises HTML & Latex + autres améliorations

## 1.20.0

- textfit pour calculer automatiquement la taille de la police

## 1.19.0

- peaufinements styles CSS

## 1.18.0

- yaml : styles CSS pour chaque carte & chaque zone

## 1.17.2

- Explications utilisations CodiMD + yaml pour les styles CSS

## 1.17.1

- Précision message initial : cartes commencent à partir du premier titre 2

## 1.17.0

- raccourci clavier pour afficher/masquer l'éditeur

## 1.16.2

- fix bug si pas de titre h1

## 1.16.1

- fix bug reload après bouton print

## 1.16.0

- Possibilité de supprimer l'image de fond et de styliser en CSS

## 1.15.2

- suppression des mots de couleurs lors de la conversion img-alt =&gt; CSS

## 1.15.1

- filter cardBackImage : seulement sur l'image back.png

## 1.15.0

- paramètre "v" dans l'url pour pouvoir voir seulement les cartes & cacher l'éditeur

## 1.14.0

- hideEditor : contentWidth différente selon taille de l'écran

## 1.13.0

- Boutons: print & toggleEditor

## 1.12.1

- reprise titre & description

## 1.12.0

- add favicon

## 1.11.0

- title+description

## 1.10.0

- Markdown de l'accueil : liens Forge

## 1.9.1

- fix pour DarkMode

## 1.9.0

- CSS pour les petits écrans

## 1.8.0

- précisions markdown page accueil
- remove ancien css

## 1.7.0

- Contenu du Markdown par défaut pour la page d'accueil

## 1.6.0

- petits peaufinements

## 1.5.0

- Définition du CSS pour les images dans le "alt"

## 1.4.0

- gestion du titre si on utilise "br" dans le titre

## 1.3.0

- gestion des cartes de différentes couleurs

## 1.2.0

- Image de fond : en png avec transparence

## 1.1.0

- Ajout gestion Markdown dans footer (pour les emojis notamment)

## 1.0.0

- first commit
- Initial commit
- add gitlab-ci.yml
