import css from './index.module.css';
import StreamManager from '../../../modules/StreamManager';
import { getNonWideAngleCamera } from '../../../camera/getNonWideAngleCamera';

export default async function createVideoElementWithStream(
	container: HTMLElement
): Promise<HTMLVideoElement> {
	const video = document.createElement('video');
	video.setAttribute('data-test-id', 'videoElement');
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.className = css.video;

	const device = await getNonWideAngleCamera();
	const streamManager = StreamManager.getInstance();
	const stream = await streamManager.getStream(device);
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
