export async function closeSDK(
	stream: MediaStream,
	modal: HTMLElement
): Promise<void> {
	modal.remove();
	stream.getTracks().forEach(track => {
		track.stop();
	});
}
