export async function getImageBlob(
	fileInputElement: HTMLInputElement
): Promise<Blob> {
	fileInputElement.click();

	return await new Promise((resolve, reject) => {
		fileInputElement.addEventListener('change', event => {
			const fileInput = event.target as HTMLInputElement;
			if (fileInput.files != null && fileInput.files.length > 0) {
				const file = fileInput.files[0];
				if (file !== undefined && file !== null) {
					resolve(file);
				} else {
					reject(new Error('No file selected'));
				}
			}
		});
	});
}
