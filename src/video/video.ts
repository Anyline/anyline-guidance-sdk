export default function createVideoElementWithStream(
	modal: HTMLElement,
	stream: MediaStream
): void {
	const video = document.createElement('video');
	video.style.width = '100vw';
	video.style.height = '100vh';
	video.autoplay = true;
	video.playsInline = true;
	video.muted = true;
	video.srcObject = stream;
	video.style.objectFit = 'cover';

	// TODO: only do this for front camera
	video.style.webkitTransform = 'scaleX(-1)';
	video.style.transform = 'scaleX(-1)';

	// append video
	modal.appendChild(video);
}
