import css from '../screens/videoStream/video/index.module.css';

export default class VideoManager {
	public videoElement: HTMLVideoElement;
	private static instance: VideoManager | null = null;
	private observer: MutationObserver | null = null;
	private resizeObserver: ResizeObserver | null = null;

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
		this.observer = new MutationObserver((mutationsList, observer) => {
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

		this.observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	public onChangeDimension(
		callback: (width: number, height: number) => void
	): void {
		this.resizeObserver = new ResizeObserver(entries => {
			for (const entry of entries) {
				if (entry.target === this.videoElement) {
					callback(entry.contentRect.width, entry.contentRect.height);
				}
			}
		});

		this.resizeObserver.observe(this.videoElement);
	}

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}

	public destroy(): void {
		if (this.observer != null) {
			this.observer.disconnect();
		}
		if (this.resizeObserver != null) {
			this.resizeObserver.disconnect();
		}

		if (this.videoElement.parentNode != null) {
			this.videoElement.parentNode.removeChild(this.videoElement);
		}

		VideoManager.instance = null;
	}
}
