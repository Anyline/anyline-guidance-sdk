export default class ImageManager {
	private static instance: ImageManager | null = null;
	private static blob: Blob | null = null;
	private static blobPromise: Promise<Blob> | null = null;
	private static resolveBlobPromise: ((blob: Blob) => void) | null = null;

	public static getInstance(): ImageManager {
		if (ImageManager.instance === null) {
			ImageManager.instance = new ImageManager();
		}
		return ImageManager.instance;
	}

	public setImageBlob(file: File): void {
		if (ImageManager.blob == null) {
			ImageManager.blob = file;
			if (ImageManager.resolveBlobPromise != null) {
				ImageManager.resolveBlobPromise(ImageManager.blob);
				ImageManager.blobPromise = null;
				ImageManager.resolveBlobPromise = null;
			}
		}
	}

	public async getImageBlob(): Promise<Blob> {
		if (ImageManager.blob != null) {
			return await Promise.resolve(ImageManager.blob);
		} else if (ImageManager.blobPromise == null) {
			ImageManager.blobPromise = new Promise<Blob>(resolve => {
				ImageManager.resolveBlobPromise = resolve;
			});
		}
		return await ImageManager.blobPromise;
	}

	public destroy(): void {
		ImageManager.instance = null;
		ImageManager.blob = null;
		ImageManager.blobPromise = null;
		ImageManager.resolveBlobPromise = null;
	}
}
