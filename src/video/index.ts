import css from './index.module.css';

export default function createVideoElementWithStream(
	container: HTMLElement,
	stream: MediaStream
): void {
	const video = document.createElement('video');
	video.className = css.video;
	video.setAttribute('data-test-id', 'videoElement');
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.srcObject = stream;

	container.appendChild(video);
}
