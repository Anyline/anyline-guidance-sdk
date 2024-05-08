import createBottomSection from './bottomSection';
import createButtonElement from './button';
import createCloseElement from './close';
import { createFileInputElement } from './fileInput';
import createInstructionElement from './instruction';
import createOverlayElement from './overlay';
import css from './index.module.css';
import StreamManager from '../../modules/StreamManager';
import createSpinner from './spinner';

export default function createContainerElement(): HTMLDivElement {
	const container = document.createElement('div');
	container.className = css.container;

	const spinner = createSpinner();
	container.appendChild(spinner);

	const streamManager = StreamManager.getInstance();

	streamManager.onStreamSet(() => {
		container.removeChild(spinner);

		// attach tire overlay
		const overlayElement = createOverlayElement();

		// attach close sdk button
		const closeElement = createCloseElement();

		// create instructions
		const instructionsElement = createInstructionElement();

		// create capture button
		const captureButton = createButtonElement();

		// attach bottom section
		const bottomSection = createBottomSection(
			instructionsElement,
			captureButton
		);

		// attach fileInput
		const fileInputElement = createFileInputElement();

		container.appendChild(overlayElement);
		container.appendChild(closeElement);
		container.appendChild(bottomSection);
		container.appendChild(fileInputElement);
	});

	return container;
}
