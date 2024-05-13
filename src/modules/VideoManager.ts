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

	public getVideoElement(): HTMLVideoElement {
		return this.videoElement;
	}

	public destroy(): void {
		VideoManager.instance = null;
	}
}
