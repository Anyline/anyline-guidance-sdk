import css from '../screens/videoStream/video/index.module.css';

export default class VideoManager {
	public videoElement: HTMLVideoElement;
	private static instance: VideoManager | null = null;
	private readonly observer: MutationObserver | null = null;
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

	public onPlay(callback: () => void): void {
		if (this.videoElement.readyState >= 3) {
			callback();
		} else {
			this.videoElement.onplay = callback;
		}
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

		VideoManager.instance = null;
	}
}
