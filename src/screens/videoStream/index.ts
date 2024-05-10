import createBottomSection from './bottomSection';
import createButtonElement from './button';
import createCloseElement from './close';
import createInstructionElement from './instruction';
import createOverlayElement from './overlay';
import css from './index.module.css';
import StreamManager from '../../modules/StreamManager';
import createSpinner from './spinner';
import ComponentManager from '../../modules/ComponentManager';
import { getNonWideAngleCamera } from '../../camera/getNonWideAngleCamera';
import VideoManager from '../../modules/VideoManager';

export default class VideoStreamScreen extends ComponentManager {
	constructor() {
		super();
		const container = super.getElement();

		container.className = css.container;

		// initially show loader
		const spinner = createSpinner();
		container.appendChild(spinner);

		super.onMount(async () => {
			const device = await getNonWideAngleCamera();
			const streamManager = StreamManager.getInstance();
			const stream = await streamManager.getStream(device);
			const videoManager = VideoManager.getInstance();
			const videoElement = videoManager.getVideoElement();
			videoElement.srcObject = stream;

			// create tire overlay
			const overlayElement = createOverlayElement();

			// create close sdk button
			const closeElement = createCloseElement();

			// create instructions
			const instructionsElement = createInstructionElement();

			// create capture button
			const captureButton = createButtonElement();

			// create bottom section
			const bottomSection = createBottomSection(
				instructionsElement,
				captureButton
			);

			// hide loader
			container.removeChild(spinner);

			container.appendChild(videoElement);
			container.appendChild(overlayElement);
			container.appendChild(closeElement);
			container.appendChild(bottomSection);
		});
	}
}
