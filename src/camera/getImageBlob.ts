export async function getImageBlob(): Promise<Blob> {
	return await new Promise((resolve, reject) => {
		const inputElement = document.createElement('input');
		inputElement.type = 'file';
		inputElement.accept = 'image/*';
		inputElement.capture = 'camera';
		inputElement.click();

		inputElement.onchange = function (event) {
			const fileInput = event.target as HTMLInputElement;
			if (fileInput.files != null && fileInput.files.length > 0) {
				const file = fileInput.files[0];
				if (file !== undefined && file !== null) {
					resolve(file);
				} else {
					reject(new Error('No file selected'));
				}
			}
		};
	});
}
