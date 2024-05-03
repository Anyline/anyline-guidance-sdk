import createButtonElement from '../button';
import createCloseElement from '../close';
import { createFileInputElement } from '../fileInput';
import createInstructionElement from '../instruction';
import createOverlayElement from '../overlay';
import createVideoElementWithStream from '../video';
import css from './index.module.css';

export default function createContainerElement(stream: MediaStream): {
	container: HTMLElement;
	captureButton: HTMLButtonElement;
	fileInputElement: HTMLInputElement;
} {
	const container = document.createElement('div');
	container.className = css.container;

	// attach video
	createVideoElementWithStream(container, stream);

	// attach tire overlay
	createOverlayElement(container);

	// attach instructions
	createInstructionElement(container);

	// attach close sdk button
	createCloseElement(stream, container);

	// attach capture button
	const captureButton = createButtonElement(container);

	// attach fileInput

	const fileInputElement = createFileInputElement(container);

	return { container, captureButton, fileInputElement };
}
