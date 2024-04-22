import { type ImageMetadata } from './init';

export async function getImageSpecification(
	blob: Blob
): Promise<ImageMetadata> {
	const img = new Image();
	const blobUrl = URL.createObjectURL(blob);
	img.src = blobUrl;

	return await new Promise((resolve, reject) => {
		img.addEventListener('load', () => {
			try {
				const metadata: ImageMetadata = {
					width: img.width,
					height: img.height,
					fileSize: blob.size / 1000,
				};
				resolve(metadata);
			} catch (err) {
				reject(err);
			}
		});
	});
}
