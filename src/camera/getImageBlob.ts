export async function getImageBlob(): Promise<Blob> {
	const inputElement = document.createElement('input');
	inputElement.type = 'file';
	inputElement.accept = 'image/*';
	inputElement.capture = 'camera';
	inputElement.click();
	inputElement.style.display = 'none';

	document.body.appendChild(inputElement);

	return await new Promise((resolve, reject) => {
		inputElement.addEventListener('change', event => {
			const fileInput = event.target as HTMLInputElement;
			if (fileInput.files != null && fileInput.files.length > 0) {
				const file = fileInput.files[0];
				if (file !== undefined && file !== null) {
					document.body.removeChild(inputElement);
					resolve(file);
				} else {
					document.body.removeChild(inputElement);
					reject(new Error('No file selected'));
				}
			}
		});
	});
}
