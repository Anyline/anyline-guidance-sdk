import createShadowRoot from '../lib/createShadowRoot';

export function closeSDK(stream: MediaStream): void {
	const shadowRoot = createShadowRoot();
	shadowRoot.innerHTML = '';
	stream.getTracks().forEach(track => {
		track.stop();
	});
}
