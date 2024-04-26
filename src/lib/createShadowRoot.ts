import createHost from './createHost';

export default function createShadowRoot(): ShadowRoot {
	const host = createHost();

	if (host.shadowRoot !== undefined && host.shadowRoot !== null)
		return host.shadowRoot;

	const shadowRoot = host.attachShadow({ mode: 'open' });

	return shadowRoot;
}
