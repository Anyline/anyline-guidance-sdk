import overlaySrc from './overlay.svg';
import css from './index.module.css';

export default function createOverlayElement(
	container: HTMLElement,
	videoElement: HTMLVideoElement
): void {
	const overlayWrapper = document.createElement('div');
	overlayWrapper.className = css.overlayWrapper;

	const imageWrapper = document.createElement('div');
	imageWrapper.className = css.imageWrapper;

	const overlay = document.createElement('img');
	overlay.src = overlaySrc;
	overlay.className = css.overlay;

	imageWrapper.appendChild(overlay);
	overlayWrapper.appendChild(imageWrapper);

	function updateHeightAndAppend(): void {
		const videoElementHeight = videoElement.getBoundingClientRect().height;
		overlayWrapper.style.height = `${videoElementHeight}px`;
		imageWrapper.style.height = `${videoElementHeight}px`;
		container.appendChild(overlayWrapper);
	}

	setTimeout(updateHeightAndAppend, 0);

	window.addEventListener('resize', updateHeightAndAppend);
}
