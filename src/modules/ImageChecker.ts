import preProcessImage from '../lib/preProcessImage';

export default class ImageChecker {
	private static instance: ImageChecker | null = null;
	private blob: Blob | null = null;
	private readonly blobSetPromise: Promise<Blob>;
	private blobSetResolve: ((blob: Blob) => void) | null = null;

	private constructor() {
		this.blobSetPromise = new Promise<Blob>(resolve => {
			this.blobSetResolve = resolve;
		});
	}

	public static getInstance(): ImageChecker {
		if (ImageChecker.instance === null) {
			ImageChecker.instance = new ImageChecker();
		}
		return ImageChecker.instance;
	}

	public setImageBlob(blob: Blob): void {
		if (this.blob == null) {
			this.blob = blob;
			if (this.blobSetResolve != null) {
				this.blobSetResolve(this.blob);
			}
		}
	}

	public onBlobSet(callback: (blob: Blob) => Promise<void>): void {
		void this.blobSetPromise.then(async () => {
			if (this.blob !== null) await callback(this.blob);
		});
	}

	public async isImageQualityGood(): Promise<boolean> {
		if (this.blob === null) throw new Error('No image to process');
		try {
			const { isBlurDetected, isContrastLow } = await preProcessImage(
				this.blob
			);
			return !(isBlurDetected || isContrastLow);
		} catch (err) {
			return true;
		}
	}

	public destroy(): void {
		ImageChecker.instance = null;
		this.blob = null;
	}
}
