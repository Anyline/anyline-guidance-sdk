import overlaySrc from './overlay.svg';
import css from './index.module.css';

export default function createOverlayElement(
	container: HTMLElement,
	instructionElement: HTMLElement
): void {
	const overlayWrapper = document.createElement('div');
	overlayWrapper.className = css.overlayWrapper;

	const overlay = document.createElement('img');
	overlay.src = overlaySrc;
	overlay.className = css.overlay;

	overlayWrapper.appendChild(overlay);
	overlayWrapper.appendChild(instructionElement);

	container.appendChild(overlayWrapper);
}
