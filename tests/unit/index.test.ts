import init from '../../src/index';

describe('init', () => {
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

		jest.restoreAllMocks();
	});
});
