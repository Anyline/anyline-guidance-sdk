import css from '../screens/videoStream/video/index.module.css';

export default class VideoManager {
	public videoElement: HTMLVideoElement;
	private static instance: VideoManager | null = null;

	private constructor() {
		this.videoElement = document.createElement('video');
		this.videoElement.autoplay = true;
		this.videoElement.playsInline = true;
		this.videoElement.muted = true;
		this.videoElement.className = css.video;
	}

	public static getInstance(): VideoManager {
		if (VideoManager.instance === null) {
			VideoManager.instance = new VideoManager();
		}
		return VideoManager.instance;
	}

	public onMount(callback: () => Promise<void>): void {
		const observer = new MutationObserver((mutationsList, observer) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					const addedNodes = Array.from(mutation.addedNodes);
					if (addedNodes.includes(this.videoElement)) {
						void callback();
						observer.disconnect();
						break;
					}
				}
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });
	}

	public onChangeDimension(
		callback: (width: number, height: number) => void
	): void {
		const resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.target === this.videoElement) {
					callback(entry.contentRect.width, entry.contentRect.height);
				}
			}
		});

		resizeObserver.observe(this.videoElement);
	}

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}
}
