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
	setTimeout(() => {
		eventClick({ isTestMode: options.isTestMode });
	}, 2000);
	toggleVerso(options.isTestMode);
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
	const testModeButton = document.getElementById("testModeButton");
	testModeButton.style.display = "block";
	if (options.isTestMode) {
		setTimeout(() => {
			handleTestMode(editorElement, options);
			isTestMode = true;
		}, 1000);
	}
	testModeButton.addEventListener("click", () => {
		isTestMode = !isTestMode;
		options.isTestMode = isTestMode;
		handleTestMode(editorElement, options);
	});
}
