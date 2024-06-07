import preProcessImage from '../lib/preProcessImage';

export default class ImageChecker {
	private static instance: ImageChecker | null = null;
	public blob: Blob | null = null;

	private constructor() {}

	public static getInstance(): ImageChecker {
		if (ImageChecker.instance === null) {
			ImageChecker.instance = new ImageChecker();
		}
		return ImageChecker.instance;
	}

	public setImageBlob(blob: Blob): void {
		this.blob = blob;
	}

	public getImageBlob(): Blob {
		if (this.blob === null) throw new Error('No image found');
		return this.blob;
	}

	public async isImageQualityGood(): Promise<boolean> {
		if (this.blob === null) throw new Error('No image to process');
		try {
			const { isBlurDetected, isContrastLow, isEdgeDetected } =
				await preProcessImage(this.blob);
			return !isBlurDetected && isEdgeDetected && !isContrastLow;
		} catch (err) {
			return true;
		}
	}

	public destroy(): void {
		ImageChecker.instance = null;
	}
}
