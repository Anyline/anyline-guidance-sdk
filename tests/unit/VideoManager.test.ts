import VideoManager from '../../src/modules/VideoManager';

describe('VideoManager', () => {
	it('should always return the same instance', () => {
		const instance1 = VideoManager.getInstance();
		const instance2 = VideoManager.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should return a video element', async () => {
		const videoManager = VideoManager.getInstance();
		const mockCallback = jest.fn();
		videoManager.onMount(mockCallback);

		const videoElement = videoManager.getVideoElement();

		void expect(videoElement).toBeInstanceOf(HTMLVideoElement);
	});

	it('should call onMount callback when videoElement is added to the DOM', async () => {
		const videoManager = VideoManager.getInstance();
		const mockCallback = jest.fn();
		videoManager.onMount(mockCallback);

		document.body.appendChild(videoManager.getVideoElement());

		void expect(mockCallback).not.toHaveBeenCalled();

		await new Promise(resolve => setTimeout(resolve, 0));

		void expect(mockCallback).toHaveBeenCalled();
	});
});
