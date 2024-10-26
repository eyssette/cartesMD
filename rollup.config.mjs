import terser from "@rollup/plugin-terser";
import { string } from "rollup-plugin-string";
import postcss from "rollup-plugin-postcss";
import cssnano from "cssnano";

export default {
	input: "js/main.js",
	output: {
		file: "script.min.js",
		format: "iife",
		plugins: [terser()],
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
			include: ["css/printRectoVerso.css"],
			extract: "css/printRectoVerso.min.css",
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
