## CartesMD

### Un outil libre et gratuit !

CartesMD est un outil libre et gratuit qui permet de créer des cartes à jouer en Markdown !
On peut écrire son texte directement dans l'interface.

Pour faire des flashcards, utilisez plutôt [FlashMD](https://flashmd.forge.apps.education.fr/) : il est plus simple et propose un mode de révision en ligne.

CartesMD est plus adapté pour faire des cartes plus complexes, destinées à être imprimées.

- Créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr/)
- Sources sur [LaForgeÉdu](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr)
- Inspiré par [CréaCarte](https://lmdbt.forge.apps.education.fr/creacarte/) de [Cyril Iaconelli](https://lmdbt.forge.apps.education.fr/)

### Contribuer
Vous pouvez m'envoyer vos demandes d'évolution de l'outil, n'hésitez pas !

Vous pouvez me contacter sur les [réseaux sociaux](https://eyssette.forge.apps.education.fr).

De préférence, merci d'utiliser les [“tickets”](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr/-/issues) sur LaForgeEdu (vous pouvez aussi [envoyer un mail](mailto:forge-apps+guichet+cartesmd-cartesmd-forge-apps-education-fr-1275-issue-@phm.education.gouv.fr))


### Des exemples !

Voici quelques exemples de cartes créées avec cartesMD !

- Des cartes à utiliser en formation sur la méthode [ABC Learning Design](https://cartesmd.forge.apps.education.fr/?e=0#https://codimd.apps.education.fr/i2r_yoH8R_aLcEJhCNAYow)  
- Des cartes pour réviser les [périmètres & aires](https://cartesmd.forge.apps.education.fr/?e=0#https://codimd.apps.education.fr/l-ZZhrUlTMCHpJpm2kJ_AA) en collège (créées par Cyril Iaconelli)


## Modifier les cartes

### Éditeur intégré

Double-cliquez sur une carte pour la modifier dans l'éditeur à gauche.

On peut utiliser toute la syntaxe _Markdown_.

CartesMD calcule automatiquement la taille de police optimale pour rester dans le cadre !


### Les zones d'écritures

#### 4 zones par défaut

Par défaut, les cartes sont organisées en 4 zones d'écriture, avec la structure suivante :

```
## Zone 1 : titre de la carte
Zone 2 : contenu dans l'encart en haut
### Zone 3 : sous-titre
Zone 4 : contenu dans l'encart en bas
```

On utilise donc chaque élément de syntaxe Markdown pour différencier les zones d'écriture : 
- titre de niveau 2 pour la zone 1
- texte en dessous de ce titre pour la zone 2
- titre de niveau 3 pour la zone 3
- texte en dessous de ce titre pour la zone 4


#### Changer le nombre de zones

On peut changer le nombre de zones (entre 1 et 4) avec le paramètre `nombreZones`.

Soit on applique ce paramètre sur la ligne juste avant le titre d'une carte, soit on le définit dans l'en-tête pour qu'il s'applique à toutes les cartes

#### Écrire au dos de la carte

Pour ajouter une zone d'écriture et écrire au dos de la carte, on utilise la balise `aside` dans la zone 4 (texte en dessous du titre de niveau 3).

```
## Titre de la carte
Contenu sous le titre
### Sous-titre
Contenu sous le sous-titre
<aside>
Ce contenu apparaît au dos de la carte
</aside>
```

#### Supprimer les dos de carte

Si on veut supprimer les dos de cartes et n'avoir que des rectos, on ajoute dans l'en-tête YAML :  `verso: false`

#### Ajouter des labels

On peut ajouter des labels pour insérer des informations complémentaires courtes (comme une classe, un numéro de chapitre, un emoji …).

Pour cela, on peut utiliser la balise `aside` dans la zone 1 (titre de la carte) ou dans la zone 3 (sous-titre).

On peut aussi ajouter un titre de niveau 4 dans la zone 4 pour avoir un label en bas à droite.

```
## Titre de la carte <aside>Label à droite du titre</aside>
Contenu sous le titre
### Sous-titre <aside>Label à droite du sous-titre</aside>
Contenu sous le sous-titre
#### Label en bas à droite dans un encadré
```

On peut utiliser les styles CSS pour personnaliser l'apparence de ces labels (couleur, taille de police, position …).

### Contenus possibles

#### Markdown

On utilise la syntaxe Markdown classique pour écrire le contenu de ses cartes : listes à puces, texte en gras ou en italique, souligné ou surligné, liens, images …

#### Balises HTML

On peut aussi utiliser du _HTML_ si on veut un contrôle plus fin de l'affichage !

#### Latex

Pour pouvoir utiliser le $Latex$, il faut ajouter un en-tête _yaml_ au tout début du document, avec :

```
-​-​-
maths: true
-​-​-
```

#### Emojis

On peut copier-coller un emoji ou bien mettre le code texte. Par exemple : `:+1:`

[Voir la liste des emojis disponibles](https://dataview.forge.apps.education.fr/?url=https://eyssette.forge.apps.education.fr/emojis/list.tsv)



### Configuration plus avancée avec l'en-tête YAML

Un en-tête _YAML_ peut être ajouté au tout début du document pour configurer les cartes de manière plus avancée.

#### Styles CSS

On peut ajouter des styles en CSS. Tout peut être changé !

_card_ pour chaque carte ; _z1_ … _z4_ pour les zones d'écriture ; _front_ pour le recto, _back_ pour le verso et _backImage_ pour l'image de fond ; _style_ pour tout le reste. 

Par exemple :

```
-​-​-
z1: height:300px
style: a{color:darkred}
-​-​-
```



## Thème & image de fond

### Changer la couleur et le fond des cartes

Sous le titre de niveau 2, qui définit le titre de la carte, on peut définir la couleur et l'image du fond de la carte ainsi :

```
## Titre de la carte
- ![couleur de fond](URL de l'image de fond)
```

### Les thèmes

Si veut faire plusieurs modifications de style pour ses cartes, cela vaut le coup d'utiliser ou de créer un thème.

Pour utiliser un thème, il faut indiquer son nom dans le _yaml_. Par exemple :

```
theme: iaconelli.css
```

Les thèmes disponibles sont présents dans le [dossier “thème”](https://forge.apps.education.fr/cartesmd/cartesMD.forge.apps.education.fr/-/tree/main/css/theme) de CartesMD.

N'hésitez pas à m'envoyer vos propositions de thèmes !


### Des thèmes pour faire des flashcards

Il suffit de cliquer sur le bouton 🔄 pour activer le thème `flashcard`.

Pour faire des flashcards simples, mais avec un mode de révision en ligne, il vaut mieux utiliser [FlashMD](https://flashmd.forge.apps.education.fr/).

CartesMD permet de faire des cartes plus complexes, destinées à être imprimées.

Plusieurs thèmes sont disponibles : `flashcard`, `flashcard-simple`, `flashcard-mission`.







## Enregistrer, partager, imprimer ses cartes

### Enregistrer

CartesMD n'enregistre pas les cartes, il faut donc copier-coller le texte de ses cartes dans un éditeur de texte pour les conserver.

[CodiMD](https://codimd.apps.education.fr/) sur le portail AppsEdu permet de sauvegarder des documents en Markdown et de les partager. On peut aussi utiliser : [Digipage](https://digipage.app/) ou [Hedgedoc](https://demo.hedgedoc.org/). L'intérêt est que les élèves peuvent y avoir accès sans créer de comptes.

Cela permet non seulement d'avoir une sauvegarde de ses cartes, mais aussi de les partager facilement en ligne, et de les modifier à tout moment sans avoir à changer l'URL de partage.

### Partager

On copie l'URL de son fichier et les cartes seront visibles à l'adresse suivante :
`https://cartesmd.forge.apps.education.fr/#URL_source_CodiMD`

Par exemple : `https://cartesmd.forge.apps.education.fr/?e=0#URL_source_CodiMD`

Le paramètre `?e=0` dans l'URL cache par défaut l'éditeur, afin d'afficher par défaut les cartes en mode visualisation, on peut aussi utiliser `?e=0&m=0` pour cacher l'éditeur et le menu qui permet de modifier les cartes.


### 🖨️ &nbsp;Imprimer

On lance simplement l'impression de cette page pour imprimer les cartes

<span style="font-size:0.9em">Il faut penser à activer l'impression des arrières-plan et à désactiver les en-têtes et pieds de page.</span>

On peut utiliser `rectoVerso: true` dans l'en-tête YAML pour pouvoir imprimer en recto-verso en utilisant ensuite l'outil [pdfimpose.it](https://www.pdfimpose.it/?layout=cards#step-select) pour imprimer les cartes.















