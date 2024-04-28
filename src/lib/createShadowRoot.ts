import createHost from './createHost';

export default function createShadowRoot(): ShadowRoot | HTMLDivElement {
	const host = createHost();

	if (process.env.MODE === 'production') {
		if (host.shadowRoot !== undefined && host.shadowRoot !== null)
			return host.shadowRoot;

		const shadowRoot = host.attachShadow({ mode: 'open' });

		return shadowRoot;
	}

	return host;
}
