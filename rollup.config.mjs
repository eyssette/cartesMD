import terser from "@rollup/plugin-terser";
import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";

const ECMA_VERSION = 2018;
const optionsTerser = { ecma: ECMA_VERSION };

// On supprime certains messages d'erreurs qu'affiche Rollup et qui ne sont pas très utiles
const onwarn = (warning) => {
	if (warning.code === "THIS_IS_UNDEFINED") {
		// On désactive le message d'erreur affiché à cause du module showdown
		return;
	}
	console.warn(`(!) ${warning.message}`);
};

export default {
	input: "js/main.js",
	onwarn,
	output: {
		file: "script.min.js",
		format: "iife",
		plugins: [terser(optionsTerser)],
		sourcemap: true,
	},
	plugins: [
		string({
			include: "*.md",
		}),
		postcss({
			extensions: [".css"],
			include: ["css/styles.css"],
			extract: "css/styles.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
		postcss({
			extensions: [".css"],
			include: ["css/admonitions.css"],
			extract: "css/admonitions.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
		postcss({
			extensions: [".css"],
			include: ["css/editorHighlight.css"],
			extract: "css/editorHighlight.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
		postcss({
			extensions: [".css"],
			include: ["css/print.css"],
			extract: "css/print.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
		postcss({
			extensions: [".css"],
			include: ["css/backImageColors.css"],
			extract: "css/backImageColors.min.css",
			minimize: true,
			plugins: [
				cssnano({
					preset: "default",
				}),
			],
		}),
	],
};
