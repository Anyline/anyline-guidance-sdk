/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/unbound-method */
import StreamManager from '../../src/modules/StreamManager';

describe('StreamManager', () => {
	beforeEach(() => {
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
					.mockResolvedValue([
						{ kind: 'videoinput', label: 'rear camera 2' },
					]),
			},
		});
	});

	it('should always return the same instance', () => {
		const instance1 = StreamManager.getInstance();
		const instance2 = StreamManager.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should initialize a stream with the given device', async () => {
		const streamManager = StreamManager.getInstance();

		const testDevice = {
			deviceId: 'test-device-id',
			groupId: 'test',
			kind: 'videoinput' as MediaDeviceKind,
			label: 'test',
		};
		const device: MediaDeviceInfo = {
			...testDevice,
			toJSON: () => ({ ...testDevice }),
		};

		const stream = await streamManager.getStream(device);
		void expect(stream.getTracks).toBeDefined();
		void expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
			video: {
				deviceId: {
					exact: testDevice.deviceId,
				},
				aspectRatio: {
					exact: 4 / 3,
				},
			},
		});
	});

	it('should destroy the stream and clear the instance', async () => {
		const streamManager = StreamManager.getInstance();
		const mockTrack = { stop: jest.fn() };
		const mockStream = {
			getTracks: jest.fn().mockReturnValue([mockTrack]),
		};
		streamManager['stream'] = mockStream as unknown as MediaStream;

		streamManager.destroy();

		void expect(mockTrack.stop).toHaveBeenCalled();
		void expect(mockStream.getTracks).toHaveBeenCalled();
		void expect(StreamManager.getInstance()).not.toBe(streamManager);
	});

	it('should call onStreamSet callback only when stream is set', async () => {
		const streamManager = StreamManager.getInstance();
		const mockCallback = jest.fn();

		streamManager.onStreamSet(mockCallback);

		const testDevice = {
			deviceId: 'test-device-id',
			groupId: 'test',
			kind: 'videoinput' as MediaDeviceKind,
			label: 'test',
		};
		const device: MediaDeviceInfo = {
			...testDevice,
			toJSON: () => ({ ...testDevice }),
		};

		void expect(mockCallback).not.toHaveBeenCalled();

		await streamManager.getStream(device);

		void expect(mockCallback).toHaveBeenCalled();
	});
});
