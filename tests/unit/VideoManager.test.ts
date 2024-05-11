import VideoManager from '../../src/modules/VideoManager';

describe('VideoManager', () => {
	it('should always return the same instance', () => {
		const instance1 = VideoManager.getInstance();
		const instance2 = VideoManager.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should return a video element', async () => {
		const videoManager = VideoManager.getInstance();
		const videoElement = videoManager.getVideoElement();

		void expect(videoElement).toBeInstanceOf(HTMLVideoElement);
	});

	it('should destory the video and clear the instance', () => {
		const videoManager = VideoManager.getInstance();
		void expect(VideoManager.getInstance()).toBe(videoManager);
		videoManager.destroy();
		void expect(VideoManager.getInstance()).not.toBe(videoManager);
	});
});
