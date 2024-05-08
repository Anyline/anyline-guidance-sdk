import createShadowRoot from '../lib/createShadowRoot';
import createHost from '../lib/createHost';
import StreamManager from '../modules/StreamManager';

export default function closeSDK(): void {
	const host = createHost();
	const shadowRoot = createShadowRoot(host);
	shadowRoot.innerHTML = '';
	const streamManager = StreamManager.getInstance();
	streamManager.destroy();
}
