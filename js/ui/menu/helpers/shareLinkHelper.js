import { loadCSS } from "../../../utils/urls";
import { editor } from "../../editor/initializeEditor";

export async function createShareLinkModal(
	url = new URL(window.location.href),
) {
	// on ouvre une modale pour proposer à l'utilisateur, soit d'indiquer l'URL de ses flashcards (option par défaut déjà cochée), soit de créer un lien de partage pour le contenu actuel (avec un avertissement pour indiquer que ce lien ne permettra pas de changer le contenu des flashcards).
	// Si l'utilisateur choisit d'indiquer l'URL de ses flaschards, on utilise ce hash pour la suite de la création du lien de partage
	// Si l'utilisateur choisir de créer un lien de partage, on ajoute le paramètre "raw" au lien de partage, et on encode le contenu actuel avec : window.btoa(encodeURIComponent(content))
	const overlay = document.createElement("div");
	overlay.className = "shareLinkModalOverlay";
	overlay.innerHTML = `
		<div class="shareLinkModal" role="dialog" aria-modal="true" aria-label="Créer un lien de partage">
			<div class="shareLinkModal-header">
				<h2>Créer un lien de partage</h2>
				<button class="shareLinkModal-close" aria-label="Fermer">✕</button>
			</div>
			<form class="shareLinkModal-form" id="shareLinkForm">
				<fieldset>
					<legend>Choisissez une option</legend>
					<label><input type="radio" name="shareOption" value="url" checked> Indiquer l'URL de mes flashcards (recommandé)</label>
					<label><input type="text" name="customUrl" placeholder="Entrez l'URL de vos flashcards" style="margin-top:8px; margin-left:20px;"> </label>
					<label><input type="radio" name="shareOption" value="content"> Créer un lien de partage pour le contenu actuel (attention&nbsp;: ce lien ne permettra pas de changer le contenu des flashcards)</label>
				</fieldset>
				<div class="shareLinkModal-actions">
					<button type="button" class="shareLinkModal-cancel">Annuler</button>
					<button type="submit" class="shareLinkModal-submit">Créer le lien de partage</button>
				</div>
			</form>
		</div>
	`;
	// On ajoute des styles CSS
	loadCSS("css/shareLinkModal.min.css", "shareLinkModal");

	document.body.appendChild(overlay);
	requestAnimationFrame(() => overlay.classList.add("show"));

	const form = overlay.querySelector("#shareLinkForm");
	const closeButton = overlay.querySelector(".shareLinkModal-close");
	const cancelButton = overlay.querySelector(".shareLinkModal-cancel");

	function closeModal() {
		overlay.classList.remove("show");
		setTimeout(() => {
			document.body.removeChild(overlay);
		}, 300);
	}

	closeButton.addEventListener("click", closeModal);
	cancelButton.addEventListener("click", closeModal);

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const shareOption = form.elements["shareOption"].value;
		if (shareOption === "url") {
			// On récupère l'URL indiquée par l'utilisateur et on l'utilise comme hash pour la suite de la création du lien de partage
			const customUrl = form.elements["customUrl"].value.trim();
			if (customUrl) {
				url.hash = customUrl;
			} else {
				alert(
					"Veuillez entrer une URL valide ou choisir l'option de création de lien de partage pour le contenu actuel.",
				);
				return;
			}
		} else if (shareOption === "content") {
			// Si l'utilisateur choisit de créer un lien de partage pour le contenu actuel, on ajoute le paramètre "raw" au lien de partage, et on encode le contenu actuel de l'éditeur dans le hash
			const content = editor.toString();
			url.searchParams.set("raw", "1");
			url.hash = window.btoa(encodeURIComponent(content));
		}
		navigator.clipboard.writeText(url.toString()).then(() => {
			alert("Lien de partage copié dans le presse-papiers !");
			closeModal();
		});
	});
}
