function changeImageFormat(imageElement) {
	imageElement.src = imageElement.src.replace(".avif", ".jpg");
}

export function changeImageFormatIfError() {
	const images = document.querySelectorAll('img[src$=".avif"]');
	for (const image of images) {
		image.addEventListener("error", (error) => {
			console.log(error);
			changeImageFormat(image);
		});
	}
}
