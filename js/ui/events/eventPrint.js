import { yaml } from "../../processMarkdown/yaml";

export async function printCards(options) {
	const {
		format = "a4",
		landscape = true,
		cardsPerPage = 4,
		rectoVerso = false,
	} = options || {};

	const cardElements = [
		...document.querySelectorAll("#content .cardBackAndFront"),
	];

	if (cardElements.length === 0) return;

	const pages = buildPages(cardElements, {
		format,
		cardsPerPage,
		rectoVerso,
	});

	if (pages.length === 0) return;

	// Construire le conteneur d'impression (invisible à l'écran via inline style,
	// rendu visible en impression par print.css avec display:block !important)
	let container = document.getElementById("printContainer");
	if (container) container.remove();

	container = document.createElement("div");
	container.id = "printContainer";
	container.style.display = "none";

	const isFlashCardTheme =
		yaml && yaml.theme && yaml.theme.includes("flashcard");

	pages.forEach((pageFaces) => {
		const page = document.createElement("div");
		let pageClass =
			"printPage printPage--" +
			(format === "card" ? "card" : "a4") +
			(isFlashCardTheme ? " printPage--flashcard" : "") +
			(rectoVerso ? " printPage--rectoVerso" : "");
		if (format !== "card" && !rectoVerso) pageClass += " printPage--a4-simple";
		page.className = pageClass;

		if (format !== "card" && !rectoVerso) {
			// Mode A4 simple : regrouper recto+verso dans un même élément
			for (let i = 0; i < pageFaces.length; i += 2) {
				const pair = document.createElement("div");
				pair.className = "printCardPair";
				for (let j = i; j < Math.min(i + 2, pageFaces.length); j++) {
					const wrapper = document.createElement("div");
					const parentCard = pageFaces[j].closest(".cardBackAndFront");
					const parentClasses = parentCard
						? [...parentCard.classList].join(" ")
						: "";
					wrapper.className =
						"printCardWrapper" + (parentClasses ? " " + parentClasses : "");
					wrapper.appendChild(pageFaces[j].cloneNode(true));
					pair.appendChild(wrapper);
				}
				page.appendChild(pair);
			}
		} else {
			pageFaces.forEach((face) => {
				const parentCard =
					face._sourceCard || face.closest(".cardBackAndFront");
				// On récupère les classes du parent .cardBackAndFront pour les appliquer au wrapper d'impression, afin de conserver les styles spécifiques (ex: thème flashcard), sauf la classe "cardBackAndFront" elle-même qui n'est pas pertinente pour l'impression
				let parentClasses = parentCard
					? [...parentCard.classList]
							.filter((cls) => cls !== "cardBackAndFront")
							.join(" ")
					: "";

				if (face._sourceCard) {
					// Flashcard rectoVerso : la face reconstituée devient directement le wrapper
					face.className =
						"printCardWrapper" +
						(parentClasses ? " " + parentClasses : "") +
						" " +
						face.className;
					page.appendChild(face);
				} else {
					const wrapper = document.createElement("div");
					wrapper.className =
						"printCardWrapper" + (parentClasses ? " " + parentClasses : "");
					wrapper.appendChild(face.cloneNode(true));
					page.appendChild(wrapper);
				}
			});
		}

		container.appendChild(page);
	});

	document.body.appendChild(container);

	// Injecter la taille de page dans le <style id="printPageSize"> présent dans index.html
	const pageStyle = document.getElementById("printPageSize");
	if (pageStyle) {
		pageStyle.textContent =
			format === "card"
				? isFlashCardTheme
					? "@page { size: 90mm 58mm; margin: 0;}"
					: "@page { size: 58mm 90mm; margin: 0;}"
				: landscape
					? "@page { size: A4 landscape; margin: 10mm; }"
					: "@page { size: A4 portrait; margin: 10mm; }";
	}

	window.print();

	window.addEventListener(
		"afterprint",
		() => {
			//container.remove();
			//if (pageStyle) pageStyle.textContent = "";
		},
		{ once: true },
	);
}

// Fonction pour inverser les lignes d'un tableau d'éléments, en gardant l'ordre des éléments dans chaque ligne, utilisée pour le mode rectoVerso
function reverseRowsForVerso(arr, cols) {
	const result = [];
	for (let i = 0; i < arr.length; i += cols) {
		result.push(...arr.slice(i, i + cols).reverse());
	}
	return result;
}

function buildPages(cardElements, { format, cardsPerPage, rectoVerso }) {
	let N = parseInt(cardsPerPage) || 4;
	const pages = [];
	const isFlashCardTheme =
		yaml && yaml.theme && yaml.theme.includes("flashcard");

	if (format === "card" && !isFlashCardTheme) {
		// Une face par page, ordre : recto1, verso1, recto2, verso2, …
		cardElements.forEach((cardEl) => {
			const front = cardEl.querySelector(".cardFront");
			const back = cardEl.querySelector(".cardBack");
			pages.push([front]);
			if (yaml && yaml.verso === false) {
				// Si le yaml indique que les cartes n'ont pas de verso, on n'ajoute pas les versos
				return;
			}
			pages.push([back]);
		});
	} else if (rectoVerso || (format === "card" && isFlashCardTheme)) {
		// condition pour remixer les éléments HTML des cartes = soit rectoVerso (pour remixer l'ordre), soit sortie au format de la carte, mais pour les flashcards (pour sélectionner les éléments recto et les éléments verso)

		// A4 rectoVerso : N rectos sur une page, puis N versos sur la suivante
		N = isFlashCardTheme && !rectoVerso ? N : N / 2; // diviser par 2 car recto et verso sont séparés
		if (isFlashCardTheme && format === "card") N = 1;
		for (let i = 0; i < cardElements.length; i += N) {
			const group = cardElements.slice(i, i + N);
			if (isFlashCardTheme) {
				const isFlashCardSimpleTheme =
					yaml && yaml.theme && yaml.theme.includes("flashcard-simple");
				// Reconstituer le recto et le verso à partir des éléments spécifiques au thème flashcard
				const fronts = group.map((el) => {
					const face = document.createElement("div");
					face.className = "cardFront";
					face.classList.add("card");
					face._sourceCard = el;
					// On applique les styles du recto à la face reconstituée, pour éviter les problèmes de styles liés au fait que les éléments sont déplacés dans un autre conteneur pour l'impression
					const frontEl = el.querySelector(".cardFront");
					face.setAttribute("style", frontEl.getAttribute("style") || "");
					// Les éléments à prendre pour le recto et le verso dépendent du thème flashcard utilisé
					const frontElements = isFlashCardSimpleTheme
						? [".cardTitle.z1", ".cardSubtitle.z3", "footer.z5"]
						: [".cardTitle.z1", ".cardContentUp.z2", "footer.z5"];
					for (const sel of frontElements) {
						const part = el.querySelector(sel);
						if (part) face.appendChild(part.cloneNode(true));
					}
					return face;
				});
				const backs = group.map((el) => {
					const face = document.createElement("div");
					face.className = "cardBack";
					face.classList.add("card");
					face._sourceCard = el;
					// On applique les styles du verso à la face reconstituée, pour éviter les problèmes de styles liés au fait que les éléments sont déplacés dans un autre conteneur pour l'impression
					const backEl = el.querySelector(".cardBack");
					face.setAttribute("style", backEl.getAttribute("style") || "");
					// Les éléments à prendre pour le recto et le verso dépendent du thème flashcard utilisé
					const backElements = isFlashCardSimpleTheme
						? [".cardContentUp.z2"]
						: [".cardSubtitle.z3", ".cardContentDown.z4", ".cardBack"];
					for (const sel of backElements) {
						const part = el.querySelector(sel);
						if (part) face.appendChild(part.cloneNode(true));
					}
					return face;
				});
				if (fronts.length > 0) pages.push(fronts);
				if (yaml && yaml.verso === false) {
					// Si le yaml indique que les cartes n'ont pas de verso, on n'ajoute pas les versos
					continue;
				}
				if (backs.length > 0)
					pages.push(rectoVerso ? reverseRowsForVerso(backs, 3) : backs);
			} else {
				const fronts = group
					.map((el) => el.querySelector(".cardFront"))
					.filter(Boolean);
				const backs = group
					.map((el) => el.querySelector(".cardBack"))
					.filter(Boolean);
				if (fronts.length > 0) pages.push(fronts);
				if (backs.length > 0)
					pages.push(rectoVerso ? reverseRowsForVerso(backs, 3) : backs);
			}
		}
	} else {
		// A4 simple : F1, B1, F2, B2, … regroupés par N
		const allFaces = [];
		cardElements.forEach((el) => {
			const front = el.querySelector(".cardFront");
			const back = el.querySelector(".cardBack");
			if (front) allFaces.push(front);
			if (back) allFaces.push(back);
		});
		for (let i = 0; i < allFaces.length; i += N) {
			pages.push(allFaces.slice(i, i + N));
		}
	}

	return pages;
}
