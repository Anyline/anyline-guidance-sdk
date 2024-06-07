import init from '../../src/index';
import ImageManager from '../../src/modules/ImageManager';

describe('init', () => {
	it('throw an error for unsupported devices', () => {
		void expect(() => {
			init(
				{},
				{
					onComplete: () => {
						//
					},
				}
			);
		}).toThrow('Unsupported device');
	});

	describe('init with valid device', () => {
		beforeEach(() => {
			Object.defineProperty(global.navigator, 'mediaDevices', {
				writable: true,
				value: {
					getUserMedia: jest.fn().mockResolvedValue({
						getTracks: jest.fn().mockReturnValue([
							{
								getSettings: jest.fn().mockReturnValue({
									width: 7680,
									height: 4320,
								}),
								stop: jest.fn(),
							},
						]),
					}),
					enumerateDevices: jest.fn().mockResolvedValue([
						{ kind: 'videoinput', label: 'Facetime HD' },
						{ kind: 'videoinput', label: 'Rückkamera' },
						{ kind: 'videoinput', label: 'Back Telephoto Camera' },
					]),
				},
			});
		});

		it('should call onComplete callback when image is set', () => {
			const onComplete = jest.fn();
			init(
				{},
				{
					onComplete: ({ blob }) => {
						onComplete();
						void expect(onComplete).toHaveBeenCalled();
					},
				}
			);
			void expect(onComplete).not.toHaveBeenCalled();
			const file = new File([''], 'filename');
			const imageManager = ImageManager.getInstance();
			imageManager.setImageBlob(file);
		});
	});
});
