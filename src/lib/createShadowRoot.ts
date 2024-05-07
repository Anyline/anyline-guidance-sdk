export default function createShadowRoot(
	host: HTMLDivElement
): ShadowRoot | HTMLDivElement {
	if (process.env.MODE === 'production') {
		if (host.shadowRoot !== undefined && host.shadowRoot !== null)
			return host.shadowRoot;

		const shadowRoot = host.attachShadow({ mode: 'open' });

		return shadowRoot;
	}

	// dont attach shadow root in development environment
	// this is to be able to use css in development directly via <link> tag
	return host;
}
