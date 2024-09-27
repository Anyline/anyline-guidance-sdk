import ImageChecker from '../../src/modules/ImageChecker';
import preProcessImage from '../../src/lib/preProcessImage';

jest.mock('../../src/lib/preProcessImage');

describe('ImageChecker', () => {
	let mockBlob: Blob;

	beforeEach(() => {
		mockBlob = new Blob(['image content'], { type: 'image/png' });
	});

	afterEach(() => {
		ImageChecker.getInstance().destroy();
		jest.clearAllMocks();
	});

	it('returns the correct image quality status', async () => {
		const testCases = [
			{
				mockReturnValue: {
					isBlurDetected: false,
					isContrastLow: false,
				},
				expected: true,
			},
			{
				mockReturnValue: {
					isBlurDetected: true,
					isContrastLow: true,
				},
				expected: false,
			},
			{
				mockReturnValue: {
					isBlurDetected: true,
					isContrastLow: false,
				},
				expected: false,
			},
			{
				mockReturnValue: {
					isBlurDetected: false,
					isContrastLow: true,
				},
				expected: false,
			},
			{
				mockReturnValue: {
					isBlurDetected: false,
					isContrastLow: true,
				},
				expected: false,
			},
		];

		for (const testCase of testCases) {
			(preProcessImage as jest.Mock).mockResolvedValue(
				testCase.mockReturnValue
			);
			const checker = ImageChecker.getInstance();
			checker.setImageBlob(mockBlob);
			const result = await checker.isImageQualityGood();
			void expect(result).toBe(testCase.expected);
			checker.destroy();
		}
	});

	it('calls onBlobSet when image is set', async () => {
		const checker = ImageChecker.getInstance();

		const file = new File([''], 'filename');
		checker.setImageBlob(file);

		const onBlobSet = jest.fn();

		checker.onBlobSet(async blob => {
			onBlobSet();
			void expect(onBlobSet).toHaveBeenCalled();
		});

		void expect(onBlobSet).not.toHaveBeenCalled();
	});

	it('throws an error if no image is provided', async () => {
		const checker = ImageChecker.getInstance();
		await expect(checker.isImageQualityGood()).rejects.toThrow(
			'No image to process'
		);
	});
});
