## FlashMD

### Un outil libre et gratuit !

FlashMD est un outil libre et gratuit, créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr/), qui permet de faire des flashcards et de les réviser en ligne !

Si vous voulez faire des cartes plus complexes, vous pouvez utiliser [CartesMD](https://cartesmd.forge.apps.education.fr/).

### Mode révision

FlashMD est particulièrement adapté pour faire des flashcards de révision, avec un recto pour la question et un verso pour la réponse.

Pour rentrer dans le mode révision, on clique dans le menu en haut à gauche sur l'icône “éprouvette”, afin de se tester : 🧪

On pourra alors cliquer sur le recto d'une carte pour vérifier si on a la bonne réponse.

On peut aussi ajouter des paramètres à l'URL pour partager directement en mode révision des cartes (voir l'onglet “Enregistrer et partager ses cartes”).

### Imprimer ses cartes

Vous pouvez aussi imprimer vos cartes, en cliquant sur l'icône “imprimante” dans le menu en haut à gauche : 🖨️.

Trois options d'impression sont proposées :
- A4 ordinaire : 4 cartes par page (pliage en 2 à faire soi-même pour former le recto et le verso)
- A4 recto-verso : 9 cartes par page, avec le recto sur une page, le verso sur la page suivante (à imprimer en recto-verso)
- Sortie au format de la carte : permet d'envoyer un fichier PDF adapté pour un service de reprographie. Permet aussi de choisir la taille des flashcards lors de l'impression (en déterminant le nombre de cartes à imprimer sur une page A4).

### Contribuer

Vous pouvez m'envoyer vos demandes d'évolution de l'outil, n'hésitez pas !

Vous pouvez me contacter sur les [réseaux sociaux](https://eyssette.forge.apps.education.fr).

De préférence, merci d'utiliser les [“tickets”](https://forge.apps.education.fr/flashmd/flashmd.forge.apps.education.fr/-/issues) sur LaForgeEdu (vous pouvez aussi [envoyer un mail](mailto:forge-apps+guichet+flashmd-flashmd-forge-apps-education-fr-5732-issue-@phm.education.gouv.fr))


### Des exemples !
Des [flashcards en Histoire-Géographie](https://flashmd.forge.apps.education.fr/#https://codimd.apps.education.fr/oT-mEExZS0GyJlRo7tPnUw) créées par Françoise Vaillant.

Des [flashcards en philosophie](https://flashmd.forge.apps.education.fr/#https://codimd.apps.education.fr/08ZtYO6hS9WmhQGMV576cA) (cours sur l'épistémologie)


## Modifier les cartes

### Éditeur intégré

Double-cliquez sur une carte pour la modifier dans l'éditeur à gauche.

On peut utiliser toute la syntaxe _Markdown_ et même du _HTML_ si on veut, ou encore du $Latex$.

FlashMD calcule automatiquement la taille de police optimale pour que le texte reste dans le cadre !

On peut insérer des images hébergées en ligne avec la syntaxe Markdown classique : `![](URL_de_l_image)`. Mais on peut aussi coller une image directement dans l'éditeur, elle sera alors convertie en _base64_ et intégrée dans le Markdown. Attention cependant à la longueur du fichier qui peut vite devenir importante.

### Conversion magique

Vous pouvez essayer de créer automatiquement des flashcards à partir d'un document à vous ou d'un site web, même si le texte n'est pas structuré en Markdown au format de FlashMD.

Si le texte a une structure reconnaissable, FlashMD pourra le convertir automatiquement en flashcards.

Pour cela, il faut copier votre texte, puis le coller dans l'éditeur de FlashMD en utilisant le raccourci clavier `Ctrl + Maj + V` (ou `Cmd + Maj + V` sur Mac).

Cela ne fonctionne pas toujours, mais cela peut être pratique dans certains cas !


### Changer la couleur des cartes ?
Sur la ligne juste avant le titre de la carte, on écrit `fond: couleur`.


### Images, Latex, labels …

On peut aussi insérer des images avec la syntaxe Markdown classique : `![](URL_de_l_image)`.

On peut aussi avoir des ++labels++ sur le recto de la flashcard (en haut et en bas à droite).

Les labels sont pratiques pour indiquer une classe, un numéro de chapitre …

Pour cela, on utilise un titre de niveau 3 pour un label en haut à droite et un titre de niveau 4 pour un label en bas à droite.

```
### Label en haut à droite
#### Label en bas à droite
```

## Enregistrer et partager ses cartes

### Enregistrer ses cartes

FlashMD n'enregistre pas les cartes, il faut donc copier-coller le texte de ses cartes dans un éditeur de texte pour les conserver.

[CodiMD](https://codimd.apps.education.fr/) sur le portail AppsEdu permet de sauvegarder des documents en Markdown et de les partager. On peut aussi utiliser : [Digipage](https://digipage.app/) ou [Hedgedoc](https://demo.hedgedoc.org/). L'intérêt est que les élèves peuvent y avoir accès sans créer de comptes.

Cela permet non seulement d'avoir une sauvegarde de ses cartes, mais aussi de les partager facilement en ligne, et de les modifier à tout moment sans avoir à changer l'URL de partage.

### Partager ses cartes

On copie l'URL de son fichier et les cartes seront visibles à l'adresse suivante :

`https://flashmd.forge.apps.education.fr/?e=0#URLsource`

Le paramètre `e=0` cache par défaut l'éditeur.

### Partage en mode révision

Si vous mettez dans l'URL le paramètre `?révision`, vous partagerez directement vos flashcards en mode “révision”.

Vous pouvez ajouter : `&aléatoire` pour afficher les cartes de manière aléatoire et `&uneparune` pour afficher seulement une carte à la fois.

Exemple : `https://flashmd.forge.apps.education.fr/?révision&aléatoire&uneparune#URL`






