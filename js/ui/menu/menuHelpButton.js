import helpCartesMD from "./helpers/helpCartesMD.md";
import helpFlashMD from "./helpers/helpFlashMD.md";
import { markdownToHTML } from "../../processMarkdown/markdownToHTML";

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
					modal = document.createElement("div");
					modal.classList.add("modal");
					const modalContent = document.createElement("div");
					modalContent.classList.add("modal-content");
					// Styles CSS de base pour la modale
					// Attention : la modale doit passer au dessus de tous les autres contenus, y compris les éléments en position:absolute
					modal.style.zIndex = "9999";
					modal.style.position = "fixed";
					modal.style.top = "0";
					modal.style.left = "0";
					modal.style.width = "100%";
					modal.style.height = "100%";
					modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
					modal.style.justifyContent = "center";
					modal.style.alignItems = "center";
					modalContent.style.backgroundColor = "white";
					modalContent.style.maxWidth = "1400px";
					modalContent.style.fontSize = "24px";
					modalContent.style.width = "90%";
					modalContent.style.height = "90vh";
					modalContent.style.display = "flex";
					modalContent.style.flexDirection = "column";
					modalContent.style.borderRadius = "8px";
					modalContent.style.boxShadow = "0 10px 30px #0003";
					modalContent.style.overflow = "hidden";
					modalContent.style.padding = "20px";
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
					tabsContainer.style.borderBottom = "1px solid #CCC";
					const contentContainer = document.createElement("div");
					contentContainer.classList.add("content-container");
					contentContainer.style.overflowY = "auto";
					contentContainer.style.fontSize = "0.95em";
					sections.forEach((section, index) => {
						const tabButton = document.createElement("button");
						tabButton.style.background = "transparent";
						tabButton.style.border = "none";
						tabButton.style.padding = "0.5rem 0.75rem";
						tabButton.style.cursor = "pointer";
						tabButton.style.font = "inherit";
						tabButton.style.borderBottom = "2px solid transparent";
						tabButton.textContent = section.textContent;
						tabButton.classList.add("tab-button");
						if (index === 0) {
							tabButton.classList.add("active");
							tabButton.style.borderBottomColor = "#007bff";
							tabButton.style.fontWeight = "600";
						}
						tabsContainer.appendChild(tabButton);
						const contentSection = document.createElement("div");
						contentSection.classList.add("content-section");
						contentSection.style.padding = "1rem";
						if (index === 0) {
							contentSection.style.display = "block";
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
								button.style.borderBottomColor = "transparent";
								button.style.fontWeight = "normal";
							});
							tabButton.classList.add("active");
							tabButton.style.borderBottomColor = "#007bff";
							tabButton.style.fontWeight = "600";
							const allContentSections =
								contentContainer.querySelectorAll(".content-section");
							allContentSections.forEach((section) => {
								section.style.display = "none";
							});
							contentSection.style.display = "block";
						});
					});
					// On ajoute un bouton de fermeture de la modale en haut à droite du contenu de la modale
					modalContent.innerHTML = "";
					const closeButton = document.createElement("button");
					closeButton.textContent = "✖";
					closeButton.style.background = "transparent";
					closeButton.style.border = "none";
					closeButton.style.fontSize = "24px";
					closeButton.style.cursor = "pointer";
					closeButton.style.width = "fit-content";
					closeButton.addEventListener("click", () => {
						modal.style.display = "none";
						isModalOpen = false;
					});
					// On place de bouton de fermeture dans une div qui est positionnée en haut à droite du contenu de la modale
					const closeButtonContainer = document.createElement("div");
					closeButtonContainer.style.display = "flex";
					closeButtonContainer.style.justifyContent = "flex-end";
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
