export function createFileInputElement(): HTMLInputElement {
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = 'image/*';
	fileInput.capture = 'camera';
	fileInput.style.display = 'none';

	return fileInput;
}
