import css from './index.module.css';

export default async function createVideoElementWithStream(
	container: HTMLElement,
	stream: MediaStream
): Promise<HTMLVideoElement> {
	const video = document.createElement('video');
	video.setAttribute('data-test-id', 'videoElement');
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.className = css.video;
	video.srcObject = stream;

	container.appendChild(video);

	return await new Promise((resolve, reject) => {
		if (video.readyState >= 3) {
			resolve(video);
		} else {
			video.addEventListener('canplay', () => {
				resolve(video);
			});
		}
	});
}
