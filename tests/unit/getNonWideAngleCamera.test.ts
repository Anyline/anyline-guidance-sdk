import { getNonWideAngleCamera } from '../../src/camera/getNonWideAngleCamera';

describe('getNonWideAngleCamera', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('throws an error when getUserMedia promise is rejected', async () => {
		Object.defineProperty(global.navigator, 'mediaDevices', {
			writable: true,
			value: {
				getUserMedia: jest
					.fn()
					.mockRejectedValue(new Error('Permission Denied')),
				enumerateDevices: jest.fn().mockResolvedValue([
					{
						kind: 'audioInput',
					},
				]),
			},
		});

		await expect(getNonWideAngleCamera()).rejects.toThrow(
			'Permission Denied'
		);
	});

	it('throws an error when no video devices are found', async () => {
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
				enumerateDevices: jest.fn().mockResolvedValue([
					{
						kind: 'audioInput',
					},
				]),
			},
		});

		await expect(getNonWideAngleCamera()).rejects.toThrow(
			'No video device found'
		);
	});

	it('selects last back camera on Android', async () => {
		jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValue(
			'android'
		);
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
				enumerateDevices: jest.fn().mockResolvedValue([
					{ kind: 'videoinput', label: 'front camera 1' },
					{ kind: 'videoinput', label: 'rear camera 1' },
					{ kind: 'videoinput', label: 'front camera 2' },
					{ kind: 'videoinput', label: 'rear camera 2' },
				]),
			},
		});

		const camera = await getNonWideAngleCamera();
		await expect(camera.label).toEqual('rear camera 2');
	});

	it('finds a back camera on ios', async () => {
		jest.spyOn(global.navigator, 'userAgent', 'get').mockReturnValue('ios');
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
				enumerateDevices: jest.fn().mockResolvedValue([
					{ kind: 'videoinput', label: 'Facetime HD' },
					{ kind: 'videoinput', label: 'Rückkamera' },
					{ kind: 'videoinput', label: 'Back Telephoto Camera' },
				]),
			},
		});

		const camera = await getNonWideAngleCamera();
		await expect(camera.label).toEqual('Rückkamera');
	});
});
