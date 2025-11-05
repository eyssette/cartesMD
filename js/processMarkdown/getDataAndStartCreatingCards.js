import defaultMD from "../../index.md";
import { handleURL } from "../utils/urls";
import { initializeApp } from "./initializeApp";

let md = defaultMD;

async function fetchMarkdown(source) {
	const response = await fetch(source);
	if (!response.ok) {
		throw new Error(`Erreur lors de la récupération du fichier : ${source}`);
	}
	return await response.text();
}

export async function getDataAndStartCreatingCards() {
	const editorElement = document.getElementById("editor");
	const isSmallScreen = window.innerWidth <= 500;
	const hash = window.location.hash.substring(1);
	const urlParams = new URLSearchParams(document.location.search);
	const isFlashMd =
		window.location.href.includes("https://flashmd.forge.apps.education.fr") ||
		window.location.href.includes("?flashmd");

	// Configuration initiale
	if (isSmallScreen) editorElement.style.display = "none";
	if (isFlashMd) {
		document.querySelector("h1").textContent = "FlashMD";
		document.title = "FlashMD";
	}

	let options = { isFlashMd, isSmallScreen };
	const useRawSource = urlParams.get("raw");
	let sourceMarkdown = "";

	if (useRawSource) {
		md = decodeURIComponent(window.atob(hash));
	} else {
		sourceMarkdown = handleURL(hash, { useCorsProxy: false });
		if (sourceMarkdown === "" && isFlashMd) {
			sourceMarkdown = "index-flashmd.md";
		}
	}

	try {
		if (sourceMarkdown && !useRawSource) {
			md = await fetchMarkdown(sourceMarkdown);
		}
		await initializeApp(md, editorElement, urlParams, options);
	} catch (error) {
		console.error(error);
		try {
			sourceMarkdown = handleURL(hash + ".md", { useCorsProxy: false });
			md = await fetchMarkdown(sourceMarkdown);
			await initializeApp(md, editorElement, urlParams, options);
		} catch (error) {
			try {
				console.error(error);
				sourceMarkdown = handleURL(hash, { useCorsProxy: true });
				md = await fetchMarkdown(sourceMarkdown);
				if (md.trim().startsWith("<!DOCTYPE html>") || !md.includes("# ")) {
					throw new Error(
						"Erreur lors de l'initialisation de l'application. La source n'est pas un fichier Markdown",
					);
				}
				await initializeApp(md, editorElement, urlParams, options);
			} catch (error) {
				console.error(error);
				alert(
					"Il y a une erreur dans l'URL ou dans la syntaxe du fichier source. Merci de vous assurer que le fichier est bien accessible et qu'il respecte les règles d'écriture de CartesMD",
				);
				await initializeApp(defaultMD, editorElement, urlParams, options);
			}
		}
	}
}
