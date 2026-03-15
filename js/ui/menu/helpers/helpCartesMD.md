## Qu'est-ce que cartesMD ?

### Un outil libre et gratuit !


CartesMD est un outil libre et gratuit qui permet de créer des cartes à jouer en Markdown !
On peut écrire son texte directement dans l'interface.

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

==Double-cliquez== sur une carte pour la modifier dans l'éditeur à gauche.

On peut utiliser ++toute++ la syntaxe _Markdown_.

CartesMD calcule automatiquement la taille de police optimale pour rester dans le cadre !


### Changer le nombre de zones

On peut changer le nombre de zones (4 par défaut et 4 au maximum) avec le paramètre `nombreZones`.

Soit on applique ce paramètre sur la ligne juste avant le titre d'une carte, soit on le définit dans l'en-tête pour qu'il s'applique à toutes les cartes


### Balises HTML

On peut aussi utiliser du <span style="color: darkred;">HTML</span> si on veut un contrôle plus fin de l'affichage !

### Latex

Pour le $Latex$, on ajoute un en-tête _yaml_ au tout début du document, avec :

```
-​-​-
maths: true
-​-​-
```

### Emojis

On peut copier-coller un emoji ou bien mettre le code texte. Par exemple : `:+1:`

[Voir la liste des emojis disponibles](https://dataview.forge.apps.education.fr/?url=https://eyssette.forge.apps.education.fr/emojis/list.tsv)

### Utilisations de la balise `aside`

#### Précisions dans les titres

On peut ajouter des précisions dans les titres avec la balise `aside`.

On peut utiliser ou non le dernier titre, de niveau 4, pour mettre le numéro de carte, la classe, un emoji …

#### Dos de la carte

On peut écrire du contenu au dos de la carte avec la balise `aside`.
Pour cela, il faut utiliser cette balise dans le dernier bloc d'écriture.
On peut écrire du **Markdown** également.


```
<aside>
Ce contenu apparaît au dos de la carte
</aside>
```

Si on veut supprimer les dos de cartes, on ajoute dans l'en-tête YAML :  `verso: false`

### Usages plus avancés

On peut aussi utiliser l'en-tête _YAML_ pour ajouter des styles en CSS

Tout peut être changé !

_card_ pour chaque carte ; _z1_ … _z4_ pour les zones d'écriture ; _front_ pour le recto, _back_ pour le verso et _backImage_ pour l'image de fond ; _style_ pour tout le reste. 

Par exemple :

```
-​-​-
z1: height:300px
-​-​-
```

## Thème & image de fond

### Changer la couleur et le fond des cartes

On peut choisir la couleur de la carte en l'indiquant dans le texte “_alt_” de l'image de fond.
On peut changer l'image de fond en mettant l'URL d'une autre image.




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

On peut aussi utiliser le thème `flashcard-simple` pour utiliser seulement le titre 2 pour la question et la suite pour le contenu.

Voici un exemple de [flashcards en Histoire-Géographie](https://cartesmd.forge.apps.education.fr/#https://codimd.apps.education.fr/eW4UTUncQ3ue56D9ThaZUg) avec ce thème (cartes créées par Françoise Vaillant).








## Enregistrer, partager, imprimer ses cartes

### Enregistrer

[CodiMD](https://codimd.apps.education.fr/) sur le portail AppsEdu permet de conserver la source de ses cartes et de les partager.

On peut alors modifier la source sans modifier le lien de partage.

### Partager

On copie l'URL de son fichier et les cartes seront visibles à l'adresse suivante :
`https://cartesmd.forge.apps.education.fr/#URL_source_CodiMD`

Ajoutez `?e=0` dans l'URL pour cacher l'éditeur `?m=0` pour cacher le menu.

Par exemple : `https://cartesmd.forge.apps.education.fr/?e=0#URL_source_CodiMD`

D'autres éditeurs sont pris en charge :
[Hedgedoc](https://demo.hedgedoc.org/), [Digipage](https://digipage.app/). Les élèves peuvent les utiliser sans créer de comptes.


### 🖨️ &nbsp;Imprimer

On lance simplement l'impression de cette page pour imprimer les cartes

<span style="font-size:0.9em">Il faut penser à activer l'impression des arrières-plan et à désactiver les en-têtes et pieds de page.</span>

On peut utiliser `rectoVerso: true` dans l'en-tête YAML pour pouvoir imprimer en recto-verso en utilisant ensuite l'outil [pdfimpose.it](https://www.pdfimpose.it/?layout=cards#step-select) pour imprimer les cartes.















