import { getNonWideAngleCamera } from '../../../camera/getNonWideAngleCamera';
import Router from '../../../modules/Router';
import StreamManager from '../../../modules/StreamManager';
import VideoManager from '../../../modules/VideoManager';
import createContainerElement from '../../videoStream';
import css from '../../videoStream/button/index.module.css';

export default function createStartCaptureProcessButton(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;
	const button = document.createElement('button');
	button.className = css.button;
	button.innerText = 'Start capture process';
	button.type = 'button';

	button.onclick = async () => {
		const router = Router.getInstance();
		const container = createContainerElement();
		router.push(container);

		const videoManager = VideoManager.getInstance();
		const videoElement = videoManager.getVideoElement();

		videoManager.onMount(async () => {
			const device = await getNonWideAngleCamera();
			const streamManager = StreamManager.getInstance();
			const stream = await streamManager.getStream(device);
			videoElement.srcObject = stream;
		});

		container.appendChild(videoElement);
	};

	buttonWrapper.appendChild(button);
	return buttonWrapper;
}
