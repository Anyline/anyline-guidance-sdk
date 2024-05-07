import createShadowRoot from '../lib/createShadowRoot';
import createHost from '../lib/createHost';

export function closeSDK(stream: MediaStream): void {
	const host = createHost();
	const shadowRoot = createShadowRoot(host);
	shadowRoot.innerHTML = '';
	stream.getTracks().forEach(track => {
		track.stop();
	});
}
