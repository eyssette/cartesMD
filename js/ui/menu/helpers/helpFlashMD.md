## Qu'est-ce que FlashMD ?

### Un outil libre et gratuit !

FlashMD est un outil libre et gratuit, créé par [Cédric Eyssette](https://eyssette.forge.apps.education.fr/), qui permet de faire des flashcards et de les réviser en ligne !

Si vous voulez faire des cartes plus complexes, destinées à être imprimées, vous pouvez utiliser [CartesMD](https://cartesmd.forge.apps.education.fr/).

### Mode révision

FlashMD est particulièrement adapté pour faire des flashcards de révision, avec un recto pour la question et un verso pour la réponse.

Pour rentrer dans le mode révision, on clique dans le menu en haut à gauche sur l'icône “éprouvette”, afin de se tester : 🧪

On pourra alors cliquer sur le recto d'une carte pour vérifier si on a la bonne réponse.

On peut aussi ajouter des paramètres à l'URL pour partager directement en mode révision des cartes (voir l'onglet “Enregistrer et partager ses cartes”).

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

On peut utiliser ++toute++ la _syntaxe_ ==Markdown== et même du <span style="color: darkred;">HTML</span> si on veut, ou encore du $Latex$.

FlashMD calcule automatiquement la taille de police optimale pour rester dans le cadre !


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

On peut utiliser [CodiMD](https://codimd.apps.education.fr/) sur le portail AppsEdu ou un outil équivalent (Digipage, Framapad…)

Vous pourrez alors afficher et partager vos cartes ainsi :

`https://flashmd.forge.apps.education.fr/?e=0#URLsource`

Le paramètre `e=0` cache par défaut l'éditeur.

### Partage en mode révision

Si vous mettez dans l'URL le paramètre `?révision`, vous partagerez directement vos flashcards en mode “révision”.

Vous pouvez ajouter : `&aléatoire` pour afficher les cartes de manière aléatoire et `&uneparune` pour afficher seulement une carte à la fois.

Exemple : `https://flashmd.forge.apps.education.fr/?révision&aléatoire&uneparune#URL`






