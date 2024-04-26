import init from '../../src/index';
import injectCSS from '../../src/lib/injectCSS';

describe('init', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	it('rejects for unsupported devices', async () => {
		await expect(init()).rejects.toThrow('Unsupported device');
	});

	it('throws an error when enumeratedevices rejects promise', async () => {
		Object.defineProperty(global.navigator, 'mediaDevices', {
			writable: true,
			value: {
				getUserMedia: jest.fn().mockResolvedValue({
					getTracks: jest.fn().mockReturnValue([
						{
							getSettings: jest
								.fn()
								.mockReturnValue({ width: 7680, height: 4320 }),
							stop: jest.fn(),
						},
					]),
				}),
				enumerateDevices: jest
					.fn()
					.mockRejectedValue(new Error('Access denied')),
			},
		});

		await expect(init()).rejects.toThrow('Access denied');
	});

	it('calls injectCSS upon init', async () => {
		try {
			await init();
		} catch (err) {}
		await expect(injectCSS).toHaveBeenCalledTimes(1);
	});
});
