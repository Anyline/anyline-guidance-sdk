import createInstructionElement from '../instruction';
import createOverlayElement from '../overlay';
import createVideoElementWithStream from '../video';
import css from './index.module.css';

export default function createContainerElement(
	stream: MediaStream
): HTMLElement {
	const container = document.createElement('div');
	container.className = css.container;

	const borderOverlay = document.createElement('div');
	borderOverlay.className = css.borderOverlay;

	container.appendChild(borderOverlay);

	createVideoElementWithStream(container, stream);

	const instructionElement = createInstructionElement(container);
	createOverlayElement(container, instructionElement);

	return container;
}
