import createInstructionElement from '../instruction';
import createOverlayElement from '../overlay';
import createVideoElementWithStream from '../video';
import css from './index.module.css';

export default function createContainerElemenet(
	stream: MediaStream
): HTMLElement {
	// container for video, overlay, instruction and button
	const container = document.createElement('div');
	container.className = css.container;

	createVideoElementWithStream(container, stream);

	const instructionElement = createInstructionElement(container);
	createOverlayElement(container, instructionElement);
	// createButtonElement(container);

	return container;
}
