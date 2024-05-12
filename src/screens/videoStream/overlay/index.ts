import overlaySrc from './overlay.svg';
import css from './index.module.css';
import VideoManager from '../../../modules/VideoManager';
import Bowser from 'bowser';

export default function createOverlayElement(): HTMLDivElement {
	const overlayWrapper = document.createElement('div');
	overlayWrapper.className = css.overlayWrapper;

	const imageWrapper = document.createElement('div');
	imageWrapper.className = css.imageWrapper;

	const overlay = document.createElement('img');
	overlay.src = overlaySrc;
	overlay.className = css.overlay;

	imageWrapper.appendChild(overlay);
	overlayWrapper.appendChild(imageWrapper);

	const videoManager = VideoManager.getInstance();

	const { browser, os } = Bowser.parse(window.navigator.userAgent);

	const isSafari = browser.name === 'Safari';
	const isIOS = os.name === 'iOS';

	function showVideoAndOverlay(): void {
		videoManager.onChangeDimension((_, height) => {
			const videoElement = videoManager.getVideoElement();
			videoElement.style.visibility = 'hidden';
			overlayWrapper.style.visibility = 'hidden';

			overlayWrapper.style.height = `${height}px`;
			imageWrapper.style.height = `${height}px`;

			overlayWrapper.style.visibility = 'visible';
			videoElement.style.visibility = 'visible';
		});
	}

	if (isIOS && isSafari) {
		showVideoAndOverlay();
	} else {
		videoManager.onPlay(() => {
			showVideoAndOverlay();
		});
	}

	return overlayWrapper;
}
