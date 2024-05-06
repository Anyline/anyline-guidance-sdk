import createBottomSection from '../bottomSection';
import createButtonElement from '../button';
import createCloseElement from '../close';
import { createFileInputElement } from '../fileInput';
import createInstructionElement from '../instruction';
import createOverlayElement from '../overlay';
import createVideoElementWithStream from '../video';
import css from './index.module.css';

export default async function createContainerElement(
	stream: MediaStream
): Promise<{
	container: HTMLElement;
	captureButton: HTMLDivElement;
	fileInputElement: HTMLInputElement;
}> {
	const container = document.createElement('div');
	container.className = css.container;

	// attach video
	const videoElement = await createVideoElementWithStream(container, stream);

	// attach tire overlay
	createOverlayElement(container, videoElement);

	// attach close sdk button
	createCloseElement(stream, container);

	// create instructions
	const instructionsElement = createInstructionElement();

	// create capture button
	const captureButton = createButtonElement();

	// attach bottom section
	createBottomSection(instructionsElement, captureButton, container);

	// attach fileInput
	const fileInputElement = createFileInputElement(container);

	return { container, captureButton, fileInputElement };
}
