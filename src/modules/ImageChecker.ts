import preProcessImage from '../lib/preProcessImage';

export default class ImageChecker {
	private static instance: ImageChecker | null = null;
	private blob: Blob | null = null;

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

	public async isImageQualityGood(): Promise<boolean> {
		if (this.blob === null) throw new Error('No image to process');
		const { isBlurDetected, isContrastLow, isEdgeDetected } =
			await preProcessImage(this.blob);

		return (
			!(isBlurDetected ?? false) &&
			(isEdgeDetected ?? false) &&
			!(isContrastLow ?? false)
		);
	}

	public destroy(): void {
		ImageChecker.instance = null;
	}
}
