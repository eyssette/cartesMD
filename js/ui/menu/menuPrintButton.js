import { yaml } from "../../processMarkdown/yaml";
import { printCards } from "../events/eventPrint";
import { loadCSS } from "../../utils/urls";

export function printButton() {
	const printButtonElement = document.getElementById("printButton");
	if (!printButtonElement) return;

	printButtonElement.addEventListener("click", (event) => {
		event.preventDefault();
		openPrintModal();
	});
}

export function openPrintModal() {
	loadCSS("css/printModal.min.css", "printModal");

	const overlay = document.createElement("div");
	overlay.id = "printModalOverlay";
	overlay.className = "printModal-overlay";
	overlay.innerHTML = `
		<div class="printModal" role="dialog" aria-modal="true" aria-label="Options d'impression">
			<div class="printModal-header">
				<h2>Options d'impression</h2>
				<button class="printModal-close" aria-label="Fermer">✕</button>
			</div>
			<form class="printModal-form" id="printForm">
				<fieldset>
					<legend>Format de sortie</legend>
					<label><input type="radio" name="format" value="a4" checked> A4</label>
					<label><input type="radio" name="format" value="card"> Taille de la carte</label>
				</fieldset>
				<fieldset id="a4Options">
					<legend>Options A4</legend>
					<div class="printModal-row">
						<label>
							<input type="checkbox" name="rectoVerso" id="rectoVersoCheckbox">
							Impression recto-verso (recto-verso)
						</label>
					</div>
					<p id="rectoVersoInfo" class="printModal-info" hidden>
						Les cartes sont regroupées&nbsp;: N rectos sur une page, puis N versos sur la suivante.
					</p>
				</fieldset>
				<div class="printModal-actions">
					<button type="button" class="printModal-cancel">Annuler</button>
					<button type="submit" class="printModal-submit">🖨 Imprimer</button>
				</div>
			</form>
		</div>
	`;

	document.body.appendChild(overlay);
	requestAnimationFrame(() => overlay.classList.add("show"));

	const form = overlay.querySelector("#printForm");
	const a4Options = overlay.querySelector("#a4Options");
	const rectoVersoCheckbox = overlay.querySelector("#rectoVersoCheckbox");
	const rectoVersoInfo = overlay.querySelector("#rectoVersoInfo");

	// Si le YAML indique que les cartes n'ont pas de verso, on masque d'emblée les options A4 et recto-verso
	if (yaml && yaml.verso === false) {
		a4Options.hidden = true;
		rectoVersoCheckbox.checked = false;
		rectoVersoCheckbox.disabled = true;
		rectoVersoInfo.hidden = true;
	}

	// Masquer les options A4 quand "taille de la carte" est sélectionné
	form.querySelectorAll('[name="format"]').forEach((radio) => {
		radio.addEventListener("change", () => {
			a4Options.hidden = radio.value === "card";
		});
	});

	// Afficher/masquer l'info rectoVerso
	rectoVersoCheckbox.addEventListener("change", () => {
		rectoVersoInfo.hidden = !rectoVersoCheckbox.checked;
	});

	const close = () => {
		overlay.classList.remove("show");
		setTimeout(() => overlay.remove(), 250);
	};

	overlay.querySelector(".printModal-close").addEventListener("click", close);
	overlay.querySelector(".printModal-cancel").addEventListener("click", close);
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) close();
	});

	const onKeydown = (e) => {
		if (e.key === "Escape") {
			close();
			document.removeEventListener("keydown", onKeydown);
		}
	};
	document.addEventListener("keydown", onKeydown);

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = new FormData(form);

		const rectoVerso =
			(yaml && yaml.rectoVerso === true) || rectoVersoCheckbox.checked;
		let cardsPerPage = parseInt(data.get("cardsPerPage")) || 4;
		let landscape = true;
		const format = data.get("format");
		const isFlashCardTheme = yaml.theme && yaml.theme.includes("flashcard");

		// Ajustement du nombre de cartes et de la disposition en fonction des options
		if ((yaml && yaml.verso === false) || rectoVerso) {
			cardsPerPage = 9 * 2;
			landscape = false; // forcer le mode portrait si pas de verso
		} else {
			cardsPerPage = 8;
		}
		if (isFlashCardTheme) {
			landscape = false;
			if ((yaml && yaml.verso === false) || rectoVerso) {
				landscape = true;
				cardsPerPage = 9 * 2;
			}
		}

		const printOptions = {
			format: format,
			cardsPerPage: cardsPerPage,
			rectoVerso: rectoVerso,
			landscape: landscape,
		};
		document.removeEventListener("keydown", onKeydown);
		close();
		setTimeout(() => printCards(printOptions), 300);
	});
}
