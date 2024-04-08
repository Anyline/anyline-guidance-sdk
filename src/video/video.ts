import overlaySrc from './overlay.svg';

export default function createVideoElementWithStream(
	modal: HTMLElement,
	stream: MediaStream
): void {
	// container for video and overlay
	const container = document.createElement('div');
	container.style.position = 'relative';
	container.style.width = '100vw';
	container.style.height = '100vh';
	container.style.display = 'flex';
	container.style.justifyContent = 'center';
	container.style.alignItems = 'center';

	// video element
	const video = document.createElement('video');
	video.style.width = '100%';
	video.style.height = '100%';
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.srcObject = stream;
	video.style.objectFit = 'cover';

	// TODO: only do this for front camera
	video.style.webkitTransform = 'scaleX(-1)';
	video.style.transform = 'scaleX(-1)';

	// overlay image
	const overlay = document.createElement('img');
	overlay.src = overlaySrc;
	overlay.style.position = 'absolute';
	overlay.style.width = '90%';
	overlay.style.maxWidth = '500px';
	// overlay.style.maxHeight = '100%';
	// overlay.style.objectFit = 'contain';

	// append video and overlay
	container.appendChild(video);
	container.appendChild(overlay);

	// Append to modal
	modal.appendChild(container);
}
