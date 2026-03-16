import helpCartesMD from "./helpers/helpCartesMD.md";
import helpFlashMD from "./helpers/helpFlashMD.md";
import { markdownToHTML } from "../../processMarkdown/markdownToHTML";
import { loadCSS } from "../../utils/urls";

export function helpButton(options) {
	const helpButtonElement = document.getElementById("helpButton");
	// Si on clique sur le bouton d'aide, on toggle l'affichage d'une modale, qui contient une documentation, présente dans le fichier 'helpers/help.md', qu'on convertir en HTML et dont on affiche le résultat dans la modale
	let isModalOpen = false;
	if (helpButtonElement) {
		helpButtonElement.addEventListener("click", async (event) => {
			event.preventDefault();
			let modal = document.querySelector(".modal");
			if (!isModalOpen) {
				// On crée la modale si elle n'existe pas
				if (!modal) {
					loadCSS("css/helpModal.min.css", "helpModal");
					modal = document.createElement("div");
					modal.classList.add("modal");
					const modalContent = document.createElement("div");
					modalContent.classList.add("modal-content");
					modal.appendChild(modalContent);
					document.body.appendChild(modal);
					const helpMarkdown =
						options && options.isFlashMd ? helpFlashMD : helpCartesMD;
					const helpHTML = markdownToHTML(helpMarkdown);
					modalContent.innerHTML = helpHTML;
					// Il va y avoir plusieurs onglets dans la modale, correspondant chacun à un titre h2 de la documentation. Lorsqu'on clique sur un onglet, on affiche la partie de la documentation correspondante et on cache les autres parties. Par défaut, on affiche la première partie de la documentation
					// Il faut transformer le HTML pour créer ces sections d'onglets
					const sections = modalContent.querySelectorAll("h2");
					const tabsContainer = document.createElement("div");
					tabsContainer.classList.add("tabs-container");
					const contentContainer = document.createElement("div");
					contentContainer.classList.add("content-container");
					sections.forEach((section, index) => {
						const tabButton = document.createElement("button");
						tabButton.textContent = section.textContent;
						tabButton.classList.add("tab-button");
						if (index === 0) {
							tabButton.classList.add("active");
						}
						tabsContainer.appendChild(tabButton);
						const contentSection = document.createElement("div");
						contentSection.classList.add("content-section");
						if (index === 0) {
							contentSection.style.display = "block";
							contentSection.classList.add("active");
						} else {
							contentSection.style.display = "none";
						}
						let nextSibling = section.nextElementSibling;
						while (nextSibling && nextSibling.tagName !== "H2") {
							contentSection.appendChild(nextSibling);
							nextSibling = section.nextElementSibling;
						}
						contentContainer.appendChild(contentSection);
						tabButton.addEventListener("click", () => {
							const allTabButtons =
								tabsContainer.querySelectorAll(".tab-button");
							allTabButtons.forEach((button) => {
								button.classList.remove("active");
							});
							tabButton.classList.add("active");
							const allContentSections =
								contentContainer.querySelectorAll(".content-section");
							allContentSections.forEach((section) => {
								section.style.display = "none";
								section.classList.remove("active");
							});
							contentSection.style.display = "block";
							contentSection.classList.add("active");
						});
					});
					// On ajoute un bouton de fermeture de la modale en haut à droite du contenu de la modale
					modalContent.innerHTML = "";
					const closeButton = document.createElement("button");
					closeButton.textContent = "✖";
					closeButton.classList.add("close-button");
					closeButton.addEventListener("click", () => {
						modal.style.display = "none";
						isModalOpen = false;
					});
					// On place de bouton de fermeture dans une div qui est positionnée en haut à droite du contenu de la modale
					const closeButtonContainer = document.createElement("div");
					closeButtonContainer.classList.add("close-button-container");
					closeButtonContainer.appendChild(closeButton);
					modalContent.appendChild(closeButtonContainer);
					modalContent.appendChild(tabsContainer);
					modalContent.appendChild(contentContainer);
					// Si on clique en dehors du contenu de la modale, on ferme la modale
					modal.addEventListener("click", (event) => {
						if (event.target === modal) {
							modal.style.display = "none";
							isModalOpen = false;
						}
					});
				}
				modal.style.display = "flex";
				isModalOpen = true;
			} else {
				if (modal) {
					modal.style.display = "none";
				}
				isModalOpen = false;
			}
		});
	}
}
