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

export function launchTestMode(editorElement, options) {
	const testModeButton = document.getElementById("testModeButton");
	testModeButton.style.display = "block";
	testModeButton.addEventListener("click", () => {
		isTestMode = !isTestMode;
		setTimeout(() => {
			eventClick({ isTestMode: true });
		}, 2000);
		toggleVerso(isTestMode);
		if (isTestMode) {
			hideEditor(editorElement, options);
		} else {
			showEditor(editorElement, options);
		}
	});
}
