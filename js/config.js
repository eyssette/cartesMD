// Raccourcis vers des cartes particulières
export const shortcuts = [["shortcut", "URL"]];

export const corsProxy = "https://corsproxy.io/?url=";

export const CSSthemes = [
	"iaconelli.css",
	"z2small.css",
	"z2small-bluegradient-withlogo.css",
	"flashcard.css",
	"flashcard-simple.css",
	"persona.css",
];

export const colorWords = [
	"blue",
	"bleu",
	"violet",
	"vert",
	"green",
	"orange",
	"rouge",
	"red",
	"jaune",
	"yellow",
	"marron",
	"brown",
	"rose",
	"pink",
	"gris",
];

// Gestion des add-ons
export const allowedAddOns = {
	pako: { js: "js/externals/pako.min.js" },
	kroki: {
		js: "js/externals/kroki.js",
		css: "<style>.krokiImage{display:block;object-fit:scale-down!important;height:85%!important;width:100%!important;margin:auto;margin-top:1em;}.cardContentUp .krokiImage{max-height:120px} .cardContentDown .krokiImage{max-height:130px} .theme-flashcard-simple .cardContentUp .krokiImage{max-height:180px}</style>",
	},
};

export const addOnsDependencies = {
	kroki: ["pako"],
};
