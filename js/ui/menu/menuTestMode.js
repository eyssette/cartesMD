import { yaml } from "../../processMarkdown/yaml";
import { showEditor, hideEditor } from "./menuShowOrHideEditor";
import { eventClick } from "../events/eventClick";

function toggleVerso(isTestMode) {
	if (isTestMode) {
		document.body.classList.add("noVerso", "isTestMode");
		yaml.verso = false;
	} else {
		document.body.classList.remove("noVerso", "isTestMode");
		yaml.verso = true;
	}
}
let isTestMode = false;

let isRandomMode = false;
function toggleRandomMode() {
	isRandomMode = !isRandomMode;
	const randomButton = document.getElementById("randomButton");
	// Si on est en mode aléatoire, on va mettre les cartes dans un ordre aléatoire
	// Sinon, on les remet dans l'ordre normal
	if (isRandomMode) {
		// On mélange les cartes qui sont dans l'élément #content
		const cards = Array.from(document.querySelectorAll(".cardBackAndFront"));
		cards.sort(() => Math.random() - 0.5);
		const contentElement = document.getElementById("content");
		// On les réinsère dans le DOM dans l'ordre mélangé
		cards.forEach((card) => contentElement.appendChild(card));
		// On change l'emoji du bouton pour qu'il affiche l'action de remettre les cartes dans l'ordre normal
		randomButton.textContent = "🔢";
		randomButton.title = "Afficher les cartes dans l'ordre normal";
	} else {
		// On remet les cartes dans l'ordre normal
		const cards = Array.from(document.querySelectorAll(".cardBackAndFront"));
		cards.sort((a, b) => {
			// L'index est dans l'id. Par exemple : id="card-1"
			const aIndex = parseInt(a.id.split("-")[1]);
			const bIndex = parseInt(b.id.split("-")[1]);
			return aIndex - bIndex;
		});
		const contentElement = document.getElementById("content");
		cards.forEach((card) => contentElement.appendChild(card));
		// On change l'emoji du bouton pour qu'il affiche l'action de mélanger les cartes

		randomButton.textContent = "🔀";
		randomButton.title = "Afficher les cartes dans un ordre aléatoire";
	}
}

function goToNextCard(currentIndex) {
	const cards = document.querySelectorAll(".cardBackAndFront");
	if (currentIndex < cards.length - 1) {
		// On passe à la carte suivante
		currentIndex += 1;
	} else {
		// Si on est à la dernière carte, on revient à la première
		currentIndex = 0;
	}
	// On affiche la carte courante et on cache les autres
	cards.forEach((card, index) => {
		if (index === currentIndex) {
			card.style.display = "flex";
		} else {
			card.style.display = "none";
		}
	});
	return currentIndex;
}

let isSequentialMode = false;
function toggleSequentialMode() {
	isSequentialMode = !isSequentialMode;
	// Si on est en mode séquentiel, on affiche une carte à la fois
	// Sinon, on affiche toutes les cartes
	const cards = document.querySelectorAll(".cardBackAndFront");
	if (isSequentialMode) {
		// On affiche une carte à la fois, en commençant par la première
		cards.forEach((card, index) => {
			if (index === 0) {
				card.style.display = "flex";
			} else {
				card.style.display = "none";
			}
		});
		// On ajoute en dessous de la carte un bouton "Suivant" pour passer à la carte suivante
		const contentElement = document.getElementById("content");
		const nextButton = document.createElement("button");
		nextButton.id = "nextButton";
		nextButton.textContent = "Suivant";
		nextButton.style.display = "block";
		nextButton.style.margin = "1em auto";
		// On insère ce bouton dans un div après #content
		const nextButtonContainer = document.createElement("div");
		nextButtonContainer.style.textAlign = "center";
		nextButtonContainer.appendChild(nextButton);
		contentElement.parentNode.insertBefore(
			nextButtonContainer,
			contentElement.nextSibling,
		);
		let currentIndex = 0;
		nextButton.addEventListener("click", () => {
			currentIndex = goToNextCard(currentIndex);
		});
		// On change le texte du bouton pour qu'il affiche l'action d'afficher toutes les cartes
		const sequentialButton = document.getElementById("sequentialButton");
		sequentialButton.textContent = "📚";
		sequentialButton.title = "Afficher toutes les cartes";
	} else {
		cards.forEach((card) => {
			card.style.display = "flex";
		});
		// On supprime le bouton "Suivant"
		const nextButton = document.getElementById("nextButton");
		if (nextButton) {
			nextButton.parentNode.remove();
		}
		// On change le texte du bouton pour qu'il affiche l'action d'afficher une carte à la fois
		const sequentialButton = document.getElementById("sequentialButton");
		sequentialButton.textContent = "1️⃣";
		sequentialButton.title = "Afficher une carte à la fois";
	}
}

function createTestModeMenu() {
	// Si la barre de menu existe déjà, on ne la recrée pas
	if (document.getElementById("testModeMenu")) {
		return;
	}
	// On va insérer une barre de menu avec des boutons pour différents modes de tests
	const menuBar = document.createElement("div");
	menuBar.id = "testModeMenu";
	// Styles CSS pour la barre de menu
	menuBar.style.display = "flex";
	menuBar.style.justifyContent = "center";
	menuBar.style.gap = "2em";
	// Contenu de la barre : un bouton pour afficher de manière alétoire les cartes, un bouton pour afficher seulement une carte à la fois (avec passage automatique à la suivante)
	const randomButton = document.createElement("button");
	randomButton.id = "randomButton";
	randomButton.textContent = "🔀";
	randomButton.title = "Afficher les cartes dans un ordre aléatoire";
	menuBar.appendChild(randomButton);
	const sequentialButton = document.createElement("button");
	sequentialButton.id = "sequentialButton";
	sequentialButton.textContent = "1️⃣";
	sequentialButton.title = "Afficher une carte à la fois";
	menuBar.appendChild(sequentialButton);
	// Styles CSS pour les boutons
	[randomButton, sequentialButton].forEach((button) => {
		button.style.fontSize = "3em";
		button.style.border = "none";
		button.style.background = "transparent";
	});

	// Si on clique sur le bouton random, on toggle l'affichage aléatoire des cartes
	randomButton.addEventListener("click", () => {
		toggleRandomMode();
	});

	// Si on clique sur le bouton sequential, on toggle l'affichage séquentiel des cartes une par une
	sequentialButton.addEventListener("click", () => {
		toggleSequentialMode();
	});

	// On insère cette barre de menu entre #editor et #content
	const contentElement = document.getElementById("content");
	contentElement.parentNode.insertBefore(menuBar, contentElement);

	// Si dans les paramètres de l'URL, on a le mode aléatoire ou le mode séquentiel qui sont activés, on les active directement, et on cache la barre de menu pour ne pas laisser l'utilisateur changer de mode
	const urlParams = new URLSearchParams(window.location.search);
	if (
		urlParams.has("random") ||
		urlParams.has("aléatoire") ||
		urlParams.has("aleatoire")
	) {
		// On attend que les cartes soient affichées pour activer le mode aléatoire
		// On vérifie toutes les 100ms si les cartes sont affichées, et dès qu'elles le sont, on active le mode aléatoire
		const intervalId = setInterval(() => {
			const cards = document.querySelectorAll(".cardBackAndFront");
			if (cards.length > 0) {
				setTimeout(() => {
					toggleRandomMode();
				}, 100);
				clearInterval(intervalId);
			}
		}, 100);
		menuBar.style.display = "none";
	}
	if (urlParams.has("sequential") || urlParams.has("uneparune")) {
		// On attend que les cartes soient affichées pour activer le mode séquentiel
		// On vérifie toutes les 100ms si les cartes sont affichées, et dès qu'elles le sont, on active le mode séquentiel
		const intervalId = setInterval(() => {
			const cards = document.querySelectorAll(".cardBackAndFront");
			if (cards.length > 0) {
				setTimeout(() => {
					toggleSequentialMode();
				}, 100);
				clearInterval(intervalId);
			}
		}, 100);
		menuBar.style.display = "none";
	}
}

function handleTestMode(editorElement, options) {
	if (options.isTestMode || options.isTestModeFromParams) {
		createTestModeMenu();
	} else {
		// On supprime la barre de menu si elle existe
		const menuBar = document.getElementById("testModeMenu");
		if (menuBar) {
			menuBar.remove();
		}
		// On supprime le bouton "Suivant" s'il existe
		const nextButton = document.getElementById("nextButton");
		if (nextButton) {
			nextButton.parentNode.remove();
		}
	}
	eventClick({ isTestMode: options.isTestMode });
	if (
		options.isTestMode ||
		options.isSmallScreen ||
		options.hideEditorByDefault
	) {
		hideEditor(editorElement, options);
	} else {
		showEditor(editorElement, options);
	}
}

export function launchTestMode(editorElement, options) {
	if (options.isTestModeFromParams) {
		handleTestMode(editorElement, options);
		isTestMode = true;
	} else {
		const testModeButton = document.getElementById("testModeButton");
		testModeButton.style.display = "block";
		testModeButton.addEventListener("click", () => {
			isTestMode = !document.body.classList.contains("isTestMode");
			options.isTestMode = isTestMode;
			toggleVerso(options.isTestMode);
			handleTestMode(editorElement, options);
		});
	}
}
