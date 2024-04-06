import getImage from '../index';

describe('getImage', () => {
	it('rejects for unsupported devices', async () => {
		await expect(getImage({ videoElementId: 'video1' })).rejects.toThrow(
			'Unsupported device'
		);
	});

	it('rejects when no video element with given id was found', async () => {
		document.getElementById = jest.fn().mockReturnValue(null);
		Object.defineProperty(global.navigator, 'mediaDevices', {
			writable: true,
			value: {
				getUserMedia: jest.fn(),
				enumerateDevices: jest.fn().mockResolvedValue([
					{
						kind: 'audioInput',
						label: 'Back Camera',
						deviceId: 'backCamera1',
						groupId: 'testGroup1',
					},
				]),
			},
		});
		await expect(getImage({ videoElementId: 'video1' })).rejects.toThrow(
			`No video element with id video1 was found in the DOM`
		);
	});
});
