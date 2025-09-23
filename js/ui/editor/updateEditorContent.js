import { editor } from "./initializeEditor";
import { removeMultilineHtmlComments } from "../../utils/strings";

let firstTime = true;

export function updateEditorContent(markdownContent) {
	if (firstTime) {
		markdownContent = removeMultilineHtmlComments(markdownContent);
		firstTime = false;
	}
	editor.updateCode(markdownContent);
}
