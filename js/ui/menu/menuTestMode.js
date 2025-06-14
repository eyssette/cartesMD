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

function handleTestMode(editorElement, options) {
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
			isTestMode = !isTestMode;
			options.isTestMode = isTestMode;
			toggleVerso(options.isTestMode);
			handleTestMode(editorElement, options);
		});
	}
}
