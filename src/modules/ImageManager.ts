export default class ImageManager {
	private static instance: ImageManager | null = null;
	private blob: Blob | null = null;
	private blobSetCallback: ((blob: Blob) => void) | null = null;

	public static getInstance(): ImageManager {
		if (ImageManager.instance === null) {
			ImageManager.instance = new ImageManager();
		}
		return ImageManager.instance;
	}

	public setImageBlob(file: Blob): void {
		if (this.blob == null) {
			this.blob = file;
			if (this.blobSetCallback != null) {
				this.blobSetCallback(this.blob);
			}
		}
	}

	public onBlobSet(callback: (blob: Blob) => void): void {
		this.blobSetCallback = callback;
	}

	public destroy(): void {
		ImageManager.instance = null;
		this.blob = null;
		this.blobSetCallback = null;
	}
}
