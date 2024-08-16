import { editor } from "./initializeEditor";

export function updateEditorContent(markdownContent) {
	editor.updateCode(markdownContent);
}
