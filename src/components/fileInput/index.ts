export function createFileInputElement(
	container: HTMLDivElement
): HTMLInputElement {
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = 'image/*';
	fileInput.capture = 'camera';
	fileInput.style.display = 'none';

	container.appendChild(fileInput);

	return fileInput;
}
