import css from './index.module.css';

export default function createVideoElementWithStream(
	container: HTMLElement,
	stream: MediaStream
): void {
	const video = document.createElement('video');
	video.setAttribute('data-test-id', 'videoElement');
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.srcObject = stream;
	setTimeout(() => {
		video.className = css.video;
	}, 300);

	container.appendChild(video);
}
