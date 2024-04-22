export function closeSDK(stream: MediaStream, modal: HTMLElement): void {
	modal.remove();
	stream.getTracks().forEach(track => {
		track.stop();
	});
}
